import { useEffect, useState } from "react"
import saveWorkoutToDB from "./Model";

const StartedWorkoutView = ({ workout = null, setWorkout }) => {
    const [name, setName] = useState("New Workout");
    const [exercises, setExercises] = useState([]);
    const saveWorkout = () => {
        setWorkout({ name: name, exercises: exercises });
        saveWorkoutToDB(workout);
    }
    const addExercise = (name) => {
        setExercises(exercises.push({ name: name }));
    }
    const removeExercise = (index) => {
        setExercises(exercises.splice(index, 1));
    }
}