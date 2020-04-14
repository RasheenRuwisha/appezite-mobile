
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
        margin:20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        width: width*0.7,
        borderRadius: 2,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        color: '#000'
    },
    textInputContainer: {
        marginTop: width*0.5
    },
    labelText: {
        marginTop: 20,
        color: '#000'
    },
    loginButton: {
        backgroundColor: THEME_COLOR,
        height: 40,
        marginTop: 20,
        width: width*0.7
    },
    guestButton: {
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: THEME_COLOR,
        height: 40,
        marginTop: 20,
        width: width*0.7,
        borderWidth: 2
    },
    welcomeContainer: {
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcomeText: {
        color: '#000',
        fontSize: 23,
        marginTop:10
    },
   successText: {
        color: '#000',
        fontSize: 14,
        marginTop:10
    },
    note:{
        marginTop:200,
        marginBottom:50,
        borderColor: THEME_COLOR,
        borderWidth:2,
        padding: 10,
        color: THEME_COLOR,
        justifyContent:'center',
        alignItems:'center',
        
    },
    noteText:{
        marginTop:10,
    }
})

module.exports = styles;