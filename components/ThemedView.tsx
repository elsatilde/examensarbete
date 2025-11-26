import { View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { colors } from "../variables/colors";

interface ThemedViewProps {
    safe?: boolean;
    style?: object; 
    children?: React.ReactNode;
}

const ThemedView: React.FC<ThemedViewProps> = ({ safe = false, style, ...props }) => {
    const insets = useSafeAreaInsets()

    const baseStyle = {
        flex: 1,
        backgroundColor: colors.background
    }

    if (!safe) return (
        <View
        style={[baseStyle, style ]}
        {...props}
        />
    )

    return (
        <View
        style={[baseStyle, {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
        }, style ]}
        {...props}
        />
    )
}

export default ThemedView