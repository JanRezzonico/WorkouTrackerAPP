
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Dimensions, TextInput, ScrollView, TouchableOpacity, FlatList, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import WTHorizontalLine from "./wt/WTHorizontalLine";
import ExercisePicker from './ExercisePicker';
import colors from '../assets/style/colors';
import WTIconButton from './wt/WTIconButton';
import WTButton from './wt/WTButton';
import { useEffect } from 'react';
import style from "../assets/style/style"

const normalMargin = Dimensions.get('window').height * 0.02;
const cardWidth = Dimensions.get('window').width * 0.9;


function CreateWorkoutModelView({onNameChange, onExListChange, onExPropChange, saveTemplate, onRequestClose}) {
    //let exId = 1;
    // exId is used to set an uinique ID to each exercise
    const [exId, setExId] = useState(0);

    // setId is used to set an uinique ID to each set
    const [setId, setSetId] = useState(0);

    const [modalVisible, setModalVisible] = useState(false);

    // Templates's name
    const [name, setName] = useState('New Workout');

    // List of exercise
    const [exList, setExList] = useState([{ id: exId, selectedOption: "Select an option" }]);

    // List of sets and kg, with the ID of the exercise
    const [exProp, setExProp] = useState([{ id: setId, exId: exId, kg:0, rep:0 }]);

    // exercise selected from the picker
    const [selectedOption, setSelectedOption] = useState('Select an option');
    const data = require('../assets/json/exercises.json');
    const options = data.exercises.map(exercise => exercise.name);

    //This function is used to remove an exercise's name by his index from the exList
    function rmEx(id) {
        setExList(prevExList => prevExList.filter(ex => ex.id !== id));
    }

    //This function is used to add an exercise's name in to the exList
    function addEx() {
        var nextId = exId+1;
        setExId(nextId);
        setExList([...exList, { id: nextId, selectedOption: "Select an option" }]);
    }

    //This function is used to add a set in an exercise in to the exProp
    const addSet = (id) => {
        var nextId = setId + 1;
        setSetId(nextId);
        setExProp([...exProp, { id: nextId, exId: id, kg: "", reps: "" }]);
    }

    //When the view is render send change to StartWorkoutView
    useEffect(() => {
        onExListChange(exList);
    }, [exList, onExListChange]);

    useEffect(() => {
        onExPropChange(exList);
    }, [exProp, onExPropChange]);

    useEffect(() => {
        onNameChange(name);
    }, [name, onNameChange]);

    return (
        <SafeAreaView style={styles.mainContainer}>
            <FlatList data={exList}
                ListHeaderComponent={
                    <View style={styles.container}>
                        <View style={styles.card}>
                            <Text style={styles.title}>Name</Text>
                            <WTHorizontalLine color="white" />
                            <TextInput
                                style={styles.inputs}
                                placeholder='New Workout'
                                placeholderTextColor={'#aaa'}
                                onChangeText={text => setName(text)}
                            />
                        </View>
                        <View style={styles.card}>
                            <Text style={styles.title}>Exercises</Text>
                            <WTHorizontalLine color="white" />
                        </View>
                    </View>
                }
                renderItem={({ item }) =>
                    <View style={styles.exercise}>
                        {/* 
                            Start
                            Exercise picker + remove button  
                        */}
                        <View style={styles.exerciseType}>
                            {/* ExercisePicker is a component used to pick an exercise from the list */}
                            <ExercisePicker
                                style={styles.select}
                                options={options}
                                selectedOption={item.selectedOption}
                                onSelect={(option) => {
                                    setExList(prevExList => prevExList.map(ex => {
                                        if (ex.id === item.id) {
                                            return { ...ex, selectedOption: option };
                                        }
                                        return ex;
                                    }))
                                }}
                                key={item.id.toString}
                            />
                            <WTIconButton library='Ionicons' name='close-outline' onPress={() => { rmEx(item.id) }} />
                        </View>
                        {/* 
                            End 
                            Exercise picker + remove button
                        */}
                        <View style={{flexDirection: 'column'}}>
                            {/*Sets List*/}
                            <FlatList data={exProp}
                                renderItem={({ item: innerItem }) => {
                                    if (item.id === innerItem.exId) {
                                        return (
                                            <View style={{ flexDirection: 'row' }}>
                                                <TextInput
                                                    style={styles.exProp}
                                                    maxLength={3}
                                                    placeholder='kg'
                                                    placeholderTextColor={'#aaa'}
                                                    keyboardType='numeric'
                                                    onChangeText={()=>{
                                                        null
                                                    }}
                                                />
                                                <TextInput
                                                    style={styles.exProp}
                                                    maxLength={3}
                                                    placeholder='reps'
                                                    placeholderTextColor={'#aaa'}
                                                    keyboardType='numeric'
                                                    onChangeText={()=>{
                                                        null
                                                    }}
                                                />
                                            </View>
                                        );
                                    }
                                }}
                                keyExtractor={item => item.id}
                            />
                            <WTButton onPress={() => { addSet(item.id) }} text="Add set" backgroundColor='#7c868b' />
                        </View>
                        <WTHorizontalLine color='white'/>
                    </View>
                }
                ListFooterComponent={
                    <View>
                        <WTButton onPress={() => { addEx() }} text={"Add exercise"} />
                        <View style={style.horizontalContainer}>
                            <WTIconButton library='Feather' name='trash-2' onPress={() => { onRequestClose() }} color={"red"} />
                            <WTIconButton library='Feather' name='save' onPress={() => { saveTemplate(); onRequestClose();}} color={colors.BLUE} />
                        </View>
                    </View>
                    
                }
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}
export default CreateWorkoutModelView;

const styles = StyleSheet.create({
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
        textTransform: 'uppercase',
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
});
