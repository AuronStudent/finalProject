import { Button, Text, View } from 'react-native';
import styles from "../Styles/styles";
export default function Page() {


    return (
        <View style={styles.container} >

            <Text style={{ fontSize: 30 }}>Instructions</Text>

            <Text>{"\n"}</Text><Text>{"\n"}</Text>
            <Text style={{ fontSize: 20 }}>Talking Emoji is a simple game about an emoji that will record your voice and repeat it back to you.</Text>
            <Text>{"\n"}</Text><Text>{"\n"}</Text>
            <Text style={{ fontSize: 20 }}>To play, simpley press the start recording button to record your voice and he will listen to you, then you can stop recording and he will play it back to you.</Text>
            <Text>{"\n"}</Text><Text>{"\n"}</Text>
            <Text style={{ fontSize: 20 }}>There is also a history button so you can go back and listen to everything that has been recorded.</Text>
            <Text>{"\n"}</Text><Text>{"\n"}</Text>
            <Text style={{ fontSize: 20 }}>In the 8 ball section, you can ask a question to the almighty emoji and he will tell you yes, no, or maybe.</Text>

        </View>
    )
}