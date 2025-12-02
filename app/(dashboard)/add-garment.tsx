import { StyleSheet, Text, TouchableOpacity } from "react-native";
import ThemedView from "../../components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors } from "../../variables/colors";

export default function AddGarment() {
    const router = useRouter();

    return (

        <ThemedView safe={true}>
            <TouchableOpacity 
                onPress={() => router.push("/(dashboard)/closet")} 
                style={{ flexDirection: 'row', alignItems: 'center', marginTop: -30, marginLeft: 20 }}>
                <Ionicons name={'arrow-back'} size={20} color={colors.iconColor} />
                <Text style={styles.text}> Back </Text>
            </TouchableOpacity>

            <Text> Here You can upload your garments</Text>

        </ThemedView>


    )
}

const styles = StyleSheet.create({ 
    text: {
        fontWeight: 'bold',
        fontSize: 15,
        color: colors.text,
    },
})