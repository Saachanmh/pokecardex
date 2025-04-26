import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
    const [owned, setOwned] = useState([]);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const loadOwned = async () => {
            const storedOwned = JSON.parse(await AsyncStorage.getItem('owned')) || [];
            setOwned(storedOwned);

            const response = await axios.get('https://api.tcgdex.net/v2/fr/cards');
            const allCards = response.data.filter(card => card.image);
            const ownedCards = allCards.filter(card => storedOwned.includes(card.id));
            setCards(ownedCards);
        };

        loadOwned();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Profil</Text>
            <FlatList
                data={cards}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.cardItem}>
                        <Image style={styles.img} source={{ uri: item.image + '/low.jpg' }} />
                    </View>
                )}
            />
        </View>
    );
};

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
    cardItem: {
        backgroundColor: '#1a1a2e',
        padding: 5,
        marginVertical: 5,
        borderRadius: 8,
        alignItems: 'center',
    },
    img: {
        width: 122,
        height: 168,
        margin: 5,
    },
});

export default ProfileScreen;
