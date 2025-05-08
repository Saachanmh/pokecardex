import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image, TouchableOpacity, Modal, Button } from 'react-native';
import { useCollection } from '../contexts/FavoritesContext';
import * as api from '../services/tcg-api';

const CardScreen = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const cardsPerPage = 12;
    const { favorites, updateFavorites, owned, updateOwned } = useCollection();
    const [selectedCard, setSelectedCard] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const allCards = await api.getAllCards();
                const filteredCards = allCards.filter(card => card.image);
                setCards(filteredCards);
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
                setLoading(false);
            }
        };

        fetchCards();
    }, []);

    const handleFavorite = (card) => {
        const updatedFavorites = favorites.includes(card.id)
            ? favorites.filter(id => id !== card.id)
            : [...favorites, card.id];
        updateFavorites(updatedFavorites);
    };

    const handleOwned = (card) => {
        const updatedOwned = owned.includes(card.id)
            ? owned.filter(id => id !== card.id)
            : [...owned, card.id];
        updateOwned(updatedOwned);
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

    const handleCardPress = (card) => {
        api.getCardDetails(card.id).then((cardDetails) => {
            setSelectedCard(cardDetails);
            setModalVisible(true);
        });
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#ff00cc" />
            ) : (
                <View style={styles.mainContainer}>
                    <FlatList
                        styles={styles.flatList}
                        data={getCardsForCurrentPage()}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.cardItem} onPress={() => handleCardPress(item)}>
                                <Image style={styles.img} source={{ uri: item.image + '/low.jpg' }} />
                                <TouchableOpacity style={styles.favoriteButton} onPress={() => handleFavorite(item)}>
                                    <Text style={styles.buttonText}>
                                        {favorites.includes(item.id) ? '❤️' : '🤍'}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.ownedButton} onPress={() => handleOwned(item)}>
                                    <Text style={styles.buttonText}>
                                        {owned.includes(item.id) ? '✅' : '⬜'}
                                    </Text>
                                </TouchableOpacity>
                            </TouchableOpacity>
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
                </View>
            )}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Image style={styles.modalImage} source={{ uri: selectedCard?.image + '/high.jpg' }}/>
                        <Text style={styles.modalText}>Nom: {selectedCard?.name}</Text>
                        <Text style={styles.modalText}>Extension: {selectedCard?.set.name}</Text>
                        <Button title="Fermer" onPress={() => setModalVisible(!modalVisible)} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
        alignItems: 'center',
    },
    flatList: {
        flex: 5,
    },
    container: {
        flex: 1,
        backgroundColor: '#0f0f1a',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40,
    },
    cardItem: {
        backgroundColor: '#1a1a2e',
        padding: 5,
        marginTop: 2,
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
        flex: 5,
    },
    pageText: {
        marginHorizontal: 10,
        color: '#ff00cc',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#1a1a2e',
        padding: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        color: '#ff00cc',
        marginBottom: 10,
    },
    modalImage: {
        width: 245,
        height: 336,
        margin: 5,
    },
});

export default CardScreen;
