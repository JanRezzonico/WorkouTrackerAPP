import { useEffect, useState } from "react";
import { Text, View, FlatList, ScrollView } from "react-native";
import HistoryListItem from "./HistoryListItem";
import DB from "../api/api";

function HistoryListView(props) {
    const [sessions, setSessions] = useState([]);
    // After rendering the components get the session data
    useEffect(() => {
        async function fetchData() {
            const data = await DB.session.get();
            setSessions(data);
        }
        fetchData();
    }, []);
    
    return (
        <View>
            { // if the session is empty
                sessions.length == 0 && <Text style={{marginTop: 20, color: 'white', fontSize: 18 }}>History clear! Start working out to see your past workouts.</Text>
            }
            <FlatList
                data={sessions}
                // keyExtractor={(item) => {
                //     return item._id;
                // }}
                renderItem={(itemData) => {
                    console.log(itemData.item);
                    return (
                        <HistoryListItem {...itemData.item} />
                    );
                }}
            />
        </View>
    );
}

export default HistoryListView;