import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Dimensions, TextInput, ScrollView, TouchableOpacity, FlatList, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../assets/style/colors';
import styles from '../../assets/style/style';
import WTHorizontalLine from "./../wt/WTHorizontalLine";
import WTIconButton from '../wt/WTIconButton';
import ExercisePicker from '../ExercisePicker';

const normalMargin = Dimensions.get('window').height * 0.02;
const cardWidth = Dimensions.get('window').width * 0.9;

const StartedWorkout = ({ workout }) => {

    //console.log(workout);
    //console.log(workout.title);
    //console.log(workout.exercises);
    const [exId, setExId] = useState(0);
    const [setId, setSetId] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('New Workout');
    const [exList, setExList] = useState([{ id: exId, selectedOption: "Select an option" }]);
    const [exProp, setExProp] = useState([{ id: setId, exId: exId, kg: 0, rep: 0 }]);

    const [selectedOption, setSelectedOption] = useState('Select an option');
    const data = require('../../assets/json/exercises.json');
    const options = data.exercises.map(exercise => exercise.name);

    useEffect(() => {
        
        function initialize() {
            //console.log("Nayt");
            (workout.exercises).forEach(ex => { 
                console.log(ex);
                var nextId = exId + 1;
                setExId(nextId);
                setExList([{ id: nextId, selectedOption: ex.name }]);
                ex.sets.forEach(set => {
                    var nextSetId = setId + 1;
                    setSetId(nextSetId);
                    setExProp([{id: nextSetId, exId: nextId, kg: set.weight, rep: set.reps}]);
                });
            });
        } 
        initialize();
    }, []);

    const Timer = () => {
        const [seconds, setSeconds] = useState(0);

        useEffect(() => {
            const interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
            return () => clearInterval(interval);
        }, []);

        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds - (hours * 3600)) / 60);
        const formattedSeconds = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;

        return (
            <View>
                <Text style={styles.timer}> Time: {hours}:{minutes < 10 ? `0${minutes}` : minutes}:{formattedSeconds}</Text>
            </View>
        );
    };

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
        console.log(nextId);
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
                                <Timer></Timer>
                            </View>
                            <WTHorizontalLine color="white" />
                            <TextInput
                                style={styles.inputs}
                                value={workout.title}
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
                            <TouchableOpacity onPress={() => { addSet(item.id) }} style={[styles.addBtn, { backgroundColor: '#7c868b' }]}>
                                <View style={styles.horizontalText}>
                                    <Text style={styles.appButtonText}>Add set</Text>
                                    <Icon name='add-outline' style={styles.btnIcon} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                ListFooterComponent={
                    <View>
                        <TouchableOpacity onPress={() => { addEx() }} style={[styles.addBtn, { marginVertical: normalMargin }]}>
                            <View style={styles.horizontalText}>
                                <Text style={styles.appButtonText}>Add exercise</Text>
                                <Icon name='add-outline' style={styles.btnIcon} />
                            </View>
                        </TouchableOpacity>
                    </View>

                }
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}

export default StartedWorkout;

const style = StyleSheet.create({
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
    cardTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    select: {
        flex: 2,
        fontSize: 30
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
    btnIcon: {
        marginRight: (Dimensions.get('window').width - cardWidth) / 2,
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold',
        marginTop: 5,
    },
    exercise: {
        display: 'flex',
        flex: 5,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5
    },
    removeButton: {
        flex: 1,
        paddingTop: 7,
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold',
    },
    exProp: {
        flex: 1,
        borderRadius: 5,
        marginBottom: 5,
        height: '100%',
        paddingHorizontal: 7,
        color: 'white',
        fontSize: 15,
        overflow: 'hidden'
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
    }
})