import { useState } from "react";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { colors } from "../../variables/colors";

export default function Library() {
    const [imageUri, setImageUri] = useState<string | null>(null);

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if(!permissionResult.granted) {
            Alert.alert(
                "Permission required",
                "Permission to access your photo library is needed"
            );
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });

        if(!result.canceled) {
            setImageUri(result.assets[0].uri)
        };
    }

    const continueToPreview = () => {
        if(!imageUri) return;
        router.push({
            pathname: "/(dashboard)/add-garment",
            params: { imageUri }
        });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={pickImage} style={styles.button}>
                <Text style={styles.buttonText}> Choose a image from library </Text>
            </TouchableOpacity>

            {imageUri && (
                <>
                    <Image source={{ uri: imageUri }} style={styles.image} />
                    <TouchableOpacity onPress={continueToPreview} style={styles.saveButton}>
                        <Text style={styles.buttonText}> Continue </Text>
                    </TouchableOpacity>
                </>
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    button: {
        padding: 14,
        backgroundColor: colors.accent,
        borderRadius: 8,
    },
    buttonText: { 
        color: 'white', 
        fontSize: 16 
    },
    image: { 
        width: 250, 
        height: 250, 
        marginTop: 20, 
        borderRadius: 10 
    },
    saveButton: {
        marginTop: 20,
        backgroundColor: 'black',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
  });