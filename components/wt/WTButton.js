import { TouchableOpacity, Text, StyleSheet } from "react-native";
import PropTypes from 'prop-types';
import { RFValue } from "react-native-responsive-fontsize";

const WTButton = ({ text, onPress, backgroundColor = '#2e42f8', color = 'white' }) => {
    const styles = StyleSheet.create({
        appButtonContainer: {
            elevation: 8,
            backgroundColor: backgroundColor,
            borderRadius: 10,
            marginTop: 10,
            marginRight: 'auto',
            marginLeft: 'auto',
            padding: 10,
            paddingHorizontal: 100
        },
        appButtonText: {
            fontSize: RFValue(18),
            color: color,
            fontWeight: 'bold',
            alignSelf: 'center',
            textTransform: 'uppercase'
        },
    });
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


