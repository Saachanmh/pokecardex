import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const loadFavorites = async () => {
            const storedFavorites = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
            setFavorites(storedFavorites);
        };
        loadFavorites();
    }, []);

    const updateFavorites = async (newFavorites) => {
        setFavorites(newFavorites);
        await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    };

    return (
        <FavoritesContext.Provider value={{ favorites, updateFavorites }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => useContext(FavoritesContext);
