import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Outfits = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.title}> Here you have your outfits </Text>

    </View>
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