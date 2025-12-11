import React, { useCallback, useEffect, useState } from 'react'
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ThemedView from '../../components/ThemedView'
import { useGarments } from '../../hooks/useGarments'
import { useFocusEffect } from 'expo-router'
import CategoryList from '../../components/CategoryList'
import { colors } from '../../variables/colors'
import { deleteGarment } from '../../services/garments'
import { useUser } from '../../hooks/useUser'
import PopUpModal from '../../components/PopUpModal'
import { Ionicons } from '@expo/vector-icons'

const Closet = () => {
  const { user } = useUser();
  const { garments, getGarments } = useGarments();
  const [selectedGarment, setSelectedGarment] = useState<null | typeof garments[0]>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => { getGarments(); }, [])
  );

  const handleDeleteGarment = (garmentId: string) => {
    Alert.alert(
      "Delete Garment",
      "Are you sure you want to delete this garment?",
      [
        {text: "Cancel", style: "cancel" },
        {text: "Delete", style: "destructive",
          onPress: async () => {
            if (!user) return;
            try {
              await deleteGarment(user, garmentId);
              setModalVisible(false);
              setSelectedGarment(null);
              getGarments();
            } catch (err) {
              console.error(err);
              alert("Failed to delete garment");
            };
          }
        }
      ]
    )
  };

  const handlePressGarment = (garment: typeof garments[0]) => {
    setSelectedGarment(garment);
    setModalVisible(true);
  };

  const tops = garments.filter(g => g.category === "top");
  const bottoms = garments.filter(g => g.category === "bottom");
  const shoes = garments.filter(g => g.category === "shoes");

  return (
    <ThemedView style={styles.container} safe={true}>
        <Text style={styles.title}> Tops </Text>
          <ScrollView horizontal>
            {tops.map(item => (
                <CategoryList key={item.id} item={item} onPress={handlePressGarment} />
            ))}
          </ScrollView>
        <Text style={styles.title}> Bottoms </Text>
          <ScrollView horizontal>
            {bottoms.map(item => (
                <CategoryList key={item.id} item={item} onPress={handlePressGarment} />
            ))}
          </ScrollView>
        <Text style={styles.title}> Shoes </Text>
          <ScrollView horizontal>
            {shoes.map(item => (
                <CategoryList key={item.id} item={item} onPress={handlePressGarment} />
            ))}
          </ScrollView>

          <PopUpModal visible={modalVisible} onClose={() => setModalVisible(false)} >
            {selectedGarment && (
              <View style={{ gap: 20 }}>
                  <TouchableOpacity 
                      onPress={() => setModalVisible(false)}
                      style={{ position: 'relative', top: 0, right: 0, padding: 2, zIndex: 10 }}>
                    <Ionicons name={'close'} color={colors.text} size={32} />
                  </TouchableOpacity>

                  <Image
                    source={{ uri: selectedGarment.imageUrl }}
                    style={{ width: '100%', height: 300, borderRadius: 12 }}
                    resizeMode='cover'
                  />

                  <Text style={{ backgroundColor: colors.iconColor, borderRadius: 20, color: 'white', paddingVertical: 5, paddingHorizontal: 15 }}>
                    {selectedGarment.category.toUpperCase()}
                  </Text> 

                  <TouchableOpacity
                    onPress={() => handleDeleteGarment(selectedGarment.id)}
                    style={{ backgroundColor: colors.accent, padding: 12, borderRadius: 10 }}>
                      <Text style={{ color: 'white', textAlign: 'center' }}> Delete Garment </Text>
                  </TouchableOpacity>

              </View>
            )}
          </PopUpModal>

    </ThemedView>
  )
}

export default Closet

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 30,
        paddingRight: 30,
        marginTop: -25,
       
    },
    title: {
        fontSize: 20,
        marginBottom: 15,
        fontFamily: 'StilistaFont',
        textDecorationLine: 'underline',
        color: colors.iconColor,
    }
})