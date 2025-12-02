import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import ThemedView from '../../components/ThemedView'

const Outfits = () => {
  return (
    <ThemedView style={styles.container} safe={true}>
        <Text style={styles.title}> Saved Outfits </Text>
        <ScrollView>
          <View style={{ backgroundColor: 'pink', marginTop: 40, width: 300, height: 300 }}></View>
          <View style={{ backgroundColor: 'green', marginTop: 40, width: 300, height: 300 }}></View>
          <View style={{ backgroundColor: 'blue', marginTop: 40, width: 300, height: 300 }}></View>
          <View style={{ backgroundColor: 'red', marginTop: 40, width: 300, height: 300 }}></View>
        </ScrollView>
    </ThemedView>
  )
}

export default Outfits

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 30,
        paddingRight: 30,
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 15
    }
})