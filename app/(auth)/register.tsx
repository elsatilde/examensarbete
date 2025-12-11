import { Link, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import ThemedView from '../../components/ThemedView'
import ThemedTextInput from '../../components/ThemedTextInput'
import ThemedButton from '../../components/ThemedButton'
import { colors } from '../../variables/colors'
import { useUser } from '../../hooks/useUser'
import { getFirebaseErrorMessage } from '../../utils/firebaseErrors'
import { RegisterCredentials } from '../../types/Auth.types'

export default function Register() {
    const [form, setForm] = useState<RegisterCredentials>({
      email: "",
      password: "",
      confirmPassword: "",
    });
    const [error, setError] = useState<string | null>(null);

    const { register, loading } = useUser();
    const router = useRouter();

    const handleChange = (key: keyof RegisterCredentials, value: string) => {
      setForm({...form, [key]: value});
    };

    const handleSubmit = async () => {
        setError(null);

        if (form.password !== form.confirmPassword) {
          setError("Passwords do not match");
          return;
        }

        try {
            await register(form.email, form.password);
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
                Register an account
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
              <ThemedTextInput
                style={{ width: '60%', marginBottom: 20 }}
                placeholder='Confirm Password'
                value={form.confirmPassword}
                onChangeText={(text) => handleChange("confirmPassword", text)}
                secureTextEntry
            />

            <Link href="/(auth)/login" replace>
                <Text style={{ textAlign: 'center', textDecorationLine: 'underline' }}>
                    Already have an account? Login here
                </Text>
            </Link>

            {error && <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>}

            <ThemedButton 
                onPress={handleSubmit} 
                style={{ backgroundColor: colors.iconColor}}
                disabled={loading}
                >
                <Text style={{ color: colors.background }}> 
                    {loading ? "Loading..." : "Register"}
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
    },
  })