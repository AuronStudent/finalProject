import { Stack } from 'expo-router';
import { Button, Text, Image } from 'react-native';
import { Link } from 'expo-router';

export default function Layout() {
    return (
        <Stack screenOptions={{
            headerTitle: "Talking Emoji",
            headerStyle: { backgroundColor: 'lightblue', },
            headerTintColor: 'black',
            headerBackVisible: false,
        }}>
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="game"
                options={{
                    
                    headerShown: false,
                    headerTitle: "",
                    
                }}
            />
            <Stack.Screen
                name="help"
                options={{
                    headerTitle: "How to play",
                    headerShown: true,
                    presentation: 'modal',
                }}
            />
            <Stack.Screen
                name="history"
                options={{
                    headerTitle: "History",
                    headerShown: true,
                    presentation: 'modal',
                }}
            />
        </Stack>
    );
}