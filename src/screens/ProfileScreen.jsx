import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const ProfileScreen= () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Profil</Text>
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

export default ProfileScreen;
