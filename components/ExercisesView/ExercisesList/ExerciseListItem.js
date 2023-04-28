import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import WTHorizontalLine from "../../wt/WTHorizontalLine";

const ExerciseListItem = ({ exercise, openInfoModal }) => {
    return (
        <TouchableOpacity onPress={() => { openInfoModal(exercise) }}>
            <Text style={styles.nameText}>{exercise.name}</Text>
            <Text style={styles.musclesText}>{exercise.primaryMuscles.map(str => str.charAt(0).toUpperCase() + str.slice(1)).join(',')}</Text>
            <WTHorizontalLine color="white" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    nameText: {
        color: 'white',
        margin: 2,
        fontSize: 14,
        fontWeight: "bold"
    },
    musclesText: {
        color: 'white',
        margin: 2,
        fontSize: 12,
    },
});

export default ExerciseListItem;