import React, { useState } from 'react';
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { SearchBar } from '@rneui/themed';
import { filter, getDistinct } from './ExercisesListModel';
import colors from '../../../assets/style/colors';
import DropDownPicker from 'react-native-dropdown-picker';
import WTButton from '../../wt/WTButton';
import { Select, SelectProvider } from '@mobile-reality/react-native-select-pro';


function ExercisesFilters(props) {
    const distinctPrimaryMuscles = getDistinct("primaryMuscles");
    const distinctForces = getDistinct("equipment");
    const [filters, setFilters] = useState({ search: '', muscles: 'All', force: 'All' });
    const setSearchFilter = (search) => { setFilters({ search: search, ...filters }) };
    const setMusclesFilter = (value) => { setFilters({ muscles: value, ...filters }) };
    const setForceFilter = (value) => { setFilters({ force: value, ...filters}) };
    const updateData = () => {
        props.setData(filter(filters));
    }
    const [openMuscles, setOpenMuscles] = useState(false);
    const [valueMuscles, setValueMuscles] = useState(distinctPrimaryMuscles[0]);
    const [itemsMuscles, setItemsMuscles] = useState(distinctPrimaryMuscles);
    const [openForce, setOpenForce] = useState(false);
    const [valueForce, setValueForce] = useState(distinctForces[0]);
    const [itemsForce, setItemsForce] = useState(distinctForces);
    const [search, setSearch] = useState("");
    return (
        <SelectProvider>
            <SearchBar
                placeholder="Type Here..."
                onChangeText={setSearchFilter}
                value={search}
            />
            <View style={styles.horizontalContainer}>
                <Select options={distinctPrimaryMuscles} onSelect={(value)=>{setMusclesFilter(value.value)}} />
                {/* <View style={styles.dropdownContainer}>
                    <DropDownPicker
                        open={openMuscles}
                        value={valueMuscles}
                        items={distinctPrimaryMuscles}
                        setOpen={setOpenMuscles}
                        setValue={setValueMuscles}
                        theme="DARK"
                        mode='SIMPLE'
                    />
                </View>
                <View style={styles.dropdownContainer}>
                    <DropDownPicker
                        open={openForce}
                        value={valueForce}
                        items={distinctForces}
                        setOpen={setOpenForce}
                        setValue={setValueForce}
                        theme="DARK"
                        mode='SIMPLE'
                    />
                </View> */}
                <View style={styles.dropdownContainer}>
                    <WTButton text={"Ok"} onPress={updateData} />
                </View> 
            </View>
        </SelectProvider>
    );
}


const styles = StyleSheet.create({
    horizontalContainer: {
        backgroundColor: '#2e42f8',
        flex: 2,
        alignItems: 'center',
        paddingHorizontal: Dimensions.get('window').width * 0.05,
        flexDirection: "row",
        justifyContent: 'space-around',
        marginVertical: 10,
        marginHorizontal: Dimensions.get('window').width * 0.1,
        zIndex: 1000
    },
    dropdownContainer: {
        flex: 2,
        width: "45%",
        borderRadius: 20,
        backgroundColor: '#fafafa',
        marginHorizontal: 5,
        marginVertical: 20,
        zIndex: 1000
    },
    dropdown: {
        backgroundColor: '#fafafa',
        flex: 1,
    },
    pickerView: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        backgroundColor: 'white',
        padding: 5,
    },
    pickerInput: {
        height: 40,
        fontSize: 16,
    },
    pickerPlaceholder: {
        color: 'gray',
        fontSize: 16,
    },
    pickerIcon: {
        top: 10,
        right: 12,
    },
});


const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        backgroundColor: colors.MAIN
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        backgroundColor: colors.MAIN
    },
});

export default ExercisesFilters;