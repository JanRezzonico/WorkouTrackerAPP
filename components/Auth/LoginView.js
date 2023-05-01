import { useState } from 'react';
import { Text, View, StyleSheet, Dimensions, TextInput, SafeAreaView, ScrollView } from 'react-native';
import DB from '../../api/api';
import colors from '../../assets/style/colors';
import WTButton from '../wt/WTButton';
import WTIconButton from '../wt/WTIconButton';
import { handleLogin } from './Model';
function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');




    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.mainContainer}>
                <WTIconButton library='Ionicons' name='arrow-back' onPress={() => { props.onClose() }} />
                <ScrollView>
                    <Text style={styles.title}>WELCOME BACK ON WORKOUTRACKER</Text>
                    <View>
                        <View style={styles.card}>
                            <Text style={styles.subTitle}>Username</Text>
                            <TextInput
                                style={styles.inputs}
                                value={username}
                                onChangeText={setUsername}
                            />
                            <Text style={styles.subTitle}>Password</Text>
                            <TextInput
                                secureTextEntry={true}
                                style={styles.inputs}
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>
                    </View>
                    <Text style={styles.error}>{message}</Text>
                    <WTButton onPress={() => handleLogin(username, password, props.onLogin, setMessage)} text={"Login"}></WTButton>
                </ScrollView>
            </View>

        </SafeAreaView>
    );
}

export default LoginView;


const styles = StyleSheet.create({
    // Style for iOS ONLY...
    datePicker: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 'auto',
        height: 'auto',
        display: 'flex',
    },
    mainContainer: {
        flex: 1,
        backgroundColor: colors.MAIN
    },
    title: {
        fontSize: Dimensions.get('window').width * 0.06,
        color: 'white',
        alignSelf: 'center',
        textAlign: 'center',
        padding: 17,
        fontWeight: 'bold',
    },
    card: {
        width: Dimensions.get('window').width * 0.9,
        height: 'auto',
        borderRadius: 10,
        backgroundColor: colors.MAIN,
        backfaceVisibility: 'hidden',
        alignSelf: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 25,
        marginTop: 5,
        marginBottom: 20,
    },
    subTitle: {
        marginTop: 10,
        marginBottom: 7,
        fontSize: Dimensions.get('window').width * 0.04,
        textAlign: 'justify',
        color: 'white',
    },
    normalText: {
        fontSize: Dimensions.get('window').width * 0.04,
        color: 'white',
    },
    inputs: {
        borderWidth: 1,
        borderColor: '#636363',
        marginHorizontal: Dimensions.get('window').width * 0.3,
        width: Dimensions.get('window').width * 0.5,
        borderRadius: 7,
        color: 'white',
        fontSize: 13,
        paddingHorizontal: 7,
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: '#2e42f8',
        borderRadius: 10,
        marginTop: Dimensions.get('window').height * 0.02,
        marginRight: 'auto',
        marginLeft: 'auto',
        padding: 10,
        paddingHorizontal: 100

    },
    appButtonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase'
    },
    arrowContainer: {
        justifyContent: 'flex-start',
        marginVertical: 10,
        marginHorizontal: 10
    }
});
