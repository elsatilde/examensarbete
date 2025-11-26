import React from 'react'
import { StyleSheet, Text } from 'react-native'
import ThemedView from '../../components/ThemedView'

const Create = () => {
  return (
    <ThemedView style={styles.container} safe={true}>
        <Text style={styles.title}> Create a outfit here </Text>
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