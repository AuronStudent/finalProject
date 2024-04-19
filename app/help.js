import { Button, Text, View } from 'react-native';
import styles from "../Styles/styles";
export default function Page() {


    return (
        <View style={styles.container} >

            <Text style={{ fontSize: 30 }}>How To Play</Text>

            <Text>{"\n"}</Text><Text>{"\n"}</Text>
            <Text style={{ fontSize: 20 }}>      Mind is wept is a game of luck, where you click on boxes and if it does not have a mine in it, you gain points. points will start at 100 and double everytime you click a box without a mine. </Text>
            <Text style={{ fontSize: 20 }}>      At any time you can choose to give up and take your current score, but that ends the game and you would have to play again to gain more points. </Text>
            <Text style={{ fontSize: 20 }}>      If you hit a mine at anytime your score will decrease to zero and you will lose the game. There is also a timer of 100 seconds that also reduces your score to zero if the timer runs out.</Text>
            <Text style={{ fontSize: 20 }}>      There are 3 difficulties, easy, medium, and hard. Each difficulty increases the amount of boxes on the playing field, which can increase your score but also has a better chance of a mine being clicked</Text>
            <Text>{"\n"}</Text>
            <Text style={{ fontSize: 20 }}>      Try to go for the highest score possible and good luck!</Text>
        </View>
    )
}