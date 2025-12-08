import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import ThemedView from '../../components/ThemedView'
import { useGarments } from '../../hooks/useGarments'
import GarmentCarousel from '../../components/CreateCarousel'
import { Garment } from '../../types/Garment.types'
import { useOutfits } from '../../hooks/useOutfits'
import { colors } from '../../variables/colors'


const Create = () => {
  const { garments, getGarments } = useGarments();
  const { addOutfit } = useOutfits();

  const [selectedTop, setSelectedTop] = useState<string | null>(null);
  const [selectedBottom, setSelectedBottom] = useState<string | null>(null);
  const [selectedShoes, setSelectedShoes] = useState<string | null>(null);

  useEffect(() => {
    getGarments();
  }, []);

  const tops = garments.filter((g: Garment) => g.category === "top");
  const bottoms = garments.filter((g: Garment) => g.category === "bottom");
  const shoes = garments.filter((g: Garment) => g.category === "shoes");

  const saveOutfit = async () => {
    if(!selectedTop || !selectedBottom || !selectedShoes){
      alert("Please choose three garments");
      return;
    }

    await addOutfit(selectedTop, selectedBottom, selectedShoes);

    setSelectedTop(null);
    setSelectedBottom(null);
    setSelectedShoes(null);
    alert("Outfit saved!")
  };

  return (
    <ThemedView style={styles.container} safe={true} >
      <GarmentCarousel items={tops} onSelect={setSelectedTop} selectedId={selectedTop} />
      <GarmentCarousel items={bottoms} onSelect={setSelectedBottom} selectedId={selectedBottom} />
      <GarmentCarousel items={shoes} onSelect={setSelectedShoes} selectedId={selectedShoes} /> 

      <TouchableOpacity style={styles.saveBtn} onPress={saveOutfit}>
          <Text style={styles.textBtn}> Save Outfit </Text>
      </TouchableOpacity>
    </ThemedView>
  )
}

export default Create

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: -25,
        paddingTop: 20,
        justifyContent: 'space-around',
        paddingHorizontal: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18
    },
    saveBtn: {
        backgroundColor: colors.accent,
        color: 'white',
        marginTop: -7,
        alignSelf: 'center',
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 10,
    },
    textBtn: {
      color: 'white',
      fontWeight: '600',
      alignSelf: 'center',
    }
})