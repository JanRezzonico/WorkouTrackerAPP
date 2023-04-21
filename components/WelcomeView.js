import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../assets/style/colors';
import LoginView from './LoginView';
import SignupView from './SignupView';
import WTButton from './wt/WTButton';

const WelcomeView = (props) => {
    const [page, setPage] = useState("WelcomeView");
    return (
        <SafeAreaView style={styles.mainContainer}>
            {
                page == "WelcomeView" &&
                <View>
                    <Text style={styles.title}>WELCOME ON WORKOUTRACKER</Text>
                    <WTButton text={"Login"} onPress={() => { setPage("LoginView") }} />
                    <WTButton text={"Signup"} onPress={() => { setPage("SignupView") }} />
                </View>
            }
            {
                page == "LoginView" && <LoginView />
            }
            {
                page == "SignupView" && <SignupView />
            }

            {/* </Modal> */}
            
        </SafeAreaView>
    );
};

export default WelcomeView;

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: colors.MAIN,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    title: {
        fontSize: Dimensions.get('window').width * 0.06,
        color: 'white',
        alignSelf: 'center',
        textAlign: 'center',
        padding: 17,
        fontWeight: 'bold',
    },
});
