import React, { useEffect, useRef, useState } from 'react'
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
import ShimmerOutfitList from '../../components/ShimmerOutfitList';

const Outfits = () => {
  const { user } = useUser();
  const hasShownLoader = useRef(false);
  const [loading, setLoading] = useState(false);
  const { getOutfits } = useOutfits();
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [selectedOutfit, setSelectedOutfit] = useState<Outfit | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [popupItems, setPopupItems] = useState<OutfitItems>({});

  useEffect(() => {
    if (!user) return;

    if(!hasShownLoader.current) {
      setLoading(true);

      const load = async () => {
        const data = await getOutfits();
        setOutfits(data);
      }; 

      load();

      const timer = setTimeout(() => {
        setLoading(false);
        hasShownLoader.current = true;
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      const load = async () => {
        const data = await getOutfits();
        setOutfits(data);
      }; 
      load();
    }
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
              Alert.alert("", "Failed to delete outfit ");
            };
          }
        }
      ]
    )
  }

  return (
    <ThemedView style={styles.container} safe={true}>
        <Text style={styles.title}> Saved Outfits </Text>
        {loading ? (
          <>
            <ShimmerOutfitList/>
          </>
        ): (
          <>
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
        </>
      )}

        <PopUpModal visible={modalVisible} onClose={() => setModalVisible(false)}>
          {selectedOutfit && popupItems.top && popupItems.bottom && popupItems.shoes && (
            <View style={{ gap: 20 }}>
                <TouchableOpacity 
                  onPress={() => setModalVisible(false)}
                  style={{ position: 'relative', top: 0, right: 0, zIndex: 10 }}>
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

                <View style={{ alignItems: 'flex-end'}}>
                <TouchableOpacity
                  onPress={() => handleDeleteOutfit(selectedOutfit.id)}
                  style={{ backgroundColor: colors.error, padding: 8, borderRadius: 15, borderColor: 'red', borderWidth: 1, width: 150 }}>
                    <Text style={{ color:'white', textAlign: 'center', fontWeight: 'bold' }}> Delete Outfit </Text>
                </TouchableOpacity>
                </View>
            </View>
          )}
        </PopUpModal>
    </ThemedView>
  )
}

export default Outfits


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