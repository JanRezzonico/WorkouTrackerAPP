import { useEffect, useState } from "react"
import saveWorkoutToDB from "./Model";
import StartedWorkout from "./StartedWorkout";
import styles from "../../assets/style/style";
import colors from "../../assets/style/colors";
import { FlatList, SafeAreaView, View, Text, TextInput } from "react-native";
import Timer from "./components/Timer";
import WTHorizontalLine from "../wt/WTHorizontalLine";
import WTButton from "../wt/WTButton";
import ExercisePicker from "../ExercisePicker";
import WTIconButton from "../wt/WTIconButton";

const StartedWorkoutView = ({ workout = null, setWorkout, toggleModal }) => {
    const startDate = new Date();
    const [exercises, setExercises] = useState([]);
    const [name, setName] = useState(workout ? workout.name : null);
    const [exId, setExId] = useState(0);
    const [setId, setSetId] = useState(0);
    const [selectedOption, setOption] = useState("");
    const [exList, setExList] = useState([{ id: exId, selectedOption: "Select an option" }]);
    const [exProp, setExProp] = useState([{ id: setId, exId: exId, kg: 0, rep: 0 }]);
    const options = global.exercises.map(exercise => exercise.name);

    const saveWorkout = () => {
        console.log(exercises);
        const endDate = new Date();
        let workout = { name: name, exercises: exercises, end_date: endDate, start_date: startDate };
        setWorkout(workout);
        saveWorkoutToDB(workout);
    }
    const addExercise = (name) => {
        setExercises(prevExercises => [...prevExercises, { name }]);
    }
    const removeExercise = (index) => {
        let e = exercises;
        setExercises(e.splice(index, 1));
    }

    const addSet = (id) => {
        var nextId = setId + 1;
        setSetId(nextId);
        setExProp([...exProp, { id: nextId, exId: id, kg: "", reps: "" }])
    }

    const handleButtonClick = () => {
        props.toggleModal(); // call the toggleModal function from the props
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
                                value={name}
                                placeholderTextColor={'#aaa'}
                                placeholder={workout ? workout.name : "New Workout"}
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
                                            setOption(option);
                                            return { ...ex, selectedOption: option };
                                        }
                                        return ex;
                                    }))
                                }}
                                key={item.id.toString}
                            />
                            <WTIconButton library='Ionicons' name='close-outline' onPress={() => { removeExercise(item.id) }} />
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
                        <WTButton onPress={() => { addExercise() }} text={"Add exercise"} />
                        <View style={styles.horizontalContainer}>
                            <WTIconButton library='Feather' name='trash-2' onPress={ toggleModal } color={"red"} />
                            <WTIconButton library='Feather' name='save' onPress={()=>{saveWorkout(); toggleModal(); }} color={colors.BLUE} />
                        </View>
                    </View>
                }
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );

};

export default StartedWorkoutView;