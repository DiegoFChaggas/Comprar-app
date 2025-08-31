import { View, Text, Pressable } from "react-native";
import { Trash2 } from "lucide-react-native";

import { styles } from "./styles";
import { StatusIcon } from "../StatusIcon";
import { FilterStatus } from "@/types/FilterStatus";

type ItemData = {
    status: FilterStatus
    description: string
}

type Props = {
    data: ItemData
    onRemove: () => void
    onStatus: () => void
}

export function Item({ data, onStatus, onRemove }: Props){
    return (
        <View style={styles.container}>
            <Pressable onPress={onStatus}>
                <StatusIcon status={data.status}>
                </StatusIcon>
            </Pressable>

            <Text style={styles.description}>
                {data.description}
            </Text>
            <Pressable onPress={onRemove}>
                <Trash2 size={18} color="#828282"/>
            </Pressable>
        </View>
    )
}