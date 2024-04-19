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

    const playHistoryRecording = async (id) => {
        const { sound } = await Audio.Sound.createAsync({
            uri: recording[id].uri,
        });

        await sound.replayAsync();
        console.log('Playing recorded sound from ', recording[id]);
    }

    const deleteHistory = async () => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    "delete from recordings",

                    () => console.log("deleted recordings "),
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
                        "select * from recordings",
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
                    ({ id }) => {
                        return (
                            <HistoryItem key={id}
                                onPress={() => playHistoryRecording(id)}

                            />
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