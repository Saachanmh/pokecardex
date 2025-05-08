import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CollectionContext = createContext();

export const CollectionProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [owned, setOwned] = useState([]);

    useEffect(() => {
        const loadStorage = async () => {
            const storedFavorites = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
            const storedOwned = JSON.parse(await AsyncStorage.getItem('owned')) || [];
            setFavorites(storedFavorites);
            setOwned(storedOwned);
        };
        loadStorage();
    }, []);

    const updateFavorites = async (newFavorites) => {
        setFavorites(newFavorites);
        await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    };

    const updateOwned = async (newOwned) => {
        setOwned(newOwned);
        await AsyncStorage.setItem('owned', JSON.stringify(newOwned));
    };

    return (
        <CollectionContext.Provider value={{ favorites, updateFavorites, owned, updateOwned }}>
            {children}
        </CollectionContext.Provider>
    );
};

export const useCollection = () => useContext(CollectionContext);
