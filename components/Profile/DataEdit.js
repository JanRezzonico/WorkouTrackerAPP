import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, Modal } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import DB from '../../api/api';
import colors from '../../assets/style/colors';
import constants from '../../constants/constants';
import WTDatePicker from '../wt/WTDatePicker';
import WTIconButton from '../wt/WTIconButton';

const DataEdit = ({ user, setUser, toggleEdit }) => {
    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [birthday, setBirthday] = useState(new Date(user.birthday));
    const [height, setHeight] = useState(user.height);
    const [weight, setWeight] = useState(user.weight);

    const handleSave = () => {
        const updatedUser = {
            ...user,
            first_name: firstName,
            last_name: lastName,
            birthday: birthday.toISOString(),
            height: parseInt(height),
            weight: parseInt(weight),
        };
        setUser(updatedUser);
        DB.user.update(updatedUser);
        toggleEdit();
    };
    const handleRequestClose = () => {
        setFirstName(user.first_name);
        setLastName(user.last_name);
        setBirthday(new Date(user.birthday));
        setHeight(user.height);
        setWeight(user.weight);
        toggleEdit();
    }
    return (
        <View style={styles.container}>
            <Text style={styles.labelInfo}>Name</Text>
            <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
            />
            <Text style={styles.labelInfo}>Surname</Text>
            <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
            />
            <Text style={styles.labelInfo}>Birthday</Text>
            <WTDatePicker
                date={birthday}
                setDate={setBirthday}
            />
            <Text style={styles.labelInfo}>Height</Text>

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
                iconStyle={{ color: 'white', fontWeight: 'bold' }}
                textColor={'white'}
                valueType='integer'
            />
            <Text style={styles.labelInfo}>Weight</Text>
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
                iconStyle={{ color: 'white', fontWeight: 'bold' }}
                textColor={'white'}
                valueType='real'
            />
            <View style={styles.horizontalContainer}>
                <WTIconButton library='Feather' name='trash-2' onPress={handleRequestClose} color={"red"} />
                <WTIconButton library='Feather' name='save' onPress={handleSave} color={colors.BLUE} />
            </View>
        </View>
    );
}

export default DataEdit;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.MAIN,
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        width: Dimensions.get('window').width * 0.75,
        elevation: 20,
        shadowColor: 'black',
    },
    labelInfo: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 16,
        color: 'white'
    },
    input: {
        borderWidth: 1,
        borderColor: '#636363',
        borderRadius: 7,
        padding: 7,
        marginTop: 8,
        marginBottom: 16,
        color: colors.TEXT,
        height: Dimensions.get('window').height * 0.05,
    },
    numericInputs: {
        borderColor: '#636363',
        height: Dimensions.get('window').height * 0.05,
    },
    horizontalContainer: {
        alignItems: "flex-start",
        flexDirection: "row",
        justifyContent: "space-around",
    },
});