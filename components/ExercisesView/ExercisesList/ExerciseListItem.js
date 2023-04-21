import React from "react";
import { Text, View, StyleSheet } from "react-native";
import WTHorizontalLine from "../../wt/WTHorizontalLine";

const ExerciseListItem = (props) => {
    return (
        <View>
            <Text style={styles.nameText}>{props.name}</Text>
            <Text style={styles.musclesText}>{props.primaryMuscles.map(str => str.charAt(0).toUpperCase() + str.slice(1)).join(',')}</Text>
            <WTHorizontalLine color="white" />
        </View>
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