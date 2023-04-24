import { TouchableOpacity, Text, StyleSheet } from "react-native";
import PropTypes from 'prop-types';

const WTButton = ({text, onPress}) => {
    return (
        <TouchableOpacity style={styles.appButtonContainer} onPress={onPress}>
            <Text style={styles.appButtonText}>{text}</Text>
        </TouchableOpacity>
    );
}

WTButton.propTypes = {
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
};

export default WTButton;

const styles = StyleSheet.create({
    appButtonContainer: {
        elevation: 8,
        backgroundColor: '#2e42f8',
        borderRadius: 10,
        marginTop: 10,
        marginRight: 'auto',
        marginLeft: 'auto',
        padding: 10,
        paddingHorizontal: 100
    },
    appButtonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase'
    },
});
