import { Image, TouchableOpacity, StyleSheet} from "react-native";
import { Garment } from "../types/Garment.types";

interface CategoryListProps {
    item: Garment;
    onPress: (garment: Garment) => void;
}

export default function CategoryList({ item, onPress }: CategoryListProps) {
    return (
        <TouchableOpacity 
            style={styles.box} 
            onPress={() => onPress(item)}>  
             <Image 
                source={{ uri: item.imageUrl }} 
                style={styles.img}
                resizeMode='cover' />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    box: {
        width: 120,
        height: 140,
        marginRight: 10,
    },
    img: {
        width: '100%',
        height: '100%',
    }
})