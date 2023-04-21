import { Text, View, FlatList, ScrollView, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import WTHorizontalLine from "./wt/WTHorizontalLine";
function ExerciseModalView(props) {
    const start_date = new Date(props.start_date);
    const end_date = new Date(props.end_date);
    const duration = Math.trunc((end_date - start_date) / (1000 * 60)*10)/10;
    const day = start_date.toLocaleDateString();
    let totalWeight = 0;
    props.exercises.forEach(e => {
        e.sets.forEach(s => {
            if (s.weight) {
                totalWeight += (s.weight * s.reps);
            }
        });
    });
    return (
        <SafeAreaView>
            <Text style={styles.mainTitle}>{props.name}</Text>
                <View style={styles.horizontalContainer}>
                    <Text style={styles.text}>{day}</Text>
                    <Text style={styles.text}>{duration} min</Text>
                    <Text style={styles.text}>{totalWeight} kg</Text>
                </View>
                <WTHorizontalLine color="white"/>
                <View>
                    <FlatList
                        data={props.exercises}
                        renderItem={(e) => {
                            e = e.item;
                            return (
                                <View>
                                    <Text style={styles.textTitle}>{e.name}</Text>
                                    <FlatList
                                        data={e.sets}
                                        renderItem={(s) => {
                                            let index = s.index;
                                            s = s.item;
                                            return(
                                                <View style={styles.horizontalContainerSets}>
                                                    <Text style={styles.textSets}>{index}</Text>
                                                    <Text style={styles.textSets}>{s.weight} kg x {s.reps}</Text>
                                                </View>
                                            );
                                        }}
                                    />
                                </View>
                            );
                        }}
                    />
                </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    mainTitle: {
        color: 'white',
        textAlign: "center",
        fontWeight: '400',
        fontSize: 20,
        marginBottom: 3
    },
    textTitle: {
        color: 'white',
        fontWeight: '400',
        fontSize: 16,
        marginHorizontal: 10,
        marginBottom: 3,
        marginTop: 3
    },
    text: {
        color: '#8c9596',
        margin: 2,
    },
    textSets: {
        color: '#8c9596',
        margin: 2,
        marginHorizontal: 10
    },
    horizontalContainer: {
        alignItems: "flex-start",
        paddingHorizontal: Dimensions.get('window').width * 0.05,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    horizontalContainerSets: {
        alignItems: "flex-start",
        paddingHorizontal: Dimensions.get('window').width * 0.01,
        flexDirection: "row",
        justifyContent: "flex-start",
    }
});

export default ExerciseModalView;