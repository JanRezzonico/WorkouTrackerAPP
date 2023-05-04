import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import PropTypes from 'prop-types';
import colors from "../../assets/style/colors";
import { RFValue } from "react-native-responsive-fontsize";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const WTErrorView = ({ message = "Error getting data. \n\n Please check your internet connection." }) => {
    return (
        <View style={styles.mainContainer}>
                <MaterialCommunityIcons name="connection" size={RFValue(64)} color={colors.TEXT} />
                <Text style={styles.text}>{message}</Text>
        </View>
    );
}

WTErrorView.propTypes = {
    message: PropTypes.string
};

export default WTErrorView;

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: colors.MAIN,
        flex: 1,
        alignItems: 'center',
        justifyContent: "center"
    },
    verticalContainer: {
        flexDirection: "column"
    },
    text: {
        marginTop: 50,
        color: colors.TEXT,
        textAlign: "center",
        fontSize: RFValue(24),
        fontWeight: "bold"
    },
});
