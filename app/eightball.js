import { StatusBar } from 'expo-status-bar';
import { TextInput, Text, View, Platform, Pressable } from 'react-native';
import styles from '../Styles/styles';
import TalkingFace from '../components/talkingFace.js';
import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import * as SQLite from 'expo-sqlite';

import { Link, useLocalSearchParams } from 'expo-router';

export default App = () => {

    const localUri = require('../assets/no.mp3');
    const localUri2 = require('../assets/yes.mp3');
    const localUri3 = require('../assets/maybe.mp3');
    const [myPBO, setMyPBO] = useState(null);
    const [textInput, setTextInput] = useState(null);
    const [answer, setAnswer] = useState("no");
    const [db, setDb] = useState(null);
    const [face, setFace] = useState(0);
    const [history, setHistory] = useState([]);
    const [updateRecordings, forceUpdate] = useState(0);

    const playSound = async () => {
        setFace(1);
        try {
            await myPBO.playAsync();
          
        } catch (e) {
            console.log(e)
        }
    }

    const loadSound = async (uri) => {
        if (myPBO) {
            unloadSound();
        }
        const { sound } = await Audio.Sound.createAsync(uri);
        setMyPBO(sound);
    }

    const unloadSound = async () => {
        await myPBO.unloadAsync();
    }

    const askButton = async () => {
        let var1 = Math.floor(Math.random() * 3);
        if (var1 === 0) {
            loadSound(localUri)
            setAnswer("No")
        } else if (var1 === 1) {
            loadSound(localUri2)
            setAnswer("Yes")
        } else {
            loadSound(localUri3)
            setAnswer("Maybe")
        }

    }

    useEffect(() => {
        if (myPBO) {
            playSound();
            addText();
        }
        
    },[myPBO])

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
                "CREATE TABLE if not exists eightball (id integer primary key not null, answer text);"
            ),
                (_, error) => console.log(error),
                () => console.log("Table exists or was created")

        })
        return () => db ? db.closeasync : undefined;
        return recording
            ? recording.stopAndUnloadAsync()
            : undefined;
    }, []);

    const addText = async () => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    "insert into eightball (answer) values (?)",
                    [textInput + " " +answer],
                    () => console.log("added ", textInput + answer),
                    (_, error) => console.log(error)
                )
            },
            () => console.log('addText() failed'),
            forceUpdate(f => f + 1)
        )
    }

    //when db change do this
    useEffect(() => {
        if (db) {
            db.transaction(
                (tx) => {
                    tx.executeSql(
                        "select * from eightball",
                        [],
                        (_, { rows }) => setHistory(rows._array),
                        (_, error) => console.log(error)
                    ),
                        (_, error) => console.log(error),
                        () => console.log("eightball was reloaded")
                }
            )
        }
        
    }, [db, updateRecordings]);

    return (
        <View style={styles.container}>
            <TalkingFace changeFace={face} />
            <TextInput
                style={styles.input}
                onChangeText={setTextInput}
                value={textInput}
                placeholder="Ask a question" />

            <Text>{'\n'}</Text>

                <Pressable
                style={styles.button}
                onPress={askButton }
                >
                    <Text style={{ fontSize: 30 }}>Ask Question</Text>
                </Pressable>
     


            <Text>{'\n' }</Text>
            <Link href={{
                pathname: "/history2",
                
            } }asChild
            

            >
                <Pressable
                    style={styles.button }
                    
                >
                    <Text style={{ fontSize: 30 }}>History</Text>
                </Pressable>
            </Link>

            <Text>{'\n'}</Text>
            <Link href={{
                pathname: "/game",
                
            }} asChild


            >
                <Pressable
                    style={styles.button}

                >
                    <Text style={{ fontSize: 30 }}>Talking Emoji</Text>
                </Pressable>
            </Link>
           

            

        </View>
    );
}




