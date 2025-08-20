import { StatusBar } from 'expo-status-bar';
import {Text, View, Image } from 'react-native';

import { Button } from '@/components/Botton';
import { Input } from '@/components/Input';
import { Filter } from '@/components/Filter';

import { styles } from './styles';
import { FilterStatus } from '@/types/FilterStatus';

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]

export function Home() {
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo}></Image>

      <View style={styles.form}>
        <Input placeholder='O que você precisa comprar?'/>
        <Button title='Adicionar'/>
      </View>
      
      <View style={styles.content}>

        {
          FILTER_STATUS.map((status) => (
            <Filter key={status} status={status} isActive></Filter>
          ))
        }
      </View>
    </View>
  );
}


