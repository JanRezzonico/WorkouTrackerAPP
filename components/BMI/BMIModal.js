import { Dimensions, Modal, StyleSheet, View } from "react-native";
import colors from "../../assets/style/colors";
import WTButton from "../wt/WTButton";
import BMIView from "./BMIView";

const BMIModal = ({setModalVisible, modalVisible, userWeight, userHeight}) => {
    return (
        <Modal
            animationType='fade'
            visible={modalVisible}
            transparent={true}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            {/* Pop-up content*/}
            <View style={styles.popUpCenter}>
                <View style={styles.popUp}>
                    <BMIView weight={userWeight} height={userHeight} />
                    {/* Close pop-up button */}
                    <WTButton onPress={() => { setModalVisible(!modalVisible); }} text={"Close"}></WTButton>
                </View>
            </View>
        </Modal>
    );
}

export default BMIModal;

const normalMargin = Dimensions.get('window').height * 0.02;
const cardH = Dimensions.get('window').height * 0.37;
const cardW = Dimensions.get('window').width * 0.9;

const styles = StyleSheet.create({
    popUp: {
        backgroundColor: colors.MAIN,
        borderRadius: 10,
        padding: 10,
        height: Dimensions.get('window').height / 2,
        width: Dimensions.get('window').width * 0.75,
        elevation: 20,
        shadowColor: 'black',
    },
    popUpCenter: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        marginTop: Dimensions.get('window').height / 4,
    },
    popUpButton: {
        backgroundColor: "#2e42f8",
        elevation: 8,
        borderRadius: 10,
        marginTop: normalMargin,
        marginRight: 'auto',
        marginLeft: 'auto',
        padding: 10,
        marginBottom: normalMargin
    }
});