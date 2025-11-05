import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Pressable, FlatList, Alert } from 'react-native';
import { useState, useEffect } from 'react';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Filter } from '@/components/Filter';
import { Item } from '@/components/Item';

import { styles } from '../../../styles/home/styles';
import { FilterStatus } from '@/types/FilterStatus';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContexts';
import { itemsStorage, ItemStorage } from '@/storage/itemsStorage';

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]



export default function Home() {
  const { setAuth } = useAuth();
  //Configurações do Filtro
  const [filter, setFilter] = useState(FilterStatus.PENDING);
  //Estado do input
  const [description, setDescription] = useState("");

  const [items, setItems] = useState<ItemStorage[]>([]);
  
  async function handleSignout() {
    const { error } = await supabase.auth.signOut();

    if(error){
      Alert.alert('error' , 'Erro ao sair da conta, tente novamente mais tarde.');
      return;
    }
    setAuth(null);
  }

  /*function update(value: FilterStatus){
    setFilter(value)
  }*/

  async function handleAdd(){
    
if (!description.trim()) {
      return Alert.alert('Adicionar', 'Informe a descrição para adicionar');
    }

    try {
      // Agora o add só precisa da descrição; status padrão é PENDING
      await itemsStorage.add({ description });

      // Recarrega conforme o filtro atual
      await itemsByStatus();

      Alert.alert('Adicionado', `Adicionado: ${description}`);
      setFilter(FilterStatus.PENDING); // opcional: força voltar para pendentes
      setDescription('');
    } catch (e: any) {
      console.log(e);
      Alert.alert('Erro', e?.message ?? 'Não foi possível adicionar o item.');
    }

  }


  async function itemsByStatus() {
    try {
      const response = await itemsStorage.getByStatus(filter);
      setItems(response);
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível filtrar os itens.');
    }
  }

  async function handleRemove(id: string) {
    try {
      await itemsStorage.remove(id);
      await itemsByStatus();
    } catch (error) {
      console.log(error);
      Alert.alert('Remover', 'Não foi possível remover');
    }
  }

  function handleClear() {
    Alert.alert('Limpar', 'Deseja remover todos?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: () => onClear() },
    ]);
  }

  async function onClear() {
    try {
      await itemsStorage.clear();
      setItems([]);
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível remover todos os itens.');
    }
  }

  async function handleToggleItemStatus(id: string) {
    try {
      await itemsStorage.toggleStatus(id);
      await itemsByStatus();
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível atualizar o status.');
    }
  }

  // Carrega quando o filtro muda
  useEffect(() => {
    itemsByStatus();
  }, [filter]);



  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo}></Image>
      <Button title='Sair'
              onPress={handleSignout}
      />
      <View style={styles.form}>
        <Input 
        placeholder='O que você precisa comprar?'
        onChangeText={setDescription}
        value={description}
        />
        <Button title='Adicionar' onPress={handleAdd}/>
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
        {
          FILTER_STATUS.map((status) => (
            <Filter
              key={status}
              status={status}
              isActive={status === filter}
              onPress={() => setFilter(status)}
            />
          ))
        }


          <Pressable style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.clearText}>Limpar</Text>
          </Pressable>
        </View>
        
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              data={item}
              onRemove={() => handleRemove(item.id)}
              onStatus={() => handleToggleItemStatus(item.id)}
            />
          )}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', opacity: 0.6, marginTop: 24 }}>
              Nenhum item {filter === FilterStatus.PENDING ? 'pendente' : 'concluído'}.
            </Text>
          }
          contentContainerStyle={{ paddingBottom: 32 }}
        />        
      </View>
    </View>
  );
}


