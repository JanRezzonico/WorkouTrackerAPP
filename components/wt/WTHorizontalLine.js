import { View, Dimensions, StyleSheet } from "react-native";
function WTHorizontalLine(props) {
    let color = props.color ? props.color : "black";
    return (
        <View
            style={{
                borderBottomColor: color,
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginVertical: Dimensions.get('window').height * 0.01,
            }}
        />
    );
}

export default WTHorizontalLine;