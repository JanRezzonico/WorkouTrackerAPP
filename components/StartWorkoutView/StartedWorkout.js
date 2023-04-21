import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Dimensions, TextInput, ScrollView, TouchableOpacity, FlatList, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../assets/style/colors';
import WTHorizontalLine from "./../wt/WTHorizontalLine";

const normalMargin = Dimensions.get('window').height * 0.02;
const cardWidth = Dimensions.get('window').width * 0.9;

const StartedWorkout = (workout) => {
    {/* Expected data is a json containing the various exercises and sets */}
    return (
            <SafeAreaView style={styles.mainContainer}>
                <View style={styles.container}>
                    <View style={styles.card}>
                        <TextInput
                            style={styles.inputs}
                            placeholder={params.woName}
                            placeholderTextColor={'#aaa'}
                            onChangeText={text => setName(text)}
                        />
                        <WTHorizontalLine color="white" />
                    </View>
                    <View style={styles.card}>
                        <View style={styles.cardTitle}>
                            <Text style={styles.title}>Exercises</Text>
                            <TouchableOpacity onPress={() => { addEx() }}>
                                <Icon name='add-outline' style={styles.btnIcon} />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <FlatList
                                data={exList}
                                keyExtractor={item => item.id.toString}
                                renderItem={({ item }) =>
                                    <View style={styles.exercise}>
                                        <TextInput
                                            style={styles.exProp}
                                            maxLength={3}
                                            placeholder='kg'
                                            placeholderTextColor={'#aaa'}
                                            keyboardType='numeric' />
                                        <TextInput
                                            style={styles.exProp}
                                            maxLength={3}
                                            placeholder='reps'
                                            placeholderTextColor={'#aaa'}
                                            keyboardType='numeric' />
                                        <TouchableOpacity onPress={() => { rmEx(item.id) }}>
                                            <Icon name='close-outline' style={styles.removeButton} />
                                        </TouchableOpacity>
                                    </View>
                                }
                            />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
    )
}

export default StartedWorkout;

const styles = StyleSheet.create({
mainContainer: {
    flex: 1,
    backgroundColor: colors.MAIN,
},
container: {
    justifyContent: 'space-between',
},
title: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 10,
},
card: {
    width: cardWidth,
    borderRadius: 10,
    backfaceVisibility: 'hidden',
    alignSelf: 'center',
    marginTop: normalMargin,
    paddingTop: 20,
    paddingBottom: 25,
},
cardTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
},
select: {
    flex: 2,
    fontSize: 30
},
inputs: {
    borderWidth: 1,
    borderColor: '#7c868b',
    marginLeft: 15,
    marginTop: 10,
    width: '60%',
    borderRadius: 7,
    color: 'white',
    fontSize: 15,
    paddingHorizontal: 7,
},
btnIcon: {
    marginRight: (Dimensions.get('window').width - cardWidth) / 2,
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 5,
},
exercise: {
    display: 'flex',
    flex: 5,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5
},
removeButton: {
    flex: 1,
    paddingTop: 7,
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
},
exProp: {
    flex: 1,
    borderRadius: 5,
    marginBottom: 5,
    height: '100%',
    paddingHorizontal: 7,
    color: 'white',
    fontSize: 15,
    overflow: 'hidden'
},
popUp: {
    backgroundColor: colors.MAIN,
    borderRadius: 10,
    padding: 5,
    height: Dimensions.get('window').height - 100,
    width: Dimensions.get('window').width * 0.75,
    elevation: 20,
    shadowColor: 'black',
    shadowOpacity: .60
},
popUpCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    margin: normalMargin,
},
popUpButton: {
    backgroundColor: "#2e42f8",
    elevation: 8,
    borderRadius: 25,
    marginTop: normalMargin,
    marginRight: 'auto',
    marginLeft: 'auto',
    padding: 10,
    marginBottom: normalMargin
}
})