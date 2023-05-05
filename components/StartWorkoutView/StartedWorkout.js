import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Dimensions, TextInput, ScrollView, TouchableOpacity, FlatList, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../assets/style/colors';
import styles from '../../assets/style/style';
import WTHorizontalLine from "./../wt/WTHorizontalLine";
import WTIconButton from '../wt/WTIconButton';
import ExercisePicker from '../ExercisePicker';
import Timer from './components/Timer';
import WTButton from '../wt/WTButton';
import saveWorkout from './Model';

const normalMargin = Dimensions.get('window').height * 0.02;
const cardWidth = Dimensions.get('window').width * 0.9;

const StartedWorkout = ({ workout = null, setWorkout, onRequestClose }) => {
    const [exId, setExId] = useState(0);
    const [setId, setSetId] = useState(0);
    const [exList, setExList] = useState([{ id: exId, selectedOption: "Select an option" }]);
    const [exProp, setExProp] = useState([{ id: setId, exId: exId, kg: 0, rep: 0 }]);

    const [exercises, setExercises] = useState([{ id: exId, selectedOption: "Select an option" }]);


    const data = require('../../assets/json/exercises.json');
    const options = data.exercises.map(exercise => exercise.name);

    const setName = (newName) => {
        setWorkout({ ...workout, name: newName });
    }
    useEffect(() => {
        setName("New Workout");
        if (workout) {
            if (workout.exercises) {
                function initialize() {
                    setName(workout.name);
                    (workout.exercises).forEach(ex => {
                        var nextId = exId + 1;
                        setExId(nextId);
                        setExList([{ id: nextId, selectedOption: ex.name }]);
                        ex.sets.forEach(set => {
                            var nextSetId = setId + 1;
                            setSetId(nextSetId);
                            setExProp([{ id: nextSetId, exId: nextId, kg: set.weight, rep: set.reps }]);
                        });
                    });
                }
                initialize();
            }
        }
    }, []);



    //This function is used to remove an exercise's name by his index from the exList
    const rmEx = (id) => {
        setExList(prevExList => prevExList.filter(ex => ex.id !== id));
    }

    //This function is used to add an exercise's name to the exList
    const addEx = () => {
        var nextId = exId + 1;
        setExId(nextId);
        setExList([...exList, { id: nextId, selectedOption: "Select an option" }]);
    }

    const addSet = (id) => {
        var nextId = setId + 1;
        setSetId(nextId);
        setExProp([...exProp, { id: nextId, exId: id, kg: "", reps: "" }]);
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <FlatList data={exList}
                ListHeaderComponent={
                    <View style={styles.container}>
                        <View style={styles.card}>
                            <View style={styles.timerContainer}>
                                <Text style={styles.title}>Name</Text>
                                <Text style={styles.timer}></Text>
                                <Timer />
                            </View>
                            <WTHorizontalLine color="white" />
                            <TextInput
                                style={styles.inputs}
                                value={workout ? workout.name : "New Workout"}
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
                        <View style={styles.exerciseType}>
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
                        <View style={{ flexDirection: 'column' }}>
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
                                                />
                                                <TextInput
                                                    style={styles.exProp}
                                                    maxLength={3}
                                                    placeholder='reps'
                                                    placeholderTextColor={'#aaa'}
                                                    keyboardType='numeric'
                                                />
                                            </View>
                                        );
                                    }
                                }}
                                keyExtractor={item => item.id}
                            />
                            <WTButton onPress={() => { addSet(item.id) }} text="Add set" backgroundColor='#7c868b' />
                        </View>
                    </View>
                }
                ListFooterComponent={
                    <View>
                        <WTButton onPress={() => { addEx() }} text={"Add exercise"} />
                        <View style={styles.horizontalContainer}>
                            {/* <WTIconButton library='Feather' name='trash-2' onPress={() => { onRequestClose(); }} color={"red"} />
                            <WTIconButton library='Feather' name='save' onPress={() => { saveWorkout(workout); onRequestClose(); }} color={colors.BLUE} /> */}
                        </View>
                    </View>
                }
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}

export default StartedWorkout;
