import { Text, View, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity, FlatList, Modal } from "react-native";
import { useState } from 'react';
import CreateWorkoutModelView from "../CreateWorkoutModelView";
import StartedWorkout from "./StartedWorkout";
import WTButton from "../wt/WTButton";
import colors from "../../assets/style/colors";
import WTIconButton from "../wt/WTIconButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

//Require JSON with the default templates 
const defaultTemplates = require("../../assets/json/defaultTemplates").templates;

const normalMargin = Dimensions.get('window').height * 0.015;
const cardW = Dimensions.get('window').width * 0.9;
const normalFont = Dimensions.get('window').width * 0.034;
const subTitleFont = Dimensions.get('window').width * 0.045;

function StartWorkoutView(props) {
    const [templates, setTemplates] = useState([]);
    //Every time the application renders the view, update the custom templates list
    useEffect(() => {
        var value = null;
        //get the custom templates from the device
        const loadCustomTemplates = async () => {
            value = await AsyncStorage.getItem('templates');
            value = JSON.parse(value);
            displayCustomTemplates(value);
        }
        //set the useState
        const displayCustomTemplates = (value) => {
            if (value !== null) {
                setTemplates(value);
            }
        }
        loadCustomTemplates();
    }, []);
    return (
        <View>
            <SafeAreaView style={styles.mainContainer}>
                {
                    <FlatList
                        data={templates}
                        renderItem={(e) => {
                            return (
                                <TemplateItemView template={e} />
                            );
                        }}
                        ListHeaderComponent={<HeaderComponent templates={templates} setTemplates={setTemplates} />}
                        ListFooterComponent={<FooterComponent/>}
                    />
                }
            </SafeAreaView>
        </View>
    );
}

/*
    The headerComponent display the Quick start section and the custom templates title
    Is a component of the FlatList in the main function
*/
const HeaderComponent = ({ templates, setTemplates }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [exList, setExList] = useState([]);
    const [exProp, setExProp] = useState([]);
    const [workoutName, setWorkoutName] = useState("");
    const [workoutModalVisible, setWorkoutModalVisible] = useState(false);
    const [workout, setWorkout] = useState(null);

    //Get change from new template form
    const handleExListChange = (exList) => {
        setExList(exList);
    };
    //Get change from new template form
    const handleExPropChange = (exProp) => {
        setExProp(exProp);
    };
    //Get change from new template form
    const handleNameChange = (workoutName) => {
        setWorkoutName(workoutName);
    };

    /* 
        this function save the created templates in to the device 
        and update the custom templates's list in the current view
    */
    const saveTemplate = () => {
        //newTemplate is a object that contains a template
        var newTemplate = {exercises: [], title: workoutName};

        exList.forEach((ex) => {
            //insert exercises into a temporary object
            var temp = { name: ex.selectedOption, sets: [] };

            exProp.forEach((prop) => {
                //insert prop (kg, rep) into the sets array of the temp object
                if (ex.id === prop.exId) {
                    temp.sets.push(prop);
                }
            })

            //insert the temp object into the exercises array
            newTemplate.exercises.push(temp);
        })

        let listTemplate = [...templates,newTemplate]
        //set the templates usestate with the new template
        setTemplates(listTemplate);
        //save the new template in to the device
        AsyncStorage.setItem('templates',JSON.stringify(listTemplate));
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.subtitle}>Quick Start</Text>
                <WTButton
                    onPress={() => {
                            setWorkoutModalVisible(true);
                    }}
                    text={"Start Empty Workout"}
                />
            </View>
            {/*
                the component modal is used to show a pop-up when a user tries to add a custom template
                this specific modal shows the view to start an empty workout
            */}
            <Modal
                animationType='fade'
                visible={workoutModalVisible}
                transparent={false}
                onRequestClose={() => {
                    setWorkoutModalVisible(!workoutModalVisible);
                }}
            >
                <StartedWorkout workout={workout} setWorkout={setWorkout} onRequestClose={() => { setWorkoutModalVisible(!workoutModalVisible) }} />
            </Modal>
            <View style={styles.contents}>
                <View style={styles.addTemplate}>
                    <Text style={styles.subtitle}>Custom Templates</Text>
                    {/*
                     the component modal is used to show a pop-up when a user tries to add a custom template
                     this specific modal shows the creation of a new workout template
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
                                <CreateWorkoutModelView 
                                    weight={70} height={1.70} 
                                    onNameChange={handleNameChange} 
                                    onExListChange={handleExListChange} 
                                    onExPropChange={handleExPropChange} 
                                    saveTemplate={saveTemplate}
                                    onRequestClose={() => { setModalVisible(!modalVisible); }}
                                />
                            </View>
                        </View>
                    </Modal>
                    <WTIconButton onPress={() => setModalVisible(true)} library="Ionicons" name="add-outline" size={20} />
                </View>
            </View>
        </View>
    )
};

/*
    The footerComponent is part of the FlatList in the main function
    this specific footer display the Sample template section
*/
const FooterComponent = () => {
    return (
        <View style={styles.container}>
            <View style={styles.contents}>
                <Text style={styles.subtitle}>Sample Templates</Text>
                <FlatList
                    data={defaultTemplates}
                    renderItem={(e) => {
                        return (
                            <TemplateItemView template={e} />
                        );
                    }}
                />
                <View style={styles.bottomPlaceHolder} />
            </View>
        </View>
    )
}

/*
    TemplateItemView is a component used to display a workout template
    When a user clicks on a template a modal will open and show the view to start the workout
*/
const TemplateItemView = (props) => {
    const [modal2Visible, setModal2Visible] = useState(false);

    return (
        <TouchableOpacity onPress={() => setModal2Visible(true)} style={styles.woTemplate}>
            <Text style={styles.templateTitle}>{props.template.item.title}</Text>

            <WOProgressModal modalVisible={modal2Visible} setModalVisible={setModal2Visible} onclose={() => setModal2Visible(!modal2Visible)} workout={props.template.item} />

            <FlatList // List of Exercises like 3xSquat, 3xCurl
                data={props.template.item.exercises}
                renderItem={(e) => {
                    return (
                        <Text style={styles.templateEx}>{e.item.sets.length} x {e.item.name}</Text>
                    );
                }}
            />
        </TouchableOpacity>
    );
}

const WOProgressModal = ({ setModalVisible, modalVisible, onClose, workout }) => {
    return (
        <Modal
            visible={modalVisible}
            animationType="fade"
            transparent={true}
            onRequestClose={onClose}
        >
            {/* Pop-up content*/}
            <View style={styles.popUpCenter}>
                <View style={styles.popUp}>
                    {/** insert json here.. */}
                    <StartedWorkout workout={workout} />
                    {/* Close pop-up button */}
                    <View style={styles.popUpBtnContainer}>
                        <TouchableOpacity
                            style={[styles.popUpButton, { backgroundColor: '#80898b' }]}
                            onPress={() => {
                                setModalVisible(!modalVisible)
                            }}
                        >
                            <Text style={styles.appButtonText}>Close</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.popUpButton}
                            onPress={() => {
                                setModalVisible(!modalVisible)

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