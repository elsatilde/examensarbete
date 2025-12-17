import { ScrollView } from "react-native";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

export default function ShimmerClosetList() {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Array.from({ length: 4}).map((_,i) => (
                <ShimmerPlaceholder
                 key={i}
                 LinearGradient={LinearGradient}
                 width={120}
                 height={140}
                 style={{ marginRight: 10 }}
                 shimmerColors={["#D5D1BF", "#EAE7DB", "#D5D1BF"]}
                />
            ))}
        </ScrollView>
    )
 }
