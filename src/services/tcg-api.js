import axios from 'axios';
import Config from 'react-native-config';

const api = axios.create({
    baseURL: Config.TCG_API_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    timeout: 10000,
});

const getAllCards = async () => {
    try {
        const response = await api.get('/fr/cards');
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
    }
};

const getCardDetails = async (cardId) => {
    try {
        const response = await api.get('/fr/cards/' + cardId);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
    }
};

export {
    getAllCards,
    getCardDetails,
};


