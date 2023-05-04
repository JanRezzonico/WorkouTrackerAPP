import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ScreenOrientation from 'expo-screen-orientation';
import { NavigationContainer } from '@react-navigation/native';
import TabMenu from './components/TabMenu';
import WelcomeView from './components/WelcomeView';
import constants from './constants/constants';
function App() {

    const [isLoaded, setIsLoaded] = useState(false);
    const [initialRoute, setInitialRoute] = useState('WelcomeView');

    useEffect(() => {
        const loadExercises = async () => {
            let exercises = require('./assets/json/exercises.json').exercises;
            global.exercises = exercises;
            setIsLoaded(true);
        };
        const changeScreenOrientation = async () => {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        };
        const checkIfUserIsLoggedIn = async () => {
            try {
                const value = await AsyncStorage.getItem('_id');
                if (value !== null) {
                    setInitialRoute('TabMenu');
                }
            } catch (error) {
                console.error(error);
            }
        };
        const setUserId = async () => {
            const value = await AsyncStorage.getItem('_id');
            global.USER_ID = value;
        };
        if (constants.DELETE_USER_ID) {
            const removeData = async () => {
                try {
                    await AsyncStorage.removeItem('_id');
                } catch (e) {
                    // Error removing data
                }
            };
            removeData();
        }
        setUserId();
        changeScreenOrientation();
        checkIfUserIsLoggedIn();
        loadExercises();
    }, []);

    if (!isLoaded) {
        return (
            <View style={styles.container}>
                <Image source={require('./assets/loading.gif')} />
            </View>
        );
    }
    return (
        <NavigationContainer initialRouteName={initialRoute}>
            {initialRoute === 'WelcomeView' ? (
                <WelcomeView onLogin={() => { setInitialRoute('TabMenu') }} />
            ) : (
                <TabMenu />
            )}
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default App;