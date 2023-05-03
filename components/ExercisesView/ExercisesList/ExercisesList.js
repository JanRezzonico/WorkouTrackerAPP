import { useState } from "react";
import { Text, View, StyleSheet, SectionList } from "react-native";
import ExerciseListItem from "./ExerciseListItem";
import InfoModal from "./InfoModal";
import { sectionize } from "./Model";
import colors from '../../../assets/style/colors';


function ExercisesList({ data, onItemPress }) {
    const [exercise, setExercise] = useState(null);
    const [visible, setVisible] = useState(false);
    const openInfoModal = (exercise) => {
        setExercise(exercise);
        setVisible(true);
    }

    const renderItem = ({ item }) => {
        return (
            <ExerciseListItem exercise={item} openInfoModal={openInfoModal} />
        );
    };
    const renderSectionHeader = ({ section }) => {
        return (
            <View style={styles.textTitleContainer}>
                <Text style={styles.textTitle}>{section.title}</Text>
            </View>
        );
    }
    return (
        <View style={styles.mainContainer}>
            <InfoModal exercise={exercise} visible={visible} setVisible={setVisible} />
            <SectionList
                sections={sectionize(data)}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                contentContainerStyle={styles.contentContainer}
                keyExtractor={(item, index) => item.name + index}
            />
        </View>

    );
}

const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor: colors.MAIN,
        borderRadius: 10,
        padding: 5,
        margin: 5,
    },
    textTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    textTitleContainer: {
        backgroundColor: colors.BLUE,
        borderRadius: 10,
        padding: 5,
        margin: 5,
    },
    text: {
        color: 'white',
        margin: 2,
    },
});


export default ExercisesList;