import React from 'react'
import {StyleSheet, Text, View} from 'react-native'

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Accueil</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f0f1a',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 24,
        color: '#ff00cc',
    },
})
export default HomeScreen;
