import { Text, View, FlatList, StyleSheet, SectionList, Dimensions } from "react-native";
import ExerciseListItem from "./ExerciseListItem";
import { sectionize } from "./Model";

const renderItem = ({item}) => {
  return(
    <ExerciseListItem {...item} />
  );
};
const renderSectionHeader = ({section}) => {
  if(section.data.length == 0){
    return <View><Text>Doesn't work..</Text></View>;
  }else{
    return(
      <View style={styles.textTitleContainer}>
        <Text style={styles.textTitle}>{section.title}</Text>
      </View>
    );
  }
}

function ExercisesList(props) {
  return (
    <View style={styles.mainContainer}>
      <SectionList
        sections={sectionize(props.data)}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.contentContainer}
        keyExtractor={(item, index) => item.name + index} 
        scrollIndicatorInsets={{ top: 50, bottom: 50 }}
      />
    </View>

  );
}

const styles = StyleSheet.create({
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
});


export default ExercisesList;