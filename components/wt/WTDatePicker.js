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

const WTDatePicker = ({ date, setDate }) => {
    const [mode, setMode] = useState('date');
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
                    mode={mode}
                    onChange={onChange}
                    maximumDate={new Date()}
                    minimumDate={new Date(1900, 0, 1)}
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
