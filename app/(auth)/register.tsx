import { Link } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Register = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.title}> 
            Register an account
        </Text>
        <Link href="/login" replace>
            <Text style={{ textAlign: "center" }}>
                Already have an account? Log In here
            </Text>
        </Link>
    </View>
   
  )
}

export default Register

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