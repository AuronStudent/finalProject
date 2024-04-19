//splash screen
import { useState } from 'react';
import { Button, Text, View, StyleSheet, Pressable } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import styles from "../Styles/styles";
export default function Page() {


    return (
        <View style={styles.container} >
            <Text style={{ fontSize: 40 }} >Talking Emoji</Text>
            <Text>{"\n "}</Text>

            <Text>{"\n "}</Text>
            <Link href={{
                pathname: "/game",
            }} asChild>
                <Pressable style={styles.button}>
                    <Text style={{ fontSize: 30 }}>Play Game</Text>
                </Pressable>
            </Link>

            <Text>{"\n"}</Text>
            <Link href={{
                pathname: "/help"
            }} asChild>
                <Pressable style={styles.button}>
                    <Text style={{ fontSize: 30 }}>Instructions</Text>
                </Pressable>
            </Link>



        </View>
    )
}

