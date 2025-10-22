import { StyleSheet } from "react-native";

import colors from "@/colors";


export const styles = StyleSheet.create({
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