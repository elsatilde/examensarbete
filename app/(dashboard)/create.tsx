import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import ThemedView from '../../components/ThemedView'
import { useGarments } from '../../hooks/useGarments'
import GarmentCarousel from '../../components/CreateCarousel'
import { Garment } from '../../types/Garment.types'

const Create = () => {
  const { garments, getGarments } = useGarments();

  useEffect(() => {
    getGarments();
  }, []);

  const tops = garments.filter((g: Garment) => g.category === "top");
  const bottoms = garments.filter((g: Garment) => g.category === "bottom");
  const shoes = garments.filter((g: Garment) => g.category === "shoes");

  return (
    <ThemedView style={styles.container} safe={true}>
      <GarmentCarousel items={tops} />
      <GarmentCarousel items={bottoms} />
      <GarmentCarousel items={shoes} /> 
    </ThemedView>
  )
}

export default Create

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18
    }
})