import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import ThemedView from '../../components/ThemedView'
import { useGarments } from '../../hooks/useGarments'

const Closet = () => {
  const { garments, getGarments } = useGarments();

  useEffect(() => {
    getGarments();
  }, []);

  const tops = garments.filter(g => g.category === "top");
  const bottoms = garments.filter(g => g.category === "bottom");
  const shoes = garments.filter(g => g.category === "shoes");

  return (
    <ThemedView style={styles.container} safe={true}>

        <Text style={styles.title}> Top </Text>
          <ScrollView horizontal>
            {/* <CategoryList items={tops} /> */}
          </ScrollView>
        <Text style={styles.title}> Bottom </Text>
          <ScrollView horizontal>
            {/* <CategoryList items={bottoms} /> */}
          </ScrollView>
        <Text style={styles.title}> Shoes </Text>
          <ScrollView horizontal>
            {/* <CategoryList items={shoes} /> */}
          </ScrollView>

    </ThemedView>
  )
}

export default Closet

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 30,
        paddingRight: 30,
       
    },
    title: {
        fontWeight: 'bold',
        fontSize: 15
    }
})