import { StatusBar } from 'expo-status-bar';
import {Text, View } from 'react-native';
import { styles } from './styles';

export function Home() {
  return (
    <View style={styles.container}>
      <Text>Olá, mundo!</Text>
      <StatusBar style="auto" />
    </View>
  );
}


