import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Home = () => {
  return (
    <View style={styles.container}>

      <Text style={styles.title}> Stilista </Text>

      <Link href="/closet" style={styles.link} >
        <Text> Closet </Text>
      </Link>

      <Link href="/create" style={styles.link} >
        <Text> Create </Text>
      </Link>

      <Link href="/outfits" style={styles.link} >
        <Text> Outfits </Text>
      </Link>

    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    link: {
        marginVertical: 10,
        borderBottomWidth: 1
    },
    
})