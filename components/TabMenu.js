import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import ExercisesView from './ExercisesView/ExercisesView';
import HistoryView from './History/HistoryView';
import ProfileView from './Profile/ProfileView';
import StartWorkoutView from './StartWorkoutView/StartWorkoutView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../assets/style/colors';

function TabMenu(props) {
    //When the view gets rendered, get the user ID from the AsyncStorage and set it
    useEffect(() => {
        const setUserId = async () => {
            const value = await AsyncStorage.getItem('_id');
            console.log(value);
            global.USER_ID = value;
        };
        setUserId();
    }, []);
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            initialRouteName='StartWorkoutView'
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveBackgroundColor: colors.BLUE,
                tabBarActiveTintColor: colors.TEXT,
                tabBarInactiveTintColor: colors.MAIN,
                headerTintColor: colors.BLUE,
                headerTitleAlign: 'center',
            }}>
            {/* ProfileView */}
            <Tab.Screen
                name="Profile"
                component={ProfileView}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" size={size} color={color} />
                    ),
                }} />
            {/* StartWorkoutView */}
            <Tab.Screen
                name="Start workout"
                component={StartWorkoutView}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="plussquareo" size={size} color={color} />
                    ),
                }}
            />
            {/* HistoryView */}
            <Tab.Screen
                name="History"
                component={HistoryView}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="history" size={size} color={color} />
                    ),
                }} />
            {/* ExercisesView */}
            <Tab.Screen
                name="Exercises"
                component={ExercisesView}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="dumbbell" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
export default TabMenu;