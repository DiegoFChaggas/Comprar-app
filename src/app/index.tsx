import { View, StyleSheet, ActivityIndicator } from "react-native";



import colors from "@/colors";



export default function index(){
    return(
        <View style={ styles.container }>
           <ActivityIndicator size={44} color={colors.blue}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"center",
        backgroundColor: colors.white
    }
})