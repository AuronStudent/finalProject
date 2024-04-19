import { Button, Text, View, ScrollView,Platform } from 'react-native';
import styles from "../Styles/styles";
import { Link, useLocalSearchParams } from 'expo-router';
import HistoryItem from "../components/historyItem";
import { useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';
import { Audio } from 'expo-av';
export default function Page() {
    const params = useLocalSearchParams();
    const { recordings } = params;
    const [recording, setRecording] = useState([]);
    const [db, setDb] = useState(null);



    const deleteHistory = async () => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    "delete from eightball",

                    () => console.log("deleted eightball "),
                    (_, error) => console.log(error)
                )
            },
            () => console.log('Deletion failed'),

        )
        setRecording([]);

    }

    useEffect(() => {

        let db = null;


        if (Platform.OS === 'web') {
            db = {
                transaction: () => {
                    return {
                        executeSql: () => { }
                    }
                }
            }
        } else {
            db = SQLite.openDatabase('recordings.db');
        }
        setDb(db);

        if (db) {
            db.transaction(
                (tx) => {
                    tx.executeSql(
                        "select * from eightball",
                        [],
                        (_, { rows }) => setRecording(rows._array),
                        (_, error) => console.log(error)
                    ),
                        (_, error) => console.log(error),
                        () => console.log("recordings was reloaded")
                }
            )
        }
        console.log(recordings);

    }, []);

    return (
        <View style={styles.container} >
            <ScrollView style={styles.scrollArea}>

                {recording.map(
                    ({ id, answer }) => {
                        return (
                            <Text style={{fontSize:30}} key={id}>{answer}</Text>
                        )
                    })
                }
            </ScrollView>
            <Button
                title="Delete History"
                onPress={deleteHistory} />
        </View>
        )
}