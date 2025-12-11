import { Link, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import ThemedView from '../../components/ThemedView'
import ThemedTextInput from '../../components/ThemedTextInput'
import ThemedButton from '../../components/ThemedButton'
import { colors } from '../../variables/colors'
import { useUser } from '../../hooks/useUser'
import { getFirebaseErrorMessage } from '../../utils/firebaseErrors'
import { LoginCredentials } from '../../types/Auth.types'

export default function Login() {
    const [form, setForm] = useState<LoginCredentials>({
        email: "",
        password: "",
    })
    const [error, setError] = useState<string | null>(null);

    const { login, loading } = useUser();
    const router = useRouter();

    const handleChange = (key: keyof LoginCredentials, value: string) => {
        setForm({...form, [key]: value})
    }

    const handleSubmit = async () => {
        setError(null);
        try {
            await login(form.email, form.password);
            console.log("Login successful!");
            router.replace('/(dashboard)');
        } catch (err: any) {
            const msg = err.code ? getFirebaseErrorMessage(err.code) : err.message;
            setError(msg);
        }
    }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ThemedView style={styles.container}>
            <Text style={styles.title}>
                Login to your account
            </Text>

            <ThemedTextInput 
                style={{ width: '60%', marginBottom: 20 }}
                placeholder='Email'
                keyboardType="email-address"
                value={form.email}
                onChangeText={(text) => handleChange("email", text)}
            />

            <ThemedTextInput 
                style={{ width: '60%', marginBottom: 20 }}
                placeholder='Password'
                value={form.password}
                onChangeText={(text) => handleChange("password", text)}
                secureTextEntry
            />

            <Link href="/(auth)/register" replace>
                <Text style={{ textAlign: 'center', textDecorationLine: 'underline' }}>
                    Don't have an account? Register here 
                </Text>
            </Link>  

            {error && <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>}

            <ThemedButton 
                onPress={handleSubmit} 
                style={{ backgroundColor: colors.iconColor}}
                disabled={loading}
                >
                <Text style={{ color: colors.background }}> 
                    {loading ? "Loading..." : "Login"}
                </Text>
            </ThemedButton>  
        </ThemedView>
    </TouchableWithoutFeedback>
   
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    title: {
      textAlign: 'center',
      fontSize: 18,
      marginBottom: 30
    }
  })