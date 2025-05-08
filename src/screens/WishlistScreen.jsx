import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator } from 'react-native';
import { useCollection } from '../contexts/FavoritesContext';
import axios from 'axios';

const WishlistScreen = () => {
    const { favorites } = useCollection();
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadFavoriteCards = async () => {
            try {
                const response = await axios.get('https://api.tcgdex.net/v2/fr/cards');
                const allCards = response.data.filter(card => card.image);
                const favoriteCards = allCards.filter(card => favorites.includes(card.id));
                setCards(favoriteCards);
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors du chargement des cartes favorites :', error);
                setLoading(false);
            }
        };

        loadFavoriteCards();
    }, [favorites]);

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#ff00cc" />
            ) : (
                <FlatList
                    data={cards}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.cardItem}>
                            <Image style={styles.img} source={{ uri: item.image + '/low.jpg' }} />
                        </View>
                    )}
                    numColumns={3}
                />
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

export default WishlistScreen;
