import { Text, View, StyleSheet, FlatList, Dimensions, Pressable, Modal, TouchableOpacity } from "react-native";
import { useState } from "react";
import ExerciseModalView from "../ExerciseModalView";
import WTHorizontalLine from "../wt/WTHorizontalLine";
import WTButton from "../wt/WTButton";
import colors from "../../assets/style/colors";


const normalMargin = Dimensions.get('window').height * 0.02;


function HistoryListItem(props) {
    const start_date = new Date(props.start_date);
    const end_date = new Date(props.end_date);
    const duration = Math.trunc((end_date - start_date) / (1000 * 60)*10)/10;
    const day = start_date.toLocaleDateString();
    let totalWeight = 0;
    // Calculate total weight
    props.exercises.forEach(e => {
        e.sets.forEach(s => {
            if (s.weight) {
                totalWeight += (s.weight * s.reps);
            }
        });
    });
    const [modalVisible, setModalVisible] = useState(false);
    const handlePress = () => { setModalVisible(true); }
    const handleCloseModal = () => { setModalVisible(false); }
    return (
        <View style={styles.mainContainer}>
            <Pressable onPress={handlePress}>
                <Text style={styles.textTitle}>{props.name}</Text>
                <View style={styles.horizontalContainer}>
                    <Text style={styles.text}>{day}</Text>
                    <Text style={styles.text}>{duration} min</Text>
                    <Text style={styles.text}>{totalWeight} kg</Text>
                </View>
                <WTHorizontalLine color="white"/>
                <View>
                    <FlatList
                        data={props.exercises}
                        renderItem={(e) => {
                            e = e.item;
                            return (
                                <View style={styles.horizontalContainer}>
                                    <Text style={styles.text}>{e.sets.length} x {e.name}</Text>
                                    <Text style={styles.text}>{Math.max(...e.sets.map(obj => obj.weight))} kg</Text>
                                </View>
                            );
                        }}
                    />
                </View>
            </Pressable>
            {/* Pop-up modal */}
            <Modal
                animationType='fade'
                visible={modalVisible}
                transparent={true}
                onRequestClose={handleCloseModal}>
                {/* Pop-up content*/}
                <View style={styles.popUpCenter}>
                    <View style={styles.popUp}>
                        <ExerciseModalView  {...props} />
                        {/* Close pop-up button */}
                        <WTButton onPress={ () => { setModalVisible(!modalVisible); }} text={"Close"}></WTButton>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        borderColor: '#8c9596',
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
        margin: 5,
    },
    textTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 10,
        marginBottom: 5
    },
    text: {
        color: 'white',
        margin: 2,
    },
    horizontalContainer: {
        alignItems: "flex-start",
        paddingHorizontal: Dimensions.get('window').width * 0.05,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: '#2e42f8',
        borderRadius: 10,
        marginTop: normalMargin,
        marginRight: 'auto',
        marginLeft: 'auto',
        padding: 10,
        paddingHorizontal: 100,
        marginBottom: 3
    },
    appButtonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase',
        marginBottom: 3
    },
    popUp:{
        backgroundColor: colors.MAIN,
        borderRadius: 10,
        padding: 10,
        height: Dimensions.get('window').height / 2,
        width: Dimensions.get('window').width * 0.75,
        elevation: 10,
        shadowColor: 'black',
    },
    popUpCenter:{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        marginTop: Dimensions.get('window').height / 4,
    },
    popUpButton:{
        backgroundColor: "#2e42f8",
        borderRadius: 10,
        marginTop: normalMargin,
    }
});

export default HistoryListItem;