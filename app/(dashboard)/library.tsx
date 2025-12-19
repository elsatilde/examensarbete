import { useCallback, useState } from "react";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { router, useFocusEffect } from "expo-router";
import { colors } from "../../variables/colors";
import ThemedView from "../../components/ThemedView";
import { Ionicons } from "@expo/vector-icons";

export default function Library() {
    const [imageUri, setImageUri] = useState<string | null>(null);

    useFocusEffect(
        useCallback(() => {
          setImageUri(null);   
        }, [])
      );

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
            params: { 
                from: "library",
                imageUri 
            }
        });
    };

    return (
        <ThemedView safe={true} style={styles.container}>

             <TouchableOpacity 
                onPress={() => router.push("/(dashboard)/add-garment")} 
                style={{ flexDirection: 'row', alignItems: 'center', marginTop: -30, marginLeft: 20 }}>
                <Ionicons name={'arrow-back'} size={20} color={colors.iconColor} />
                <Text style={styles.text}> Back </Text>
            </TouchableOpacity>

            <View style={styles.box}>
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
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: colors.background 
    },
    box: {
        backgroundColor: colors.muted,
        marginTop: 40,
        borderRadius: 10,
        height: 450,
        width: 300,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',    
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15,
        color: colors.text,
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
        backgroundColor: colors.iconColor,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
  });