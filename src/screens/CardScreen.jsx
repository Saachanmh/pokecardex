import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, FlatList, ActivityIndicator, Image} from 'react-native';
import axios from 'axios';
import {checkIfFolderIsGitRepo} from "@react-native-community/cli/build/commands/init/git";

const CardScreen = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fonction pour récupérer les données de l'API
        const fetchCards = async () => {
            try {
                const response = await axios.get('https://api.tcgdex.net/v2/fr/cards');
                setCards(response.data);
                setLoading(false);
                console.log(response)
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
                setLoading(false);
            }
        };

        fetchCards();
    }, []);

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#ff00cc" />
            ) : (
                cards.slice(0,12).map((card) =>
                    <View key={card.id} style={styles.cardItem}>
                        <Image style={styles.img} key={card.id} source={{uri: card.image+'/low.jpg'}}></Image>
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
        flexDirection: 'row',
        flexWrap: 'wrap',
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
        flexBasis: '33%',

    },
    img: {
        width: 122,
        height: 168,
        margin: 5
    },
});

export default CardScreen;
