import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useRef } from "react";
import { Animated, Pressable, Text, TouchableOpacity, View } from "react-native";

export default function CameraScreen() {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const router = useRouter();
    const cameraRef = useRef<CameraView>(null);
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) {
        return <Text>Loading permissions...</Text>;
    }

    if (!permission.granted) {
        return (
            <TouchableOpacity onPress={requestPermission}>
                <Text> Allow Camera </Text>
            </TouchableOpacity>
        );
    }

    const takePhoto = async () => {
        if (!cameraRef.current) return;
        const photo = await cameraRef.current.takePictureAsync();

        router.push({
            pathname: "/(dashboard)/add-garment",
            params: { imageUri: photo.uri }
        });
    };

    const onPressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.85,
            useNativeDriver: true,
            speed: 20,
        }).start();
    };

    const onPressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            friction: 3,
        }).start();
    };

    return (
        <CameraView style={{ flex: 1}} ref={cameraRef}>
            <View style={{ position: "absolute", bottom: 50, width: "100%", alignItems: "center" }}>
                <Pressable onPressIn={onPressIn} onPressOut={onPressOut} onPress={takePhoto}>
                    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                        <Ionicons 
                            name={'radio-button-on'} 
                            size={80} 
                            color="white"
                        />
                    </Animated.View>
                </Pressable>
            </View>
        </CameraView>
    )
}