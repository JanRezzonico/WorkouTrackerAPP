import { useState } from 'react';
import { Text, View, StyleSheet, Dimensions, TextInput, SafeAreaView, ScrollView } from 'react-native';
import NumericInput from 'react-native-numeric-input'
import colors from '../../assets/style/colors';
import WTButton from '../wt/WTButton';
import WTDatePicker from '../wt/WTDatePicker';
import constants from '../../constants/constants';
import WTIconButton from '../wt/WTIconButton';
import { handleSignup } from './Model';
import { useRef } from 'react';

function SignupView(props) {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [weight, setWeight] = useState(null);
    const [height, setHeight] = useState(null);
    const [date, setDate] = useState(new Date());
    const [message, setMessage] = useState('');
    const placeholderTextColor = colors.TEXT + "80"; //Add alpha 0.5 to the hex color

    return (
        <SafeAreaView style={styles.mainContainer}>
            <WTIconButton library='Ionicons' name="arrow-back" onPress={() => { props.onClose() }} />
            <ScrollView>
                <Text style={styles.title}>WELCOME ON WORKOUTRACKER</Text>
                <View style={styles.card}>
                    <Text style={styles.subTitle}>Name</Text>
                    <TextInput
                        style={styles.inputs}
                        value={name}
                        onChangeText={text => setName(text)}
                        placeholder='Name'
                        placeholderTextColor={placeholderTextColor}
                    />
                    <Text style={styles.subTitle}>Surname</Text>
                    <TextInput
                        style={styles.inputs}
                        value={surname}
                        onChangeText={text => setSurname(text)}
                        placeholder='Surname'
                        placeholderTextColor={placeholderTextColor}
                    />
                    <Text style={styles.subTitle}>Username</Text>
                    <TextInput
                        style={styles.inputs}
                        value={username}
                        onChangeText={text => setUsername(text)}
                        placeholder='Username'
                        placeholderTextColor={placeholderTextColor}
                    />
                    <Text style={styles.subTitle}>Password</Text>
                    <TextInput
                        style={styles.inputs}
                        secureTextEntry={true}
                        value={password}
                        onChangeText={text => setPassword(text)}
                        placeholder='Password'
                        placeholderTextColor={placeholderTextColor}
                    />
                    <Text style={styles.subTitle}>Weight [{constants.WEIGHT_MIN} - {constants.WEIGHT_MAX}kg]</Text>
                    <NumericInput
                        containerStyle={styles.numericInputs}
                        inputStyle={styles.numericInputs}
                        value={weight}
                        onChange={(value) => setWeight(value)}
                        minValue={constants.WEIGHT_MIN}
                        maxValue={constants.WEIGHT_MAX}
                        type='up-down'
                        rounded
                        upDownButtonsBackgroundColor={colors.MAIN}
                        iconStyle={{ color: colors.TEXT }}
                        textColor={colors.TEXT}
                        valueType='real'
                    />
                    <Text style={styles.subTitle}>Height [{constants.HEIGHT_MIN} - {constants.HEIGHT_MAX}cm]</Text>
                    <NumericInput
                        containerStyle={styles.numericInputs}
                        inputStyle={styles.numericInputs}
                        value={height}
                        onChange={(value) => setHeight(value)}
                        minValue={constants.HEIGHT_MIN}
                        maxValue={constants.HEIGHT_MAX}
                        type='up-down'
                        rounded
                        upDownButtonsBackgroundColor={colors.MAIN}
                        iconStyle={{ color: colors.TEXT }}
                        textColor={colors.TEXT}
                        valueType='integer'
                    />
                    <Text style={styles.subTitle}>Birthday</Text>
                    <WTDatePicker date={date} setDate={setDate} />
                    <Text style={styles.error}>{message}</Text>
                    <WTButton
                        onPress={() => handleSignup({
                            username: username,
                            password: password,
                            first_name: name,
                            last_name: surname,
                            birthday: date,
                            height: height,
                            weight: weight
                        },
                            props.onLogin,
                            setMessage
                        )}
                        text={"Sign up"}
                    />
                </View>

            </ScrollView>
        </SafeAreaView>

    );
}

export default SignupView;


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
        backgroundColor: colors.MAIN,
    },
    title: {
        fontSize: Dimensions.get('window').width * 0.06,
        color: colors.TEXT,
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
        color: colors.TEXT,
    },
    normalText: {
        fontSize: Dimensions.get('window').width * 0.04,
        color: colors.TEXT,
    },
    inputs: {
        borderWidth: 1,
        borderColor: '#636363',
        marginHorizontal: Dimensions.get('window').width * 0.3,
        width: Dimensions.get('window').width * 0.5,
        height: Dimensions.get('window').height * 0.05,
        borderRadius: 7,
        color: colors.TEXT,
        paddingHorizontal: 7,
    },
    numericInputs: {
        borderColor: '#636363',
        height: Dimensions.get('window').height * 0.05,
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
        color: colors.TEXT,
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
