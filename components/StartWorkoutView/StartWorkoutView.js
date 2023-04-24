import { Text, View, StyleSheet, Dimensions, SafeAreaView, ScrollView, TouchableOpacity, FlatList, SectionList, Modal } from "react-native";
import { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import TemplateItemView from "./components/TemplateItemView";
import CreateWorkoutModelView from "../CreateWorkoutModelView";
import StartedWorkout from "./StartedWorkout";
import WTButton from "../wt/WTButton";
import colors from "../../assets/style/colors";

const customTemplates = [
    {
        title: "Leg Day", exercises: [
            {
                name: "Squat", sets: [
                    { weight: 50, reps: 12 },
                    { weight: 60, reps: 10 },
                    { weight: 70, reps: 8 },
                ]
            },
            {
                name: "Split Squats", sets: [
                    { weight: 16, reps: 12 },
                    { weight: 18, reps: 10 },
                    { weight: 20, reps: 8 },
                ]
            },
        ]
    }
];
const sampleTemplates = [
    {
        title: "Chest", exercises: [
            {
                name: "Bench Press (Barbell)", sets: [
                    { weight: 50, reps: 12 },
                    { weight: 60, reps: 10 },
                    { weight: 70, reps: 8 },
                ]
            },
            {
                name: "Bench Press (Dumbbell)", sets: [
                    { weight: 16, reps: 12 },
                    { weight: 18, reps: 10 },
                    { weight: 20, reps: 8 },
                ]
            },
            {
                name: "Cable Cross (Cable)", sets: [
                    { weight: 16, reps: 12 },
                    { weight: 18, reps: 10 },
                    { weight: 20, reps: 8 },
                ]
            },
        ]
    },
    {
        title: "Arms", exercises: [
            {
                name: "Bicep Curl (Barbell)", sets: [
                    { weight: 50, reps: 12 },
                    { weight: 60, reps: 10 },
                    { weight: 70, reps: 8 },
                ]
            },
            {
                name: "Bicep Curl (Dumbbell)", sets: [
                    { weight: 16, reps: 12 },
                    { weight: 18, reps: 10 },
                    { weight: 20, reps: 8 },
                ]
            },
            {
                name: "Skullcrusher (Dumbbell)", sets: [
                    { weight: 16, reps: 12 },
                    { weight: 18, reps: 10 },
                    { weight: 20, reps: 8 },
                ]
            },
        ]
    },
    {
        title: "Back", exercises: [
            {
                name: "Bicep Curl (Barbell)", sets: [
                    { weight: 50, reps: 12 },
                    { weight: 60, reps: 10 },
                    { weight: 70, reps: 8 },
                ]
            },
            {
                name: "Bicep Curl (Dumbbell)", sets: [
                    { weight: 16, reps: 12 },
                    { weight: 18, reps: 10 },
                    { weight: 20, reps: 8 },
                ]
            },
            {
                name: "Skullcrusher (Dumbbell)", sets: [
                    { weight: 16, reps: 12 },
                    { weight: 18, reps: 10 },
                    { weight: 20, reps: 8 },
                ]
            },
        ]
    }
];

const normalMargin = Dimensions.get('window').height * 0.015;
const cardW = Dimensions.get('window').width * 0.9;
const normalFont = Dimensions.get('window').width * 0.034;
const subTitleFont = Dimensions.get('window').width * 0.045;


// const headerComponent = () => {
//     const [modalVisible, setModalVisible] = useState(false);
//     const [modal2Visible, setModal2Visible] = useState(false);

//     return (
//         <View style={styles.container}>
//             <View style={styles.header}>
//                 <Text style={styles.subtitle}>Quick Start</Text>
//                 {/* <TouchableOpacity onPress={() => null} style={styles.appButtonContainer}>
//                     <Text style={styles.appButtonText}>Start Empty Workout</Text>
//                 </TouchableOpacity> */}
//                 <WTButton onPress={() => null} text={"Start Empty Workout"}></WTButton>
//             </View>
//             <View style={styles.contents}>
//                 <View style={styles.addTemplate}>
//                     <Text style={styles.subtitle}>Custom Templates</Text>
//                     {/*
//                      the component modal is used to show a pop-up when a user tries to add a custom template
//                      this specific modal shows the creation of a new workout template
//                     */}
//                     <Modal
//                         animationType='fade'
//                         visible={modalVisible}
//                         transparent={true}
//                         onRequestClose={() => {
//                             setModalVisible(!modalVisible);
//                         }}>
//                         {/* Pop-up content*/}
//                         <View style={styles.popUpCenter}>
//                             <View style={styles.popUp}>
//                                 <CreateWorkoutModelView weight={70} height={1.70} />
//                                 {/* Close pop-up button */}
//                                 <View style={styles.popUpBtnContainer}>
//                                     <TouchableOpacity
//                                         style={[styles.popUpButton, { backgroundColor: '#80898b' }]}
//                                         onPress={() => { setModalVisible(!modalVisible); }}
//                                     >
//                                         <Text style={styles.appButtonText}>Close</Text>
//                                     </TouchableOpacity>
//                                     <TouchableOpacity
//                                         style={styles.popUpButton}
//                                         onPress={() => {

//                                             setModalVisible(!modalVisible);
//                                         }}
//                                     >
//                                         <Text style={styles.appButtonText}>Create</Text>
//                                     </TouchableOpacity>
//                                 </View>
//                             </View>
//                         </View>
//                     </Modal>
//                     <TouchableOpacity onPress={() => setModalVisible(true)}>
//                         <Icon name="add-outline" style={styles.btnIcon} />
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </View>
//     )
// };

// const footerComponent = () => {
//     return (
//         <View style={styles.container}>
//             <View style={styles.contents}>
//                 <Text style={styles.subtitle}>Sample Templates</Text>
//                 <FlatList
//                     data={sampleTemplates}
//                     renderItem={(e) => {
//                         return (
//                             <TemplateItemView template={e} />
//                         );
//                     }}
//                 />
//                 <View style={styles.bottomPlaceHolder}></View>
//             </View>
//         </View>
//     )
// }

function StartWorkoutView(props) {
    return (
        <View>
            <SafeAreaView style={styles.mainContainer}>
                <Text>Non ci credo</Text>
                {/* <FlatList
                    data={customTemplates}
                    renderItem={(e) => {
                        return (
                            <TemplateItemView template={e} />
                        );
                    }}
                    ListHeaderComponent={headerComponent}
                    ListFooterComponent={footerComponent}
                /> */}
            </SafeAreaView>
        </View>
    );
}

const WOProgressModal = ({ visible, onClose }) => {
    return (
        <Modal
            visible={visible}
            animationType="fade"
            onRequestClose={onClose}
        >
            {/* Pop-up content*/}
            <View style={styles.popUpCenter}>
                <View style={styles.popUp}>
                    {/** insert json here.. */}
                    <StartedWorkout></StartedWorkout>
                    {/* Close pop-up button */}
                    <View style={styles.popUpBtnContainer}>
                        <TouchableOpacity
                            style={[styles.popUpButton, { backgroundColor: '#80898b' }]}
                            onPress={() => { setModal2Visible(!modalVisible); }}
                        >
                            <Text style={styles.appButtonText}>Close</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.popUpButton}
                            onPress={() => {

                                setModal2Visible(!modalVisible);
                            }}
                        >
                            <Text style={styles.appButtonText}>Create</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
};

export default StartWorkoutView;

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
        marginBottom: normalMargin,
    },
    subtitle: {
        color: '#8c9596',
        fontSize: 15,
        marginTop: normalMargin,
        marginLeft: (Dimensions.get('window').width - cardW) / 2,
        fontWeight: '400',
        letterSpacing: 1,
        textTransform: 'uppercase'
    },
    templateTitle: {
        fontSize: subTitleFont,
        color: 'white',
        marginBottom: 8,
        fontWeight: '500',
    },
    templateEx: {
        fontSize: normalFont,
        color: '#8c9596',
        marginBottom: 8,
        fontWeight: '400',
    },
    woTemplate: {
        width: cardW,
        height: 'auto',
        borderRadius: 10,
        backgroundColor: colors.MAIN,
        backfaceVisibility: 'hidden',
        alignSelf: 'center',
        marginTop: normalMargin,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        borderColor: '#8c9596',
        borderWidth: 1,
        marginBottom: normalMargin,
    },
    appButtonContainer: {
        width: cardW,
        elevation: 8,
        backgroundColor: '#2e42f8',
        borderRadius: 5,
        marginTop: normalMargin,
        marginBottom: normalMargin,
        marginRight: 'auto',
        marginLeft: 'auto',
        padding: 10,
        paddingHorizontal: 100
    },
    appButtonText: {
        fontSize: 14,
        color: 'white',
        fontWeight: '500',
        alignSelf: 'center',
        textTransform: 'uppercase'
    },
    addTemplate: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        marginBottom: normalMargin - 10,
        padding: 5,
    },
    btnIcon: {
        marginRight: (Dimensions.get('window').width - cardW) / 2,
        fontSize: 20,
        marginTop: normalMargin + 3,
        color: 'white',
        fontWeight: 'bold'
    },
    title: {
        flex: 1,
        fontSize: 16,
        marginLeft: 25,
        marginTop: 4,
        fontWeight: 'bold',
        color: '#F9F9F9',
    },
    bottomPlaceHolder: {
        height: 20,
        marginTop: normalMargin,
        marginBottom: normalMargin
    },
    popUp: {
        backgroundColor: colors.MAIN,
        borderRadius: 10,
        padding: 10,
        height: Dimensions.get('window').height / 7 * 5,
        width: Dimensions.get('window').width * 0.95,
        elevation: 20,
        shadowColor: 'black',
    },
    popUpCenter: {
        marginRight: 'auto',
        marginLeft: 'auto',
        padding: 5,
        marginTop: Dimensions.get('window').height / 7,
    },
    popUpButton: {
        backgroundColor: "#2e42f8",
        elevation: 8,
        borderRadius: 10,
        padding: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: normalMargin,
        marginBottom: normalMargin,
        width: Dimensions.get('window').width / 3,
    },
    popUpBtnContainer: {
        marginRight: 'auto',
        marginLeft: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});