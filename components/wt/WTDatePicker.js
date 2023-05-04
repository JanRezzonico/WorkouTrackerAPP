import React, { useState } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Feather } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import constants from '../../constants/constants';
import WTIconButton from './WTIconButton';

const WTDatePicker = ({ date, setDate }) => {
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showPicker = () => {
        setShow(true);
    };

    return (
        <View>
            <TouchableOpacity onPress={showPicker} style={{ alignItems: "center" }}>
                <Feather name="calendar" size={32} color="white" />
                <Text style={{ color: "white" }}>{date.toLocaleDateString()} </Text>
            </TouchableOpacity>
            {show && (
                <DateTimePicker
                    value={date}
                    mode={'date'}
                    onChange={onChange}
                    maximumDate={new Date()}
                    minimumDate={constants.DATE_MIN}
                />
            )}
        </View>
    );
};

WTDatePicker.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    setDate: PropTypes.func.isRequired,
};

export default WTDatePicker;
