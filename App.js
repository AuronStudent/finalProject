import { StatusBar } from 'expo-status-bar';
import { Button, Text, View, Platform, ScrollView } from 'react-native';
import styles from './Styles/styles';
import TalkingFace from './components/talkingFace.js';
import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import * as SQLite from 'expo-sqlite';
import HistoryItem from "./components/historyItem";

export default App = () => {
    const [recording, setRecording] = useState(null);
    const [recordingUri, setRecordingUri] = useState(null);
    const [playback, setPlayback] = useState(null);
    const [permissionsResponse, requestPermission] = Audio.usePermissions();
    const [face, setFace] = useState(0);
    const [db, setDb] = useState(null);
    const [recordings, setRecordings] = useState([]);
    const [updateRecordings, forceUpdate] = useState(0);

    const startRecording = async () => {
        try {
            // request permission to use the mic
            if (permissionsResponse.status !== 'granted') {
                console.log('Requesting permissions.');
                await requestPermission();
            }
            console.log('Permission is ', permissionsResponse.status);

            // set some device specific values
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            console.log('Starting recording...');
            const { recording } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY
            );
            setRecording(recording);
            setFace(2);
            console.log('...recording');
        }
        catch (errorEvent) {
            console.error('Failed to startRecording(): ', errorEvent);
        }
    }

    const stopRecording = async () => {
        try {
            // stop the actual recording
            await recording.stopAndUnloadAsync();

            // save the recorded object location
            const uri = recording.getURI();
            setRecordingUri(uri);

            // forget the recording object
            setRecording(undefined);

            // log the result
            console.log('Recording stopped and stored at ', uri);

            //setFace(0)
            
        }
        catch (errorEvent) {
            console.error('Failed to stopRecording(): ', errorEvent);
        }
    }

    const playRecording = async () => {
        setFace(1)
        const { sound } = await Audio.Sound.createAsync({
            uri: recordingUri,
        });
        setPlayback(sound);
        await sound.replayAsync();
        console.log('Playing recorded sound from ', recordingUri);
        
    }

    const addRecording = () => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    "insert into recordings (uri) values (?)",
                    [recordingUri],
                    () => console.log("added ", recordingUri),
                    (_, error) => console.log(error)
                )
            },
            () => console.log('addRecording() failed'),
            forceUpdate(f => f + 1)
        )
    }

    const playHistoryRecording = async (id) => {
        const { sound } = await Audio.Sound.createAsync({
            uri: recordings[id].uri,
        });

        await sound.replayAsync();
        console.log('Playing recorded sound from ', recordings[id]);
    }
    //delete all from recordings table
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
        setRecordings([]);
       
    }

    useEffect(() => {
        if (recordingUri) { 
            setFace(1)
            addRecording();
            playRecording();
        }
        
    }, [recordingUri])

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

        //create table if it doesnt exist
        db.transaction((tx) => {

            tx.executeSql(
                "CREATE TABLE if not exists recordings (id integer primary key not null, uri blob);"
            ),
                (_, error) => console.log(error),
                () => console.log("Table exists or was created")

        })
        return () => db ? db.closeasync : undefined;
        return recording
            ? recording.stopAndUnloadAsync()
            : undefined;
    }, []);

    //when db change do this
    useEffect(() => {
        if (db) {
            db.transaction(
                (tx) => {
                    tx.executeSql(
                        "select * from recordings",
                        [],
                        (_, { rows }) => setRecordings(rows._array),
                        (_, error) => console.log(error)
                    ),
                        (_, error) => console.log(error),
                        () => console.log("recordings was reloaded")
                }
            )
        }
        console.log(recordings);
    }, [db, updateRecordings]);

    return (
        <View style={styles.container}>
            <TalkingFace changeFace={face } />
            <Button
                title={recording ? 'Stop Recording' : 'Start Recording'}
                onPress={recording ? stopRecording : startRecording}
            />
            {recordingUri &&
                <Button
                    title="Play the last sound"
                    onPress={playRecording}
                />}
            <Button
                title="History"
                onPress={() => { }} />

            <ScrollView style={styles.scrollArea}>
               
                {recordings.map(
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
                onPress={deleteHistory } />
        </View>
    );
}




