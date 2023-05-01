import { Dimensions, Modal, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import colors from "../../../assets/style/colors";
import WTButton from "../../wt/WTButton";

const InfoModal = ({ exercise, visible, setVisible }) => {
    return (
        exercise && (
            <Modal
                visible={visible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setVisible(false)}
            >
                <View style={styles.popUpCenter}>
                    <View style={styles.popUp}>
                        <Text style={styles.title}>{exercise.name}</Text>
                        <Text style={styles.label}>Instructions</Text>
                        <ScrollView contentContainerStyle={styles.scrollView}>
                            {exercise.instructions.map((instruction, index) => (
                                <View key={index} style={styles.instructionContainer}>
                                    <Text style={styles.instructionNumber}>{index + 1}.</Text>
                                    <Text style={styles.instructionText}>{instruction}</Text>
                                </View>
                            ))}
                        </ScrollView>
                        <WTButton
                            onPress={() => setVisible(!visible)}
                            text={"Close"}
                            style={styles.button}
                        ></WTButton>
                    </View>
                </View>
            </Modal>
        )
    );
};

export default InfoModal;

const styles = StyleSheet.create({
    popUp: {
        backgroundColor: colors.MAIN,
        borderRadius: 10,
        padding: 10,
        maxHeight: Dimensions.get("window").height / 2, // add maxHeight instead of height
        width: Dimensions.get("window").width * 0.75,
        elevation: 10,
        shadowColor: "black",
    },
    popUpCenter: {
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        marginTop: Dimensions.get("window").height / 4,
    },
    title: {
        color: "white",
        fontSize: RFValue(20),
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
    label: {
        color: "white",
        fontSize: RFValue(16),
        fontWeight: "bold",
        marginBottom: 10,
    },
    instructionContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 5,
    },
    instructionNumber: {
        color: "white",
        fontSize: RFValue(12),
        fontWeight: "bold",
        marginRight: 5,
    },
    instructionText: {
        color: "white",
        fontSize: RFValue(12),
        flex: 1,
    },
    scrollView: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 50, // add paddingBottom to allow scrolling to the last item
    },
    button: {
        marginTop: 10,
    },
});

