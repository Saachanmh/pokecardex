import React from 'react'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import MainNavigator from './navigation/MainNavigator'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import BootSplash from 'react-native-bootsplash'

const myTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#222222'
    }
}

function App () {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer
                theme={myTheme}
                onReady={() => {
                    BootSplash.hide({ fade: true })
                }}
            >
                <MainNavigator />
            </NavigationContainer>
        </GestureHandlerRootView>
    )
}

export default App
