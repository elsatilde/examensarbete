import { Image, TouchableOpacity, StyleSheet} from "react-native";
import { Garment } from "../types/Garment.types";

export default function CategoryList({ item }: {item: Garment}) {
    return (
        // Här ska en popup vara
        <TouchableOpacity style={styles.box} onPress={() => console.log("Clicked garment:", item.id)}>  
             <Image 
                source={{ uri: item.imageUrl }} 
                style={styles.img}
                resizeMode="cover" />
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