import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import colors from "../../assets/style/colors";
import BMIModal from "../BMI/BMIModal";
import WTButton from "../wt/WTButton";

const DataShow = ({ user }) => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <ScrollView style={styles.card}>
            <Text style={styles.labelInfo} >Name</Text>
            <Text style={styles.displayedInfo}>{user.first_name}</Text>
            <Text style={styles.labelInfo}>Surname</Text>
            <Text style={styles.displayedInfo}>{user.last_name}</Text>
            <Text style={styles.labelInfo}>Birthday</Text>
            <Text style={styles.displayedInfo}>{new Date(user.birthday).toLocaleDateString()}</Text>
            <Text style={styles.labelInfo}>Height</Text>
            <View style={styles.horizontalContainer}>
                <Text style={styles.displayedInfo}>{user.height}</Text>
                <Text style={styles.displayedInfo}> cm</Text>
            </View>
            <Text style={styles.labelInfo}>Weight</Text>
            <View style={styles.horizontalContainer}>
                <Text style={styles.displayedInfo}>{user.weight}</Text>
                <Text style={styles.displayedInfo}> kg</Text>
            </View>
            {/* Open BMI pop-up button */}
            <WTButton onPress={() => { setModalVisible(true); }} text={"BMI"} />
            <BMIModal modalVisible={modalVisible} setModalVisible={setModalVisible} userWeight={user.weight} userHeight={user.height} />
        </ScrollView>
    );
}

export default DataShow;

const normalMargin = Dimensions.get('window').height * 0.02;
const cardH = Dimensions.get('window').height * 0.37;
const cardW = Dimensions.get('window').width * 0.9;

const bigFont = RFValue(27);
const normalFont = RFValue(18);
const subTitleFont = RFValue(12);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    header: {
        flex: 0.35,
        backgroundColor: colors.MAIN,
    },
    mainContainer: {
        backgroundColor: colors.MAIN,
    },
    contents: {
        flex: 0.65,
    },
    profileImg: {
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.3,
        height: Dimensions.get('window').width * 0.3,
        marginTop: StatusBar.currentHeight,
        alignSelf: 'center',
    },
    userName: {
        color: 'white',
        alignSelf: 'center',
        fontSize: bigFont,
        marginTop: normalMargin,
        fontWeight: 'bold',
        letterSpacing: 1
    },
    card: {
        width: cardW,
        borderRadius: 10,
        backgroundColor: colors.MAIN,
        alignSelf: 'center',
        marginTop: normalMargin,
        padding: 20,
        borderColor: '#8c9596',
        borderWidth: 1,
    },
    bottomCard: {
        width: cardW,
        height: cardH,
        borderRadius: 10,
        backgroundColor: colors.MAIN,
        backfaceVisibility: 'hidden',
        alignSelf: 'center',
        marginTop: normalMargin,
        paddingTop: 25,
        borderColor: '#8c9596',
        borderWidth: 1,
        marginBottom: StatusBar.currentHeight,
    },
    info: {
        paddingLeft: 20,
    },
    labelInfo: {
        fontSize: subTitleFont,
        color: 'white',
        marginBottom: 10,
        fontWeight: 'bold',
    },
    displayedInfo: {
        fontSize: normalFont,
        color: '#dddddd',
        marginBottom: 10,
        fontWeight: 'thin'
    },
    appButtonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase'
    },
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
    },
    btnIcon: {
        marginRight: (Dimensions.get('window').width - cardW) / 2,
        fontSize: 20,
        color: 'white',
        alignSelf: 'flex-end'
    },
    horizontalContainer: {
        flexDirection: "row",
    },
});
