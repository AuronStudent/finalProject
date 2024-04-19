import { useEffect, useState } from 'react';
import { Pressable, Text, Image, View } from 'react-native';
import styles from '../Styles/styles';



export default TalkingFace = (props) => {

    const standerd = require('../assets/faceStanderd.png')
    const speaking = require('../assets/faceSpeaking.png')
    const listening = require('../assets/faceListen.png')

    faces = [
        standerd, speaking, listening
    ]

    
    return (
        <View>
            <Image
                style={{ height: 200, width: 200, resizeMode: 'center' }}
                source={faces[props.changeFace]} />
        </View>
    );
}