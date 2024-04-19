import { useEffect, useState } from 'react';
import { Pressable, Text } from 'react-native';
import styles from '../Styles/styles';

export default HistoryItem = ({ itemId, onPress }) => {

    return (
        <Pressable
            style={[styles.item,]}
            
            onPress={onPress}
            key={itemId}
        >
            <Text style={[styles.itemText,]}>Recording</Text>
        </Pressable>
    )
}