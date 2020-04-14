

import {
    StyleSheet,
    Dimensions
} from 'react-native';
const {width, height} = Dimensions.get('window');
import {THEME_COLOR} from '../../properties';


const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    column: {
        flexDirection: 'column'
    },
    row: {
        flexDirection: 'row'
    },
    padding10: {
        padding: 10
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        width: width *0.9,
        margin: 10,
        backgroundColor:'white'
    },
    cardButton: {
        width: width *0.9,
        height: 30,
        backgroundColor: THEME_COLOR,
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
        color: 'white'
    },
    cardFont: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
    headerFont: {
        color: THEME_COLOR,
        fontWeight: 'bold',
        fontSize: 17,
        paddingBottom: 10
    },
    noteContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        paddingTop:10,
        borderTopWidth: 1,
        borderColor:'gray',
        width: width *0.8
    }
})

module.exports = styles;
