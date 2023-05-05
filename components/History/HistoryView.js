import { Text, View, StyleSheet, Dimensions, Modal } from 'react-native';
import { useState } from 'react';
import HistoryListView from "./HistoryListView";
import HistoryChartView from "./HistoryChartView";
import CalendarView from "./CalendarView";
import DB from '../../api/api';
import colors from '../../assets/style/colors';
import WTButton from '../wt/WTButton';
import WTIconButton from '../wt/WTIconButton';

const normalMargin = Dimensions.get('window').height * 0.02;


function HistoryView(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [page, setPage] = useState("");
    const [sessions, setSessions] = useState([]);

    // return the correct page based on which button was pressed
    function getPage() {
        if (page === "Calendar") {
            return <CalendarView sessions={sessions} setSessions={setSessions}/>;
        } else if (page === "Chart") {
            return <HistoryChartView sessions={sessions} setSessions={setSessions}/>;
        }
    }

    return (
        <View style={styles.bg}>
            <View style={styles.topNav}>
                <Text style={styles.title}>Workout History</Text>
                <WTIconButton
                    onPress={() => {
                        setPage("Calendar");
                        setModalVisible(true);
                    }}
                    library="Ionicons"
                    name="calendar"
                    size={20}
                />
                <WTIconButton
                    onPress={() => {
                        setPage("Chart");
                        setModalVisible(true);
                    }}
                    library="Ionicons"
                    name="stats-chart"
                    size={20}
                />
            </View>
            <HistoryListView sessions={sessions} setSessions={setSessions}/>

            <Modal
                style="padding: 2px;"
                animationType='fade'
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.popUpCenter}>
                    <View style={styles.popUp}>
                        {getPage()}
                        <WTButton onPress={() => { setModalVisible(false); }} text="Close" />
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

