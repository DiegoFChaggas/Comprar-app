import { PressableProps, Text, Pressable } from "react-native";

import { styles } from "./styles";

type Props = PressableProps & {
    title: string
}

export function Button({title, ...rest}:Props){
    return (
        <Pressable 
            style={({ pressed }) => [
                styles.container,
                pressed && styles.pressed // estilo para quando estiver pressionado
            ]}
            android_ripple={{ color: '#00000020' }} // efeito de ripple no Android
            {...rest}
        >
            <Text style={styles.title}>{title}</Text>
        </Pressable>
    )
}