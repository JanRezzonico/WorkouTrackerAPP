import React, { useState } from 'react';
import { Text, View, FlatList, ScrollView, Dimensions, StyleSheet, TouchableOpacity,Modal } from "react-native";
import colors from '../../../assets/style/colors';


const normalMargin = Dimensions.get('window').height * 0.015;
const cardW = Dimensions.get('window').width * 0.9;
const normalFont = Dimensions.get('window').width * 0.034;
const subTitleFont = Dimensions.get('window').width * 0.045;

function TemplateItemView(props) {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.woTemplate}>
            <Text style={styles.templateTitle}>{props.template.item.title}</Text>
            
            {/* <WOProgressModal visible={modalVisible} onclose={()=>{setModalVisible(false)}}/> */}

            <FlatList // List of Exercises like 3xSquat, 3xCurl
                data={props.template.item.exercises}
                renderItem={(e) => {
                    return (
                        <Text style={styles.templateEx}>{e.item.sets.length} x {e.item.name}</Text>
                    );
                }}
            />
        </TouchableOpacity>
    );
}

export default TemplateItemView;

const styles = StyleSheet.create({
    woTemplate: {
        width: cardW,
        height: 'auto',
        borderRadius: 10,
        backgroundColor: colors.MAIN,
        backfaceVisibility: 'hidden',
        alignSelf: 'center',
        marginTop: normalMargin,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        borderColor: '#8c9596',
        borderWidth: 1,
        marginBottom: normalMargin,
    },
    templateTitle: {
        fontSize: subTitleFont,
        color: 'white',
        marginBottom: 8,
        fontWeight: '500',
    },
    templateEx: {
        fontSize: normalFont,
        color: '#8c9596',
        marginBottom: 8,
        fontWeight: '400',
    },
    popUp: {
        backgroundColor: colors.MAIN,
        borderRadius: 10,
        padding: 10,
        height: Dimensions.get('window').height / 7 * 5,
        width: Dimensions.get('window').width * 0.95,
        elevation: 20,
        shadowColor: 'black',
    },
    popUpCenter: {
        marginRight: 'auto',
        marginLeft: 'auto',
        padding: 5,
        marginTop: Dimensions.get('window').height / 7,
    },
    popUpButton: {
        backgroundColor: "#2e42f8",
        elevation: 8,
        borderRadius: 10,
        padding: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: normalMargin,
        marginBottom: normalMargin,
        width: Dimensions.get('window').width / 3,
    },
    popUpBtnContainer: {
        marginRight: 'auto',
        marginLeft: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    appButtonText: {
        fontSize: 14,
        color: 'white',
        fontWeight: '500',
        alignSelf: 'center',
        textTransform: 'uppercase'
    }
});