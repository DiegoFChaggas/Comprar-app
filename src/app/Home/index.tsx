import { StatusBar } from 'expo-status-bar';
import {Text, View, Image } from 'react-native';

import { Button } from '@/components/Botton';

import { styles } from './styles';

export function Home() {
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo}></Image>
      <Button />
    </View>
  );
}


