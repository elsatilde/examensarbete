import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../variables/colors";
import { Garment } from "../types/Garment.types";

type CreateCarouselProps = {
   items: Garment[];
}

export default function CreateCarousel({ items }: CreateCarouselProps) {
    const [index, setIndex] = useState(0);

    if(!items || items.length === 0) {
        return <Text style={{ textAlign: "center" }}> No items found </Text>;
    }

    const goLeft = () => {
        setIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1 ));
    };

    const goRight = () => {
        setIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1 ));
    };

    const current = items[index];

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={goLeft} style={styles.arrow}>
                <Ionicons name={'chevron-back'} size={32} color={colors.iconColor} />
            </TouchableOpacity>

            <Image
                source={{ uri: current.imageUrl }}
                style={styles.image}
                resizeMode="contain"
            />

            <TouchableOpacity onPress={goRight} style={styles.arrow}>
                <Ionicons name={'chevron-forward'} size={32} color={colors.iconColor} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({ 
    container: {
        width: "100%",
        height: 250,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    arrow: {
        padding: 10,
    },
    image: {
        width: 180,
        height: 200,
        borderRadius: 10,
    },
});