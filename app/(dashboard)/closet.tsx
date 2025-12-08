import React, { useCallback, useEffect } from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import ThemedView from '../../components/ThemedView'
import { useGarments } from '../../hooks/useGarments'
import { useFocusEffect } from 'expo-router'
import CategoryList from '../../components/CategoryList'

const Closet = () => {
  const { garments, getGarments } = useGarments();

  useFocusEffect(
    useCallback(() => {
      getGarments();
    }, [])
  );

  const tops = garments.filter(g => g.category === "top");
  const bottoms = garments.filter(g => g.category === "bottom");
  const shoes = garments.filter(g => g.category === "shoes");

  return (
    <ThemedView style={styles.container} safe={true}>

        <Text style={styles.title}> Tops </Text>
          <ScrollView horizontal>
            {tops.map(item => (
                <CategoryList key={item.id} item={item} />
            ))}
          </ScrollView>
        <Text style={styles.title}> Bottoms </Text>
          <ScrollView horizontal>
            {bottoms.map(item => (
                <CategoryList key={item.id} item={item} />
            ))}
          </ScrollView>
        <Text style={styles.title}> Shoes </Text>
          <ScrollView horizontal>
            {shoes.map(item => (
                <CategoryList key={item.id} item={item} />
            ))}
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
        fontSize: 20,
        marginBottom: 15,
    }
})