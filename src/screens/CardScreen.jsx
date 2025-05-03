import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useFavorites } from '../contexts/FavoritesContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CardScreen = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [owned, setOwned] = useState([]);
    const [page, setPage] = useState(1);
    const cardsPerPage = 12;
    const { favorites, updateFavorites } = useFavorites();

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await axios.get('https://api.tcgdex.net/v2/fr/cards');
                const filteredCards = response.data.filter(card => card.image);
                setCards(filteredCards);
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
                setLoading(false);
            }
        };

        const loadStorage = async () => {
            const storedOwned = JSON.parse(await AsyncStorage.getItem('owned')) || [];
            setOwned(storedOwned);
        };

        fetchCards();
        loadStorage();
    }, []);

    const handleFavorite = (card) => {
        const updatedFavorites = favorites.includes(card.id)
            ? favorites.filter(id => id !== card.id)
            : [...favorites, card.id];
        updateFavorites(updatedFavorites);
    };

    const handleOwned = async (card) => {
        const updatedOwned = owned.includes(card.id)
            ? owned.filter(id => id !== card.id)
            : [...owned, card.id];
        setOwned(updatedOwned);
        await AsyncStorage.setItem('owned', JSON.stringify(updatedOwned));
    };

    const handleNextPage = () => {
        if ((page * cardsPerPage) < cards.length) {
            setPage(page + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const getCardsForCurrentPage = () => {
        const startIndex = (page - 1) * cardsPerPage;
        return cards.slice(startIndex, startIndex + cardsPerPage);
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#ff00cc" />
            ) : (
                <>
                    <FlatList
                        data={getCardsForCurrentPage()}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.cardItem}>
                                <Image style={styles.img} source={{ uri: item.image + '/low.jpg' }} />
                                <TouchableOpacity style={styles.favoriteButton} onPress={() => handleFavorite(item)}>
                                    <Text style={styles.buttonText}>
                                        {favorites.includes(item.id) ? '❤️' : '♡'}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.ownedButton} onPress={() => handleOwned(item)}>
                                    <Text style={styles.buttonText}>
                                        {owned.includes(item.id) ? '✅' : '☐'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        numColumns={3}
                    />
                    <View style={styles.pagination}>
                        <TouchableOpacity onPress={handlePrevPage} disabled={page === 1}>
                            <Text style={styles.pageText}>Précédent</Text>
                        </TouchableOpacity>
                        <Text style={styles.pageText}>Page {page}</Text>
                        <TouchableOpacity onPress={handleNextPage} disabled={(page * cardsPerPage) >= cards.length}>
                            <Text style={styles.pageText}>Suivant</Text>
                        </TouchableOpacity>
                    </View>
                </>
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
        position: 'relative',
    },
    img: {
        width: 122,
        height: 168,
        margin: 5,
    },
    buttonText: {
        fontSize: 24,
        color: '#ff00cc',
    },
    favoriteButton: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
    ownedButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    pagination: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    pageText: {
        marginHorizontal: 10,
        color: '#ff00cc',
    },
});

export default CardScreen;
