import { Text, View, StyleSheet, Dimensions, Modal } from 'react-native';
import { useState } from 'react';
import HistoryListView from "./HistoryListView";
import HistoryChartView from "./HistoryChartView";
import CalendarView from "./CalendarView";
import DB from '../api/api';
import colors from '../assets/style/colors';
import WTButton from './wt/WTButton';
import WTIconButton from './wt/WTIconButton';

const normalMargin = Dimensions.get('window').height * 0.02;


function HistoryView(props) {
    const [modalVisible, setModalVisible] = useState(false, page);
    let page = "";

    function setPage(param) {
        page = param;
    }

    // return the correct page basaed on which button was pressed
    function getPage() {
        if (page === "Calendar") {
            return (<CalendarView />);
        } else if (page === "Chart") {
            return (<HistoryChartView />);
        }
    }

    return (
        <View style={styles.bg}>
            <View style={styles.topNav}>
                <Text style={styles.title}>Workout History</Text>
                <WTIconButton
                    onPress={() => {
                        setModalVisible(true, page); setPage("Calendar")
                    }}
                    library="Ionicons"
                    name="calendar"
                    size={20}
                />
                <WTIconButton
                    onPress={() => {
                        setModalVisible(true, page); setPage("Calendar")
                    }}
                    library="Ionicons"
                    name="stats-chart"
                    size={20}
                />
            </View>
            <HistoryListView />

            {/*
                the component modal is used to show a pop-up when a user click on the calendar or chart button
                this specific modal shows the user's history in a calendar and on a chart
            */}
            <Modal
                animationType='fade'
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => { 
                    setModalVisible(!modalVisible); 
                }}
            >
                {/* Pop-up content*/}
                <View style={styles.popUpCenter}>
                    <View style={styles.popUp}>
                        <View>{getPage()}</View>
                        <WTButton onPress={() => { setModalVisible(!modalVisible); }} text="Close"/>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default HistoryView;

const styles = StyleSheet.create({
    bg: {
        backgroundColor: colors.MAIN,
        height: Dimensions.get("window").height,
        paddingHorizontal: (Dimensions.get("window").width * 0.09) / 2,
        paddingVertical: (Dimensions.get("window").height * 0.03) / 2,
    },
    title: {
        flex: 1,
        fontSize: 15,
        marginLeft: 10,
        marginTop: 4,
        fontWeight: 'bold',
        color: '#F9F9F9',
    },
    topNav: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignSelf: 'stretch',
        backgroundColor: colors.MAIN,
        padding: 5,
        marginTop: 0,
    },
    btnContain: {
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 5,
    },
    btnIcon: {
        marginHorizontal: 10,
        fontSize: 20,
        color: '#F9F9F9',
    },
    popUp: {
        backgroundColor: colors.MAIN,
        borderRadius: 10,
        padding: 5,
        height: Dimensions.get('window').height - 100,
        width: Dimensions.get('window').width * 0.75,
        elevation: 20,
        shadowColor: 'black',
        shadowOpacity: .60
    },
    popUpCenter: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        margin: normalMargin,
    },
    popUpButton: {
        backgroundColor: "#2e42f8",
        elevation: 8,
        borderRadius: 25,
        marginTop: normalMargin,
        marginRight: 'auto',
        marginLeft: 'auto',
        padding: 10,
        marginBottom: normalMargin
    },
})

