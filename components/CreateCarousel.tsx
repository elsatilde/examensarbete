import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../variables/colors";
import { Garment } from "../types/Garment.types";

type CreateCarouselProps = {
   items: Garment[];
   onSelect: (id: string) => void;
   selectedId: string | null;
}

export default function CreateCarousel({ items, onSelect, selectedId }: CreateCarouselProps) {
    const [index, setIndex] = useState(0);

    if(!items || items.length === 0) {
        return <Text style={{ textAlign: "center" }}> No items found </Text>;
    }

    useEffect(() => {
        const currentItem = items[index];

        if(currentItem){
            onSelect(currentItem.id);
        }

    }, [index, items, onSelect])

    const goLeft = () => {
        setIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1 ));
    };

    const goRight = () => {
        setIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1 ));
    };

    const current = items[index];
    const isSelected = current.id === selectedId;

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={goLeft} style={styles.arrow}>
                <Ionicons name={'chevron-back'} size={32} color={colors.iconColor} />
            </TouchableOpacity>

            <Image
                source={{ uri: current.imageUrl }}
                style={[styles.image, isSelected && styles.selectedImage]}
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
        borderWidth: 2,
        borderColor: '' ,
    },
    selectedImage: {
        borderWidth: 2,
        borderColor: colors.accent,
    }
});