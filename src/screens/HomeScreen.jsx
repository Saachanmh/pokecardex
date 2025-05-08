import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import * as api from '../services/tcg-api';

const HomeScreen = () => {
    const [randomCard, setRandomCard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRandomCard = async () => {
            try {
                const allCards = await api.getAllCards();
                console.log(allCards);
                const allCardsImages = allCards.filter(card => card.image);
                const randomIndex = Math.floor(Math.random() * allCardsImages.length);
                setRandomCard(allCardsImages[randomIndex]);
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
                setLoading(false);
            }
        };

        fetchRandomCard();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Accueil</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#ff00cc" />
            ) : (
                randomCard && (
                    <View style={styles.cardItem}>
                        <Image style={styles.img} source={{ uri: randomCard.image + '/low.jpg' }} />
                        <Text style={styles.cardText}>{randomCard.name}</Text>
                    </View>
                )
            )}
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
        padding: 10,
        marginVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    img: {
        width: 200,
        height: 280,
        margin: 5,
    },
    cardText: {
        fontSize: 18,
        color: '#ff00cc',
        marginTop: 10,
    },
});

export default HomeScreen;
