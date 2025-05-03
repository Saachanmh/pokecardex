import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import MainNavigator from './navigation/MainNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BootSplash from 'react-native-bootsplash';
import { FavoritesProvider } from './contexts/FavoritesContext';

const myTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#222222'
    }
};

function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <FavoritesProvider>
                <NavigationContainer
                    theme={myTheme}
                    onReady={() => {
                        BootSplash.hide({ fade: true });
                    }}
                >
                    <MainNavigator />
                </NavigationContainer>
            </FavoritesProvider>
        </GestureHandlerRootView>
    );
}

export default App;
