import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CardScreen from '../screens/CardScreen';
import WishlistScreen from '../screens/WishlistScreen';
import CollectionScreen from '../screens/CollectionScreen';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

const icons = {
    Home: require('../assets/icons/home.png'),
    Cartes: require('../assets/icons/tarot.png'),
    Wishlist: require('../assets/icons/favorite.png'),
    Collection: require('../assets/icons/book.png'),
};

const Navbar = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, size }) => {
                    const iconSource = icons[route.name];

                    return (
                        <Image
                            source={iconSource}
                            style={{
                                width: size,
                                height: size,
                                tintColor: focused ? '#ff00cc' : '#888',
                            }}
                            resizeMode="contain"
                        />
                    );
                },
                tabBarActiveTintColor: '#ff00cc',
                tabBarInactiveTintColor: '#888',
                tabBarStyle: {
                    backgroundColor: '#1a1a1a',
                    borderTopWidth: 0,
                },
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Cartes" component={CardScreen} />
            <Tab.Screen name="Wishlist" component={WishlistScreen} />
            <Tab.Screen name="Collection" component={CollectionScreen} />
        </Tab.Navigator>
    );
};

export default Navbar;
