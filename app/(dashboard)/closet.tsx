import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import ThemedView from '../../components/ThemedView'

const Closet = () => {
  return (
    <ThemedView style={styles.container} safe={true}>
        <Text style={styles.title}> Top </Text>
        <ScrollView horizontal>
       </ScrollView>
        <Text style={styles.title}> Bottom </Text>
        <ScrollView></ScrollView>
        <Text style={styles.title}> Shoes </Text>
        <ScrollView></ScrollView>
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