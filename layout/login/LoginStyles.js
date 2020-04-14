
import {
    StyleSheet,
    Dimensions
} from 'react-native';
const {width, height} = Dimensions.get('window');
import {THEME_COLOR} from '../../properties';



const styles = StyleSheet.create({
    overlay: {
        height: height,
        width: width,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        width: width*0.7,
        borderRadius: 2,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        color: '#fff'
    },
    textInputContainer: {
        marginTop: width*0.4
    },
    labelText: {
        marginTop: 20,
        color: '#fff'
    },
    errorText: {
        marginTop: 20,
        color: '#ff647c',
    },
    loginButton: {
        backgroundColor: THEME_COLOR,
        height: 40,
        marginTop: 20,
        width: width*0.7
    }
})

module.exports = styles;