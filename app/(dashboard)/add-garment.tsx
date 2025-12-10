import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ThemedView from "../../components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { colors } from "../../variables/colors";
import { useState } from "react";
import { uploadImageAsync } from "../../services/storage";
import { getAuth } from "firebase/auth";
import { GARMENT_CATEGORIES, GarmentCategory } from "../../types/Garment.types";
import { useGarments } from "../../hooks/useGarments";

export default function AddGarment() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const imageUri = Array.isArray(params.imageUri) ? params.imageUri[0] : params.imageUri;

    return (
        <ThemedView safe={true}>
            <TouchableOpacity 
                onPress={() => router.push("/(dashboard)/closet")} 
                style={{ flexDirection: 'row', alignItems: 'center', marginTop: -30, marginLeft: 20 }}>
                <Ionicons name={'arrow-back'} size={20} color={colors.iconColor} />
                <Text style={styles.text}> Back </Text>
            </TouchableOpacity>

            {imageUri ? ( <PreviewView imageUri={imageUri} /> ) : ( <InitialView /> )}

        </ThemedView>
    )
}

function InitialView() { 
    const router = useRouter(); 
    
    return ( 
        <View style={styles.box}> 

            <TouchableOpacity onPress={() => router.push("/(dashboard)/camera")} 
            style={{ flexDirection: 'column', alignItems: 'center', marginBottom: 30}}> 

                <Ionicons name={'camera'} size={30} color={colors.iconColor} style={{ marginBottom: 5}}/> 
                <Text style={styles.text_box}> Take a picture </Text> 

            </TouchableOpacity>

            <Text style={styles.text_box}> or </Text> 

            <TouchableOpacity onPress={() => router.push("/(dashboard)/library")}
            style={{ flexDirection: 'column', alignItems: 'center', marginTop: 30}}> 

                <Ionicons name={'images'} size={30} color={colors.iconColor} style={{ marginBottom: 5}} /> 
                <Text style={styles.text_box}> Upload from library </Text> 
                
            </TouchableOpacity> 

        </View> 
    ) 
}

function PreviewView({ imageUri}: {imageUri: string}) {
    const router = useRouter();
    const { addGarments } = useGarments();
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState<GarmentCategory | null>(null);

    const saveGarment = async () => {
        if (!category) { 
            alert("Select a category"); 
            return;
        }
        try {
            setLoading(true);
    
            const user = getAuth().currentUser;
            if (!user) throw new Error("Not logged in");
    
            const imageUrl = await uploadImageAsync(imageUri, user.uid, "garments");
    
            await addGarments(category, imageUrl);

            setCategory(null);
            setLoading(false);
    
            router.replace("/(dashboard)/closet");
    
        } catch (err) {
            console.error(err);
            alert("Error saving garment");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.box}> 

            <Text style={{ paddingBottom: 15, fontWeight: 'bold', fontSize: 15 }}> Choose category </Text> 
                <View style={{ flexDirection: 'row', alignItems: 'center'}}> 
                    {GARMENT_CATEGORIES.map(c => ( 
                    <TouchableOpacity 
                    key={c} 
                    onPress={() => setCategory(c)} 
                    style={[
                        styles.categoryButton, 
                        category === c && styles.categorySelected]} > 
                        <Text>
                            {c.toUpperCase()}
                        </Text> 
                    </TouchableOpacity> ))} 
                </View> 

            <Image source={{ uri: imageUri }} style={styles.previewImage} /> 

                <View style={{ flexDirection: 'row', gap: 15}}> 
                    <TouchableOpacity 
                        onPress={() => router.push("/(dashboard)/camera")} 
                        style={styles.secondaryBtn}> 
                    <Text style={styles.btnText}> Retake </Text> 
                    </TouchableOpacity> 

                    <TouchableOpacity 
                        onPress={saveGarment} 
                        style={[styles.primaryBtn, !category && styles.primaryBtnDisabled]} 
                        disabled={!category} > 
                        {loading && <Text style={{ color: "white" }}> Loading...</Text>}
                        <Text style={styles.btnText}> Save </Text> 
                    </TouchableOpacity> 
                </View> 

        </View>
    )
}

const styles = StyleSheet.create({ 
    text: {
        fontWeight: 'bold',
        fontSize: 15,
        color: colors.text,
    },
    box: {
        backgroundColor: colors.muted,
        marginTop: 40,
        borderRadius: 10,
        height: 450,
        width: 300,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text_box: {
        fontWeight: '400',
        color: colors.iconColor,
        fontSize: 12,  
    },
    categoryButton: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: colors.text,
        backgroundColor: 'white',
        marginRight: 10,
      },  
      categorySelected: {
        backgroundColor: 'white',
        borderColor: colors.accent,
      },  
      previewImage: {
        margin: 20,
        width: 250,
        height: 250,
    },
      primaryBtn: {
        backgroundColor: colors.accent,
        paddingHorizontal: 25,
        paddingVertical: 12,
        borderRadius: 10,
      },
    
      primaryBtnDisabled: {
        backgroundColor: colors.accent,
        opacity: 0.4,
      },
      btnText: {
        color: 'white',
        fontSize: 12
      },
      secondaryBtn: {
        backgroundColor: colors.iconColor,
        paddingHorizontal: 25,
        paddingVertical: 12,
        borderRadius: 10,
      },
      
})