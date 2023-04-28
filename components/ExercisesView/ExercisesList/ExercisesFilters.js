import React, { useState } from 'react';
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

export default ExercisesFilters;