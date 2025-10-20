import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Pressable, FlatList, Alert } from 'react-native';
import { useState } from 'react';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Filter } from '@/components/Filter';
import { Item } from '@/components/Item';

import { styles } from '../../../styles/home/styles';
import { FilterStatus } from '@/types/FilterStatus';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContexts';

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]

const ITEMS = [
  {id: "1", status: FilterStatus.DONE, description: "1 pacote de café"},
  {id: "2", status: FilterStatus.PENDING, description: "3 pacotes de macarrão"},
  {id: "3", status: FilterStatus.DONE, description: "3 cebolas"}
]




export default function Home() {
  const { setAuth } = useAuth();
  
  async function handleSignout() {
    const { error } = await supabase.auth.signOut();

    if(error){
      Alert.alert('error' , 'Erro ao sair da conta, tente novamente mais tarde.');
      return;
    }
    setAuth(null);
  }

  //Configurações do Filtro
  const [filter, setFilter] = useState(FilterStatus.PENDING)

  function update(value: FilterStatus){
    setFilter(value)
  }


  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo}></Image>
      <Button title='Sair'
              onPress={handleSignout}
      />
      <View style={styles.form}>
        <Input placeholder='O que você precisa comprar?'/>
        <Button title='Adicionar'/>
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
        {
          FILTER_STATUS.map((status) => (
            <Filter 
            key={status} 
            status={status} 
            isActive= {status === filter}
            onPress={() => setFilter(status)}
            />
          ))
        }

          <Pressable style={styles.clearButton}>
            <Text style={styles.clearText}>Limpar</Text>
          </Pressable>
        </View>
        <FlatList
        data={ITEMS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Item 
           data={ item }
           onRemove={() => console.log("remover") }
           onStatus={() => console.log("trocar status")}
        />)}
        />
        
      </View>
    </View>
  );
}


