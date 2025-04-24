import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import CardScreen from '../screens/CardScreen'
import WishlistScreen from '../screens/WishlistScreen'
import ProfileScreen from '../screens/ProfileScreen'

const Tab = createBottomTabNavigator()

export default function Navbar() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: { backgroundColor: '#1a1a2e' },
                tabBarActiveTintColor: '#ff00cc',
                tabBarInactiveTintColor: '#aaa',
            }}
        >
            <Tab.Screen name="Accueil" component={HomeScreen} />
            <Tab.Screen name="Cartes" component={CardScreen} />
            <Tab.Screen name="Wishlist" component={WishlistScreen} />
            <Tab.Screen name="Profil" component={ProfileScreen} />
        </Tab.Navigator>
    )
}
