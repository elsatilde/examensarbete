import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import ThemedView from '../../components/ThemedView'

const Home = () => {

  return (
    <ThemedView style={styles.container} safe={true}>

      <Text style={styles.title}> Stilista </Text>

      <Link href="/login" style={styles.link}>
        <Text> Login Page </Text>
      </Link>

      <Link href="/register" style={styles.link}>
        <Text> Register Page </Text>
      </Link>

    </ThemedView>
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