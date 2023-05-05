import { useEffect, useState } from "react";
import { Text, View, FlatList, ScrollView, Modal } from "react-native";
import HistoryListItem from "./HistoryListItem";
import { fetchData } from "./Model";

function HistoryListView({sessions, setSessions}) {
    
    // After rendering the components get the session data
    useEffect(() => {
        fetchData(setSessions);;
    }, []);
    
    
    
    return (
        <View>
            { // if the session is empty
                sessions.length == 0 && <Text style={{marginTop: 20, color: 'white', fontSize: 18 }}>History clear! Start working out to see your past workouts.</Text>
            }
            <FlatList
                data={sessions}
                renderItem={(itemData) => {
                    return (
                        <HistoryListItem {...itemData.item} />
                    );
                }}
            />
        </View>
    );
}

export default HistoryListView;