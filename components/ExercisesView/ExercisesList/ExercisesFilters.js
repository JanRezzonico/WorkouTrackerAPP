import React, { useState } from 'react';
import { StyleSheet } from "react-native";
import { SearchBar } from '@rneui/themed';
import { filter, getDistinct } from './Model';


function ExercisesFilters(props) {
    const [search, setSearch] = useState("");

    const handleClear = () => {
        setSearch('');
        const data = filter({ search: '' });
        props.setData(data);
    }

    const handleUpdateData = () => {
        const data = filter({ search: search });
        props.setData(data);
    }

    return (
        <SearchBar
            containerStyle={styles.searchBar}
            inputContainerStyle={styles.input}
            placeholder="Type Here..."
            onChangeText={setSearch}
            onEndEditing={handleUpdateData}
            onKeyboardHide={handleUpdateData}
            onCancel={handleUpdateData}
            onClear={handleClear}
            value={search}
        />
    );
}

const styles = StyleSheet.create({
    searchBar: {
        backgroundColor: '#293237',
        borderBottomColor: '#293237'
    },
    input: {
        backgroundColor: '#f9f9f9',
        
    }
  });

export default ExercisesFilters;