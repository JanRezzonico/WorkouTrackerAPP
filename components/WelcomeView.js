import React, { useState } from 'react';
import { Text, StyleSheet, Dimensions, Modal, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../assets/style/colors';
import LoginView from './Auth/LoginView';
import SignupView from './Auth/SignupView';
import WTButton from './wt/WTButton';
import { View } from 'react-native';

const WelcomeView = ({ onLogin }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalPage, setModalPage] = useState('');
    ;

    const handleModalOpen = (page) => {
        setModalPage(page);
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
        setModalPage('');
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.imageContainer}>
            <Image accessibilityLabel='WorkouTracker Logo' source={require('../assets/wt-icon.png')} style={styles.logo} />
            </View>
            <View style={styles.interactiveContainer}>
                <Text style={styles.title}>WELCOME ON WORKOUTRACKER</Text>
                <WTButton text={'Login'} onPress={() => handleModalOpen('LoginView')} />
                <WTButton text={'Signup'} onPress={() => handleModalOpen('SignupView')} />

                <Modal visible={modalVisible} animationType="slide" onRequestClose={handleModalClose}>
                    {modalPage === 'LoginView' && <LoginView onClose={handleModalClose} onLogin={onLogin} />}
                    {modalPage === 'SignupView' && <SignupView onClose={handleModalClose} onLogin={onLogin} />}
                </Modal>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: colors.MAIN,
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    title: {
        fontSize: Dimensions.get('window').width * 0.06,
        color: 'white',
        alignSelf: 'center',
        textAlign: 'center',
        padding: 17,
        fontWeight: 'bold',
    },
    logo: {
        borderRadius: 10,
        width: Dimensions.get('window').width * 0.5,
        height: Dimensions.get('window').width * 0.5,
        alignSelf: 'center',
    },
    imageContainer: {
        flex: 1,
        marginTop: Dimensions.get('window').height * 0.08,
    },
    interactiveContainer: {
        flex: 2
    }
});

export default WelcomeView;