

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
    addToCart: {
        height: 60,
        width: 60,
        borderRadius: 100,
        justifyContent:'center',
        textAlign: "center",
        backgroundColor: THEME_COLOR,
        position: "absolute",
        bottom: -25,
        zIndex: 999,
        right: 10
    },
    productName: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        width: width,
        padding: 10,
        position: "absolute",
        bottom: 0,
        color: 'white'
    },
    modal: {
        zIndex: 9999,
        width: width *0.8,
        height: width *1.4
    },
    modalProductName: {
        justifyContent: 'space-between',
        position: "absolute",
        top: -20,
        width: width *0.8,
        height: 40,
        zIndex: 999,
        backgroundColor: THEME_COLOR
    },
    modalAddtoCart: {
        justifyContent: 'space-between',
        position: "absolute",
        bottom: 0,
        width: width *0.8,
        height: 40,
        backgroundColor: THEME_COLOR
    },
    buttonText: {
        width: width *0.8,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        textAlign: "center",
        height: 40,
        backgroundColor: THEME_COLOR,
        color:'#fff',
        zIndex: 9999
    },
    quantityContainer: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        bottom: 70,
        position: 'absolute',
        width: width *0.8,
        height: 30,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    subTotalContainer: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        bottom: 40,
        position: 'absolute',
        width: width *0.8,
        height: 30,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    itemPriceContainer: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        bottom: 100,
        position: 'absolute',
        width: width *0.8,
        height: 30,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    counterContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    counter: {
        height: 20,
        width: 20,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 20,
        display: "flex",
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        textAlign: "center",
        backgroundColor: THEME_COLOR,
        color:'#fff',
    },
    addonButton: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        textAlign: "center",
        height: 40,
        backgroundColor: THEME_COLOR,
        color:'#fff',
        zIndex: 9999,
        width: width *0.17,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: THEME_COLOR,
        marginTop:10,
        color:'white',
        marginBottom:5
    },
    optionContainer: {
        marginTop: 20,
        borderWidth: 1,
        borderBottomColor: '#e4e6e8',
        borderTopColor: 'white',
        borderRightColor: 'white',
        borderLeftColor: 'white'
    },
    selectedVariants: {
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
    errorMsg:{
        color: '#ff647c',
        padding:10
    }
})



module.exports = styles;
