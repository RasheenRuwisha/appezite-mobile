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
    KeyboardAvoidingView,
    ImageBackground,
    Text,
    ActivityIndicator,
    TouchableHighlight
} from 'react-native';
import {connect} from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import {login} from '../../actions/authActions';
import {clearErrors} from '../../actions/errorActions';
import {STARTER_URL, LOGO_URL, THEME_COLOR} from '../../properties'
const {width, height} = Dimensions.get('window');
import {Button} from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
import styles from './LoginStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class Login extends React.Component {

    state = {
        modal: false,
        email: '',
        password: '',
        msg: null,
        registering:false,
    }

    componentDidUpdate(previousProps) {
        const {error, isAuthenticated} = this.props;
        if (error != previousProps.error) {
            if (error.id === 'LOGIN_FAIL') {
                this.setState({msg: error.msg.msg,registering:false})
            } else {
                this.setState({msg: null,registering:false})
            }
        }
    }

    componentDidUpdate(previousProps) {
        const {error, isAuthenticated} = this.props;
        if (error != previousProps.error) {
            if (error.id === 'LOGIN_FAIL') {
                this.setState({msg: error.msg.msg,registering:false})
            } else {
                this.setState({msg: null,registering:false})
            }
        }

        if (isAuthenticated) {
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Categories' })],
              });
              this.props.navigation.dispatch(resetAction);
        }
    }

    onEmailChange = (text) => {
        this.setState({email: text});
    };

    onPasswordChange = (text) => {
        this.setState({password: text});
    };

    loginUser() {
        const {email, password} = this.state
        const businessId = this.props.business.business.businessId

        const newUser = {
            businessId,
            email,
            password
        }
        this.setState({registering:true})
        this
            .props
            .login(newUser);
    }

    render() {
        const {navigate} = this.props.navigation;

        return (
            <ImageBackground
                style={[
                styles.containerMain, {
                    width: '100%',
                    height: '100%'
                }
            ]}
                resizeMode='cover'
                source={{
                uri: STARTER_URL
            }}>
                <View style={[styles.overlay]}>
                    <SafeAreaView>

                        <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={130} extraScrollHeight={130}>
                            <View style={[styles.container]}>
                                <Image
                                    style={{
                                    marginTop: width*0.2,
                                    width: width*0.4,
                                    height: width*0.4
                                }}
                                    source={{
                                    uri: LOGO_URL
                                }}/>

                                <View style={[styles.textInputContainer]}>
                            <Text style={[styles.errorText]}>{this.state.msg}</Text>

                                    <Text style={[styles.labelText]}>Email</Text>
                                    <TextInput
                                        style={[styles.textInput]}
                                        name='email'
                                        type='email'
                                        autoCapitalize='none'
                                        onChangeText={text => this.onEmailChange(text)}
                                        value={this.state.email}/>

                                    <Text style={[styles.labelText]}>Password</Text>

                                    <TextInput
                                        style={[styles.textInput]}
                                        name='password'
                                        autoCapitalize='none'
                                        secureTextEntry={true}
                                        onChangeText={text => this.onPasswordChange(text)}
                                        value={this.state.password}/>

                                    <View style={[styles.container]}>

                                    {this.state.registering ?
 <TouchableHighlight  style={[styles.loginButton]}>
 <ActivityIndicator style={{padding:10}} size="small" color="#fff" />
 </TouchableHighlight>
 :
 <Button
 onPress={() => this.loginUser()}
 buttonStyle={[styles.loginButton]}
 title="Login"/>
}


                                        <Text style={[styles.labelText]}>Don't have an account?
                                            <Text
                                                onPress={() => navigate('Register')}
                                                style={{
                                                color: THEME_COLOR,
                                                fontWeight: 'bold'
                                            }}>Register Now</Text>
                                        </Text>
                                        <Text style={[styles.labelText]}>Forgot Password?</Text>
                                        <View/>
                                    </View>
                                </View>
                            </View>

                        </KeyboardAwareScrollView>
                    </SafeAreaView>
                </View>
            </ImageBackground>
        )
    }
}

const mapStateToProps = state => ({isAuthenticated: state.auth.isAuthenticated, error: state.error, categories: state.categories, business: state.business, products: state.products});

export default connect(mapStateToProps, {login, clearErrors})(Login);