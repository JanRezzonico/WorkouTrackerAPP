import React, { useState } from 'react';
import { Modal, TouchableOpacity, Text, View, StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import colors from '../assets/style/colors';
import WTButton from './wt/WTButton';

const ExercisePicker = ({ options, selectedOption, onSelect }) => {
    const [showOptions, setShowOptions] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setShowOptions(true)}>
                <Text style={styles.selected}>{selectedOption}</Text>
            </TouchableOpacity>
            {/* <WTButton text={selectedOption} onPress={() => setShowOptions(true)} /> */}
            <Modal
                visible={showOptions}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowOptions(false)}
            >
                <SafeAreaView style={styles.modalContainer}>
                    <ScrollView>
                        {options.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.option}
                                onPress={() => {
                                    onSelect(option);
                                    setShowOptions(false);
                                }}
                            >
                                <Text style={styles.text}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </SafeAreaView>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        height: '100%',
        borderWidth: 1,
        borderColor: '#7c868b',
        color: '#7c868b',
        borderRadius: 5,
        paddingHorizontal: 10,
        maxWidth: 200,
        overflow: 'hidden'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '50%',
        marginVertical: Dimensions.get('window').height * 0.1,
    },
    option: {
        backgroundColor: colors.MAIN,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#7c868b',
        width: '90%',
        alignSelf: 'center'
    },
    text: {
        color: '#fff',
        overflow: 'hidden',
        width: '100%',
    },
    selected: {
        color: 'white',
        overflow: 'hidden',
        width: '100%'
    }
});

export default ExercisePicker;