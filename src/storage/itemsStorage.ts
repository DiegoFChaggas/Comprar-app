import AsyncStorage from "@react-native-async-storage/async-storage";
import { FilterStatus } from "@/types/FilterStatus";
import { supabase } from "@/lib/supabase";

const ITEMS_STORAGE_KEY = "@comprar:items"

export type ItemStorage ={
    id: string,
    status: FilterStatus,
    description: string,
    user_id?: string
}


async function getCurrentUserId(): Promise<string> {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    throw new Error("Não foi possível obter o usuário autenticado.");
  }
  return data.user.id;
};



async function get(): Promise<ItemStorage[]> {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from("items")
    .select("id, description, status, user_id")
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
    .select("id, description, status, user_id")
    .eq("user_id", userId)
    .eq("status", status)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error("ITEMS_GET_BY_STATUS: " + error.message);
  }

  return (data ?? []) as ItemStorage[];
}

async function save(items:ItemStorage[]): Promise<void> {
    const { data, error } = await supabase
    .from('items')
    .insert(items);
}

async function add(newItem: ItemStorage): Promise<ItemStorage[]> {
    const items = await get()
    const updatedItems = [...items, newItem]

    await save(updatedItems)

    return updatedItems
}

async function remove(id:string): Promise<void> {
    const items = await get()
    const updatedItems = items.filter((item)=> item.id !== id)
    await save(updatedItems)
}

async function  clear(): Promise<void> {
    try {
        await AsyncStorage.removeItem(ITEMS_STORAGE_KEY)
    } catch (error) {
        throw new Error("ITEMS_CLEAR: " + error)
    }
    
}

async function toggleStatus(id: string): Promise<void>{
    const items = await get()

    const updatedItems = items.map((item) => 
        item.id === id 
    ? {
        ...item,
        status: 
            item.status === FilterStatus.PENDING
                ? FilterStatus.DONE
                : FilterStatus.PENDING

    }
    : item
    )

    await save(updatedItems)
}

export const itemsStorage = {
    get,
    getByStatus,
    add,
    remove,
    clear,
    toggleStatus
}