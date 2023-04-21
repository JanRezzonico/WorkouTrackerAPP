import { useState } from 'react';
import { Text, View, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import NumericInput from 'react-native-numeric-input'
import DB from '../api/api';
import colors from '../assets/style/colors';
import WTButton from './wt/WTButton';
import WTDatePicker from './wt/WTDatePicker';

function SignupView(props) {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [weight, setWeight] = useState(1);
    const [height, setHeight] = useState(1);
    const [date, setDate] = useState(new Date());
    
    const handleSignup = async (user) => {
        await DB.auth.signup(user);

    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView>
                <Text style={styles.title}>WELCOME ON WORKOUTRACKER</Text>
                <View style={styles.card}>
                    <Text style={styles.subTitle}>Name</Text>
                    <TextInput
                        style={styles.inputs}
                        value={name}
                        onChangeText={text => setName(text)}
                    />
                    <Text style={styles.subTitle}>Surname</Text>
                    <TextInput
                        style={styles.inputs}
                        value={surname}
                        onChangeText={text => setSurname(text)}
                    />
                    <Text style={styles.subTitle}>Username</Text>
                    <TextInput
                        style={styles.inputs}
                        value={username}
                        onChangeText={text => setUsername(text)}
                    />
                    <Text style={styles.subTitle}>Password</Text>
                    <TextInput
                        style={styles.inputs}
                        secureTextEntry={true}
                        value={password}
                        onChangeText={text => setPassword(text)}
                    />
                    <Text style={styles.subTitle}>Weight (in kg)</Text>
                    <NumericInput
                        value={weight}
                        onChange={(value) => setWeight(value)}
                        minValue={1}
                        maxValue={999}
                        type='up-down'
                        rounded
                        upDownButtonsBackgroundColor={colors.MAIN}
                        iconStyle={{ color: 'white', fontWeight: 'bold' }}
                        textColor={'white'}
                        valueType='real'
                    />
                    <Text style={styles.subTitle}>Height (in cm)</Text>
                    <NumericInput
                        style={styles.inputs}
                        value={height}
                        onChange={(value) => setHeight(value)}
                        minValue={1}
                        maxValue={300}
                        type='up-down'
                        rounded
                        upDownButtonsBackgroundColor={colors.MAIN}
                        iconStyle={{ color: 'white', fontWeight: 'bold' }}
                        textColor={'white'}
                        valueType='real'
                    />
                    <Text style={styles.subTitle}>Birthday</Text>
                    <WTDatePicker date={date} setDate={setDate} />
                </View>
                {/* <TouchableOpacity onPress={() => handleSignup({
                    username: username,
                    password: password,
                    first_name: name,
                    last_name: surname,
                    birthday: date,
                    height: height,
                    weight: weight
                })} style={styles.appButtonContainer}>
                    <Text style={styles.appButtonText}>Sign up</Text>
                </TouchableOpacity> */}
                <WTButton  
                    onPress={() => handleSignup({
                        username: username,
                        password: password,
                        first_name: name,
                        last_name: surname,
                        birthday: date,
                        height: height,
                        weight: weight
                    })}
                    text={"Sign up"}
                    ></WTButton>
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
        backgroundColor: colors.MAIN,
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
    }
});
