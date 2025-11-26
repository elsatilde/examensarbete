import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ThemedView from '../../components/ThemedView'

const Closet = () => {
  return (
    <ThemedView style={styles.container} safe={true}>
        <Text style={styles.title}> Here you have your items </Text>
    </ThemedView>
  )
}

export default Closet

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