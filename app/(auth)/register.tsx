import { Link } from 'expo-router'
import React from 'react'
import { StyleSheet, Text } from 'react-native'
import ThemedView from '../../components/ThemedView'

export default function Register() {
  return (
    <ThemedView style={styles.container}>

        <Text style={styles.title}> 
            Register an account
        </Text>

        <Link href="/login" replace>
            <Text style={{ textAlign: "center" }}>
                Already have an account? Log In here
            </Text>
        </Link>

    </ThemedView>
   
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    title: {
      textAlign: "center",
      fontSize: 18,
      marginBottom: 30
    },
  })