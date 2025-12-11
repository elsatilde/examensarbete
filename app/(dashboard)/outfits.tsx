import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import ThemedView from '../../components/ThemedView'
import DispalyOutfit, { OutfitItems } from '../../components/DisplayOutfit'
import { useUser } from '../../hooks/useUser';
import { useOutfits } from '../../hooks/useOutfits';
import { Outfit } from '../../types/Outfit.types';
import PopUpModal from '../../components/PopUpModal';
import { getGarmentById } from '../../services/garments';
import { colors } from '../../variables/colors';
import { deleteOutfit } from '../../services/outfits';
import { Ionicons } from '@expo/vector-icons';

export default function Outfits() {
  const { user } = useUser();
  const { getOutfits } = useOutfits();
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [selectedOutfit, setSelectedOutfit] = useState<Outfit | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [popupItems, setPopupItems] = useState<OutfitItems>({});

  useEffect(() => {

    const load = async () => {
      if (!user) return;
      const data = await getOutfits();
      setOutfits(data);
    }; 

    load();

  }, [user]);

  useEffect(() => {
    if (!modalVisible || !selectedOutfit || !user) return;

    const load = async () => {
      const top = await getGarmentById(user, selectedOutfit.topId);
      const bottom = await getGarmentById(user, selectedOutfit.bottomId);
      const shoes = await getGarmentById(user, selectedOutfit.shoesId);
      setPopupItems({ top, bottom, shoes });
    };

    load();

  }, [modalVisible, selectedOutfit, user]);

  const handleDeleteOutfit = async (id: string) => {
    Alert.alert(
      "Delete Outfit",
      "Are you sure you want to delete this outfit?",
      [
        {text: "Cancel", style: "cancel" },
        {text: "Delete", style: "destructive",
          onPress: async () => {
            if (!user) return;
            try {
              await deleteOutfit(user, id);
              setOutfits(prev  => prev.filter(o => o.id !== id));
              setSelectedOutfit(null);
              setModalVisible(false);
            } catch (err) {
              console.error(err);
              alert("Failed to delete outfit ");
            };
          }
        }
      ]
    )
  }

  return (
    <ThemedView style={styles.container} safe={true}>
        <Text style={styles.title}> Saved Outfits </Text>

        <ScrollView style={{ margin: 10 }}>    
              {outfits.map((outfit) => (
                <TouchableOpacity
                    key={outfit.id}
                    style={{ marginBottom: 20 }} 
                    onPress={() => {
                      setSelectedOutfit(outfit);
                      setModalVisible(true);
                    }} 
                    >
                        <DispalyOutfit outfit={outfit} user={user} />
                </TouchableOpacity>
              ))}
        </ScrollView>

        <PopUpModal visible={modalVisible} onClose={() => setModalVisible(false)}>
          {selectedOutfit && popupItems.top && popupItems.bottom && popupItems.shoes && (
            <View style={{ gap: 20 }}>
                <TouchableOpacity 
                  onPress={() => setModalVisible(false)}
                  style={{ position: 'relative', top: 0, right: 0, padding: 2, zIndex: 10 }}>
                  <Ionicons name={'close'} color={colors.text} size={32} />
                </TouchableOpacity>

                <DispalyOutfit outfit={selectedOutfit} user={user} />

                <Text style={{ fontSize: 18, fontWeight: 'bold' }}> Garments: </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {[popupItems.top, popupItems.bottom, popupItems.shoes].map((g, i) => ( // Kanske att man ska komma till garment card när man trycker på ett plagg
                    <Image 
                      key={i}
                      source={{ uri: g?.imageUrl}}
                      style={{ width: 100, height: 100, marginRight: 10 }}
                    />
                  ))}
                </ScrollView>

                <TouchableOpacity
                  onPress={() => handleDeleteOutfit(selectedOutfit.id)}
                  style={{ backgroundColor: colors.accent, padding: 12, borderRadius: 10}}>
                    <Text style={{ color:'white', textAlign: 'center' }}> Delete Outfit </Text>
                </TouchableOpacity>
            </View>
          )}
        </PopUpModal>
    </ThemedView>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 30,
        paddingRight: 30,
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30,
        marginTop: -30,
        marginBottom: 20,
        fontFamily: 'StilistaFont'
    }
})