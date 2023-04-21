import React, { useState } from 'react';
import { Text, View, FlatList, StyleSheet, SectionList, Dimensions } from "react-native";
import ExercisesList from "./ExercisesList/ExercisesList";
import ExercisesFilters from './ExercisesList/ExercisesFilters';
import colors from '../../assets/style/colors';

function ExercisesView(props) {
  const [data, setData] = useState(global.exercises)
  return (
    <View style={styles.mainContainer}>
      <ExercisesFilters data={data} setData={setData} />
      <ExercisesList style={styles.list} data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.MAIN
  },
  contentContainer: {
    backgroundColor: '#626262',
    borderRadius: 10,
    padding: 5,
    margin: 5,
  },
  textTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  textTitleContainer: {
    backgroundColor: '#2e42f8',
    borderRadius: 10,
    padding: 5,
    margin: 5,
  },
  text: {
    color: 'white',
    margin: 2,
  },
  list: {
    flex: 1
  }
});


export default ExercisesView;