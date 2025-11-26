import { Link } from 'expo-router'
import React, { useState } from 'react'
import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import ThemedView from '../../components/ThemedView'
import ThemedTextInput from '../../components/ThemedTextInput'
import ThemedButton from '../../components/ThemedButton'
import { colors } from '../../variables/colors'

export default function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        console.log('Login form submitted')
    }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ThemedView style={styles.container}>
            <Text style={styles.title}> 
                Register an account
            </Text>

            <ThemedTextInput 
                style={{ width: '60%', marginBottom: 20 }}
                placeholder='Email'
                keyboardType="email-address"
                onChangeText={setEmail}
                value={email}
            />

            <ThemedTextInput
                style={{ width: '60%', marginBottom: 20 }}
                placeholder='Password'
                onChangeText={setPassword}
                value={password}
                secureTextEntry
            />

            <Link href="/login" replace>
                <Text style={{ textAlign: "center" }}>
                    Already have an account? Log In here
                </Text>
            </Link>

            <ThemedButton onPress={handleSubmit} style={{ backgroundColor: colors.iconColor}}>
                <Text style={{ color: colors.background }}> Register </Text>
            </ThemedButton>  

        </ThemedView>
    </TouchableWithoutFeedback>
   
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