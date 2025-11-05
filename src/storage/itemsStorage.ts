import { FilterStatus } from "@/types/FilterStatus";
import { supabase } from "@/lib/supabase";

export type ItemStorage = {
  id: string; 
  description: string;
  status: FilterStatus;      // 'PENDING' | 'DONE'
  user_id: string;
  created_at?: string;
};

export type NewItemInput = {
  description: string;
  status?: FilterStatus;     // default: 'PENDING'
};

async function getCurrentUserId(): Promise<string> {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    throw new Error("GET_CURRENT_USER_ID: " + error.message);
  }
  if (!data?.user) {
    throw new Error("GET_CURRENT_USER_ID: Usuário não autenticado.");
  }
  return data.user.id;
}

async function get(): Promise<ItemStorage[]> {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from("items")
    .select("id, description, status, user_id, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error("ITEMS_GET: " + error.message);
  }

  return (data ?? []) as ItemStorage[];
}

async function getByStatus(status: FilterStatus): Promise<ItemStorage[]> {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from("items")
    .select("id, description, status, user_id, created_at")
    .eq("user_id", userId)
    .eq("status", status)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error("ITEMS_GET_BY_STATUS: " + error.message);
  }

  return (data ?? []) as ItemStorage[];
}

async function add(newItem: NewItemInput): Promise<ItemStorage> {
  const userId = await getCurrentUserId();

  const payload = {
    description: newItem.description,
    status: newItem.status ?? ("PENDING" as FilterStatus),
    user_id: userId,
  };

  const { data, error } = await supabase
    .from("items")
    .insert(payload)
    .select("id, description, status, user_id, created_at")
    .single();

  if (error) {
    throw new Error("ITEMS_ADD: " + error.message);
  }

  return data as ItemStorage;
}

async function remove(id: string): Promise<void> {
  const userId = await getCurrentUserId();

  const { error } = await supabase
    .from("items")
    .delete()
    .eq("id", id)
    .eq("user_id", userId); // proteção extra mesmo com RLS

  if (error) {
    throw new Error("ITEMS_REMOVE: " + error.message);
  }
}

async function clear(): Promise<void> {
  const userId = await getCurrentUserId();

  const { error } = await supabase
    .from("items")
    .delete()
    .eq("user_id", userId);

  if (error) {
    throw new Error("ITEMS_CLEAR: " + error.message);
  }
}

async function toggleStatus(id: string): Promise<ItemStorage> {
  const userId = await getCurrentUserId();

  // 1) Buscar status atual (apenas o necessário)
  const { data: existing, error: getErr } = await supabase
    .from("items")
    .select("id, status")
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (getErr || !existing) {
    throw new Error(
      "ITEMS_TOGGLE_GET: " + (getErr?.message ?? "Item não encontrado para este usuário.")
    );
  }

  const nextStatus: FilterStatus =
    existing.status === ("PENDING" as FilterStatus)
      ? ("DONE" as FilterStatus)
      : ("PENDING" as FilterStatus);

  // 2) Atualizar e retornar o item completo
  const { data, error } = await supabase
    .from("items")
    .update({ status: nextStatus })
    .eq("id", id)
    .eq("user_id", userId)
    .select("id, description, status, user_id, created_at")
    .single();

  if (error) {
    throw new Error("ITEMS_TOGGLE_UPDATE: " + error.message);
  }

  return data as ItemStorage;
}

export const itemsStorage = {
  get,
  getByStatus,
  add,
  remove,
  clear,
  toggleStatus,
};
