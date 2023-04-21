import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import colors from '../../assets/style/colors';
import getBMI from './BMIModel';



function BMIView(props) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.textTitle}>Your Weight:</Text>
                <Text style={styles.text}>{props.weight} kg</Text>
                <Text style={styles.textTitle}>Your Height:</Text>
                <Text style={styles.text}>{props.height} cm</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.textTitle}>Your BMI:</Text>
                <View style={styles.BMIDecoration}>
                    <Text style={styles.text}>{getBMI(props.weight, props.height)}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    // Style for main container
    container: {
        marginTop: 20,
        flex: 1,
    },
    // Style for a section of the page
    section: {
        backgroundColor: colors.MAIN,
        borderRadius: 10,
        padding: 5,
        margin: 5,
    },
    // Style for title
    textTitle: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    // Style for text
    text: {
        textAlign: 'center',
        color: 'white',
        margin: 2,
    },
    // Style for the BMI result
    BMIDecoration: {
        margin: 10,
        padding: 10,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2e42f8'
    }
});

export default BMIView;