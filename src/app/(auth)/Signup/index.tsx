import { View, Text, StyleSheet, Image, ScrollView, Alert, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Link, router } from "expo-router";
import { useState } from "react";

import colors from "@/colors";
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { supabase } from "@/lib/supabase";

export default function SignupPage(){
 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)


    async function handleSignUp(){
        
         setLoading(true);
         const { data, error } = await supabase.auth.signUp({
             email: email,
             password: password,
             options:{
                data:{
                    name: name
                }
             }
         })
         if(error){
             Alert.alert('Error', error.message);
             setLoading(false);
             return;
        }
         setLoading(false);
         Alert.alert('Cadastrado com Sucesso!');
        router.replace('../Signin');
    }

    return(
        <SafeAreaView style={{ flex:1 }}>
            <ScrollView style={{flex:1}} >
            <View style={ styles.container }>
                <View style={ styles.header } >
                    <Image 
                        source={require("@/assets/logo.png")} 
                    >
                    </Image>
                    <Text style={ styles.slogan }> Criar conta</Text>
                </View>
    
                <View style={styles.form}>

                    <View style={ styles.inputForm }>
                        <Text style={ styles.label }>
                            Nome Completo
                        </Text>
                        <Input
                            placeholder="Digite nome completo..."
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    <View style={ styles.inputForm }>
                        <Text style={ styles.label }>
                            E-mail
                        </Text>
                        <Input
                            placeholder="Digite seu e-mail..."
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
    
                    <View style={ styles.inputForm }>
                        <Text style={ styles.label }>Senha</Text>
                        <Input
                            placeholder="Digite sua senha..."
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>

                    {/* <Pressable onPress={handleSignUp}>
                        <Text> Cadastrar </Text>
                    </Pressable> */}

                    <View style={ styles.buttonForm }>
                        <Button
                            title={ loading ? "Carregando..." : "Cadastrar" }
                            onPress={handleSignUp}
                        />
                    </View>
    
                    <Link href={"../Signin"}>
                        <Text>Já possui uma conta? Faça o login</Text>
                    </Link>
                </View>
            </View>
            </ScrollView>
        </SafeAreaView>
        )
    }
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent:"center",
            alignItems:"center",
            flexDirection: "column",
            paddingTop: 34,
            backgroundColor: colors.grey
        },
        header: {
            flexDirection: "column"
        },
        slogan: {
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 34,
        },
        form:{
            width:"75%",
            height: "45%"
            
        },
        inputForm:{
            flex: 1,
            marginVertical:10,
            flexDirection:"column"
        },
        label:{
            color: colors.blue,
            fontSize: 18,
            fontWeight: "600"
        },
        buttonForm:{
            marginTop:20,
        },
        link:{
            marginTop:5,
            textAlign:"center",
        }
    })