import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ThemedView from '../../components/ThemedView'
import DispalyOutfit from '../../components/DisplayOutfit'
import { useUser } from '../../hooks/useUser';
import { useOutfits } from '../../hooks/useOutfits';
import { Outfit } from '../../types/Outfit.types';

export default function Outfits() {
  const { user } = useUser();
  const { getOutfits } = useOutfits();
  const [outfits, setOutfits] = useState<Outfit[]>([]);

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      const data = await getOutfits();
      setOutfits(data);
    }; 
    load();
  }, [user]);


  return (
    <ThemedView style={styles.container} safe={true}>
        <Text style={styles.title}> Saved Outfits </Text>

        <ScrollView style={{ margin: 10 }}>    
              {outfits.map((outfit) => (
                <TouchableOpacity
                    key={outfit.id}
                    style={{ marginBottom: 20 }} 
                    onPress={() => console.log("Clicked outfit:", outfit.id)}
                    >
                        <DispalyOutfit outfit={outfit} user={user} />
                </TouchableOpacity>
              ))}
        </ScrollView>
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