import React, { useState } from 'react';
import { Text, StyleSheet, Dimensions, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../assets/style/colors';
import LoginView from './Auth/LoginView';
import SignupView from './Auth/SignupView';
import WTButton from './wt/WTButton';

const WelcomeView = ({ onLogin }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalPage, setModalPage] = useState('');

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
            <Text style={styles.title}>WELCOME ON WORKOUTRACKER</Text>
            <WTButton text={'Login'} onPress={() => handleModalOpen('LoginView')} />
            <WTButton text={'Signup'} onPress={() => handleModalOpen('SignupView')} />

            <Modal visible={modalVisible} animationType="slide" onRequestClose={handleModalClose}>
                {modalPage === 'LoginView' && <LoginView onClose={handleModalClose} onLogin={onLogin} />}
                {modalPage === 'SignupView' && <SignupView onClose={handleModalClose} onLogin={onLogin} />}
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: colors.MAIN,
        flex: 1,
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
});

export default WelcomeView;