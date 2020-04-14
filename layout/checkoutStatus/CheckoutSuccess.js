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
import {Button, Icon} from 'react-native-elements';

import {StackActions, NavigationActions} from 'react-navigation';
import styles from './CheckoutSuccessStyles';

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

    renderHome(){
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'Categories'})]
        });
        this
            .props
            .navigation
            .dispatch(resetAction);
    }

    render() {
        const {navigate} = this.props.navigation;

        return (
            <View>
                <View>
                    <SafeAreaView>

                        <View>
                            <View style={[styles.container]}>

                                <View style={[styles.welcomeContainer]}>

                                <Text style={[styles.welcomeText]}>{this.props.cart.lastOrder.purchaseId}</Text>
                                    <Text style={[styles.successText]}>Your order has been placed successfully!</Text>
                                    <Text style={[styles.successText]}>Provide the order id above to collect your order.</Text>
                                    
                                   
                                    <View/>
                                </View>

                                <View style={styles.note}>
                                <Icon
                                                                                size={35}
                                                                                name='info'
                                                                                type='material'
                                                                                color={THEME_COLOR}/>
                               
                                <Text style={styles.noteText}>
                                    Please check your email for order confirmation by {this.props.business.business.name}
                                </Text>
                                </View>
                                <Button onPress={() => this.renderHome()} type="outline" titleStyle={{ color: THEME_COLOR, fontSize:15 }} buttonStyle={[styles.guestButton]} title="Home"/>
                            </View>

                        </View>
                    </SafeAreaView>
                </View>
            </View>
        )
    }
}


const mapStateToProps = state => ({isAuthenticated: state.auth.isAuthenticated, error: state.error, cart: state.cart, business: state.business, products: state.products});

export default connect(mapStateToProps, {login, clearErrors})(CheckoutSuccess);