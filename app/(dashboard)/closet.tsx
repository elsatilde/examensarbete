import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Closet = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.title}> Here you have your items </Text>

    </View>
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