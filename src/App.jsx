import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import MainNavigator from './navigation/MainNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BootSplash from 'react-native-bootsplash';
import { CollectionProvider } from './contexts/FavoritesContext';

const myTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#222222',
    },
};

function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <CollectionProvider>
                <NavigationContainer
                    theme={myTheme}
                    onReady={() => {
                        BootSplash.hide({ fade: true });
                    }}
                >
                    <MainNavigator />
                </NavigationContainer>
            </CollectionProvider>
        </GestureHandlerRootView>
    );
}

export default App;
