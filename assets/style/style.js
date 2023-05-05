import { StyleSheet, Dimensions } from 'react-native';
import colors from './colors';

const normalMargin = Dimensions.get('window').height * 0.02;
const cardWidth = Dimensions.get('window').width * 0.9;
const normalFont = Dimensions.get('window').width * 0.034;
const subTitleFont = Dimensions.get('window').width * 0.045;

module.exports = StyleSheet.create({
    footerContainer:{
        flex: 1,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: colors.MAIN,
    },
    container: {
        justifyContent: 'space-between',
    },
    title: {
        color: '#fff',
        fontSize: 20,
        marginLeft: 10,
    },
    card: {
        width: cardWidth,
        borderRadius: 10,
        backfaceVisibility: 'hidden',
        alignSelf: 'center',
        marginTop: normalMargin,
        paddingTop: 20,
        paddingBottom: 25,
    },
    inputs: {
        borderWidth: 1,
        borderColor: '#7c868b',
        marginLeft: 15,
        marginTop: 10,
        width: '60%',
        borderRadius: 7,
        color: 'white',
        fontSize: 15,
        paddingHorizontal: 7,
    },
    addBtn: {
        alignItems: 'center',
        backgroundColor: "#2e42f8",
        borderRadius: 10,
        elevation: 8,
        padding: 2,
        marginHorizontal: 15,
        marginVertical: 5,
    },
    appButtonText: {
        fontSize: 13,
        color: 'white',
        fontWeight: '500',
        textTransform: 'uppercase'
    },
    btnIcon: {
        fontSize: 18,
        color: 'white',
    },
    exercise: {
        flex: 2,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'space-between',
        padding: 5,
    },
    exerciseType:{
        flex: 1,
        flexDirection: 'row',
        marginBottom: 5,
    },
    select: {
        flex: 4,
        fontSize: 30,
    },
    exProp: {
        flex: 1,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#7c868b',
        marginBottom: 5,
        marginHorizontal: 5,
        paddingHorizontal: 7,
        color: 'white',
        fontSize: 12,
        overflow: 'hidden'
    },
    timerContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 2,
        alignItems: 'center'
    },
    timer: {
        color: 'white',
        flex: 0.9,
        fontSize: 16,
    },
    horizontalContainer: {
        alignItems: "flex-start",
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10
    }
});