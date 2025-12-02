import { StyleSheet } from 'react-native'
import React from 'react'
import ThemedView from '../../components/ThemedView'


const Home = () => {

  return (
    <ThemedView style={styles.container} safe={true}>


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