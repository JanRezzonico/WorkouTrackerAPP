import { View, Dimensions, StyleSheet } from "react-native";
function WTHorizontalLine({color = "black"}) {
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