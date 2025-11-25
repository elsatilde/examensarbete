import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Create = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.title}> Create a outfit here </Text>

    </View>
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