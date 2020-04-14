

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
    namePriceContainer: {
        marginLeft: 5,
        marginRight: 5,
        justifyContent: 'space-between',
        alignContent: 'space-between'
    },
    nameText: {
        color: '#000',
        fontSize: 15
    },
    variantText: {
        color: 'gray',
        fontSize: 13,
        marginLeft: 5
    },
    iconStyles: {
        fontSize: 10
    },
    checkoutButton: {
        justifyContent: 'space-between',
        position: "absolute",
        bottom: 0,
        width: width,
        height: 50,
        backgroundColor: THEME_COLOR
    }
})


module.exports = styles;
