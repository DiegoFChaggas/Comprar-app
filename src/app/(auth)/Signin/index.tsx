import { View, Text, StyleSheet, Image, Alert } from "react-native";
import { Link, router } from "expo-router";
import { useState } from "react";


import colors from "@/colors";
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { supabase } from "@/lib/supabase";



export default function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSignIn(){
        setLoading(true);

        const {data, error} = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })

        if(error){
            Alert.alert('Error', error.message);
            setLoading(false);
            return;
        }

        setLoading(false);
        router.replace('Home')
    }

    return(
        <View style={ styles.container }>
            <View style={ styles.header } >
                <Image 
                    source={require("@/assets/logo.png")} 
                >
                </Image>
                <Text style={ styles.slogan }> Sua lista de compras aqui!!</Text>
            </View>

            <View style={styles.form}>
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

                <View style={ styles.buttonForm }>
                    <Button
                        title={ loading ? "Carregando..." : "Entrar" }
                        onPress={handleSignIn}
                    />
                </View>

                <Link href={"../../Signup"}>
                    <Text>Não possui uma conta? Cadastre-se</Text>
                </Link>
            </View>
        </View>
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
        height: "30%"
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