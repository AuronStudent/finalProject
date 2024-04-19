import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D9D9D9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        borderWidth: 2,
        borderColor: 'black',
        borderStyle: 'solid',
        backgroundColor: 'white',
        padding: 10,
        margin: 4,
    },
    itemText: {
        fontSize: 24,
    },
    scrollArea: {
        backgroundColor: '#D9D9D9',
        flex: 1,
        paddingTop: 50,
        width: '100%',

    },
    button: {
        backgroundColor: 'lightblue',
        borderRadius: 20,
        border: 20,
        borderWidth: 2,
        padding: 5,
    },
});

export default styles;