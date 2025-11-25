import { Link } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const LogIn = () => {
  return (
    <View style={styles.container}>
         <Text style={styles.title}>
            Log In 
        </Text>
        <Link href="/register" replace>
            <Text style={{ textAlign: "center" }}>
                Don't have an account? Register here 
            </Text>
        </Link>    
    </View>
   
  )
}

export default LogIn

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