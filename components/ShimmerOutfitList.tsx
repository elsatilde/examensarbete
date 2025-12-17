import { ScrollView } from "react-native";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

export default function ShimmerOutfitList(){
    return (
        <ScrollView>
            {Array.from({ length: 3 }).map((_, i) => (
                <ShimmerPlaceholder
                    key={i}
                    LinearGradient={LinearGradient}
                    width={300}
                    height={300}
                    style={{ marginBottom: 20 }}
                    shimmerColors={[
                        "#D5D1BF",
                        "#EAE7DB",
                        "#D5D1BF",
                    ]} 
                /> 
            ))} 
        </ScrollView>      
    );
}