import { Link } from 'expo-router'
import React, { useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import ThemedView from '../../components/ThemedView'
import ThemedTextInput from '../../components/ThemedTextInput'

export default function Login() {
    const [email, setEmail] = useState()

  return (
    <ThemedView style={styles.container}>
         <Text style={styles.title}>
            Log In 
        </Text>

        <ThemedTextInput 
            style={{ width: '60%', marginBottom: 20 }}
            placeholder='Email'
            keyboardType="email-address"
        />

        <Link href="/register" replace>
            <Text style={{ textAlign: "center" }}>
                Don't have an account? Register here 
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
    }
  })