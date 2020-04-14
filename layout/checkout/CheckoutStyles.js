
import {
    StyleSheet,
    Dimensions
} from 'react-native';
const {width, height} = Dimensions.get('window');
import {THEME_COLOR} from '../../properties';




const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    column: {
        flexDirection: 'column'
    },
    row: {
        flexDirection: 'row'
    },
    overlay: {
        height: height,
        width: width,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    container: {
        width:width*0.9,
    },
    textInput: {
        borderRadius: 2,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        color: '#000'
    },
    textInputDate: {
        borderRadius: 2,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        color: '#000',
        paddingVertical: 11,
    },
    textInputContainer: {
        
    },
    labelText: {
        marginTop: 20,
        color: '#000'
    },
    errorLabel: {
        marginTop: 20,
        color: '#FF4B55'
    },
    errorInput:{
        borderRadius: 2,
        height: 40,
        borderColor: '#FF4B55',
        borderWidth: 1,
        color: '#000'
    },
    errorInputDate: {
        borderRadius: 2,
        height: 40,
        borderColor: '#FF4B55',
        borderWidth: 1,
        color: '#000',
        paddingVertical: 11,
    },
    loginButton: {
        backgroundColor: THEME_COLOR,
        height: 40,
        marginTop: 20,
        width: width*0.7
    },
    bottomButton: {
        backgroundColor: THEME_COLOR,
        height: 60,
    },
    headerNav:{
        width: width,
        height: 40,
        backgroundColor: "#b7b6b6"
    },
    headerNavText:{
        width: width * 0.5,
        justifyContent: "center",
        alignItems: "center"
    },
    headerActive:{
        borderBottomColor: THEME_COLOR,
        borderBottomWidth:3
    },
    summaryContainer:{
        width: width
    },
    summaryText:{
        width: width * 0.5,
        paddingTop:10,
        paddingBottom:10,
    },
    summaryTextRight:{
        textAlign: 'left',
        paddingLeft:20
    },
    summaryTextLeft:{
        textAlign: 'right',
        paddingRight:20
    },
    totalText:{
        borderBottomWidth:1,
        borderBottomColor:"#000"
    }
})



module.exports = styles;