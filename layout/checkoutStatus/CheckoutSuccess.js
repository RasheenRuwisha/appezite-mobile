/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
    SafeAreaView,
    TextInput,
    View,
    Image,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';
import {connect} from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import {login} from '../../actions/authActions';
import {clearErrors} from '../../actions/errorActions';
import {STARTER_URL, LOGO_URL, THEME_COLOR, BUSINESS_NAME} from '../../properties'
const {width, height} = Dimensions.get('window');
import {Button} from 'react-native-elements';

class CheckoutSuccess extends React.Component {

    state = {
        modal: false,
        email: '',
        password: '',
        msg: null
    }

    componentDidUpdate(previousProps) {
        const {error, isAuthenticated} = this.props;
        if (error != previousProps.error) {
            if (error.id === 'LOGIN_FAIL') {
                this.setState({msg: error.msg.msg})
            } else {
                this.setState({msg: null})
            }
        }
    }

    onEmailChange = (text) => {
        this.setState({email: text});
    };

    onPasswordChange = (text) => {
        this.setState({password: text});
    };

    onNameChange = (text) => {
        this.setState({name: text});
    };

    renderOrders(orders) {
        let userOrder = [];

        if (orders.length > 0) {
            for (let i = 0; i < orders.length; i++) {
                let orderProducts = [];
                    orderProducts.push(
                        <Text>{orders[i].name}
                            - {orders[i].variant === null
                                ? null
                                : orders[i].variant}</Text>
                    )
                    for (let x = 0; x < orders[i].addons.length; x++) {
                        orderProducts.push(
                            <Text>Addon : ({orders[i].addons[x].child})</Text>
                        )
                    }
                userOrder.push(
                    <TouchableOpacity onPress={() => this.openProductDetails(orderProducts)}>
                        <Text>{orders[i].purchaseId}
                            - {orders[i].status}</Text>
                            {orderProducts}
                    </TouchableOpacity>
                )
            }
            return userOrder;
        } else {
            return <Text>No previous order</Text>
        }
    }


    render() {
        const {navigate} = this.props.navigation;

        return (
            <View>
                <View style={[styles.overlay]}>
                    <SafeAreaView>

                        <View>
                            <View style={[styles.container]}>

                                <View style={[styles.welcomeContainer]}>

                                    <Text style={[styles.successText]}>Your order has been placed successfully!</Text>
                                    <Text style={[styles.successText]}>Provide the order id below to collect your order.</Text>
                                    <Text style={[styles.welcomeText]}>{this.props.cart.lastOrder.purchaseId}</Text>
                                    {this.renderOrders(this.props.cart.lastOrder.products)}
                                    <View/>
                                </View>

                            </View>

                        </View>
                    </SafeAreaView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    overlay: {
        height: height,
        width: width,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    container: {
        margin:20,
        justifyContent: 'center',
        alignItems: 'flex-start'
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
        marginTop: width*0.5
    },
    labelText: {
        marginTop: 20,
        color: '#fff'
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
        alignItems: 'flex-start'
    },
    welcomeText: {
        color: '#fff',
        fontSize: 23,
        marginTop:10
    },
   successText: {
        color: '#fff',
        fontSize: 14,
        marginTop:10
    }
})

const mapStateToProps = state => ({isAuthenticated: state.auth.isAuthenticated, error: state.error, cart: state.cart, business: state.business, products: state.products});

export default connect(mapStateToProps, {login, clearErrors})(CheckoutSuccess);