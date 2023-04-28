import React, { useState } from 'react';
import { SearchBar } from '@rneui/themed';
import { filter, getDistinct } from './Model';


function ExercisesFilters(props) {
    const updateData = () => {
        const data = filter({ search: search });
        props.setData(data);
    }
    const [search, setSearch] = useState("");
    return (
                <SearchBar
                    placeholder="Type Here..."
                    onChangeText={setSearch}
                    onEndEditing={updateData}
                    onKeyboardHide={updateData}
                    onCancel={updateData}
                    onClear={updateData}
                    value={search}
                />
    );
}
export default ExercisesFilters;