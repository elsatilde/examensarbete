import React from 'react'
import { StyleSheet, Text } from 'react-native'
import ThemedView from '../../components/ThemedView'

const Outfits = () => {
  return (
    <ThemedView style={styles.container} safe={true}>
        <Text style={styles.title}> Here you have your outfits </Text>
    </ThemedView>
  )
}

export default Outfits

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