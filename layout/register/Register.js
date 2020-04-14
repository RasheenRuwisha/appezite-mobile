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
import {register} from '../../actions/authActions';
import {clearErrors} from '../../actions/errorActions';
import {STARTER_URL, LOGO_URL, THEME_COLOR, BUSINESS_ID} from '../../properties'
const {width, height} = Dimensions.get('window');
import {Button} from 'react-native-elements';
import {StackActions, NavigationActions} from 'react-navigation';
import ButtonSpinner from 'react-native-button-spinner';
import styles from './RegisterStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class Register extends React.Component {

    state = {
        modal: false,
        email: '',
        password: '',
        name: '',
        phone:'',
        msg: null,
        registering: false
    }

    componentDidUpdate(previousProps) {
        const {error, isAuthenticated} = this.props;
        if (error != previousProps.error) {
            if (error.id === 'REGISTER_FAIL') {
                this.setState({msg: error.msg.msg, registering:false})
            } else {
                this.setState({msg: null})
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

    onPhoneChange = (text) => {
        this.setState({phone: text});
    };


    onPasswordChange = (text) => {
        this.setState({password: text});
    };

    onNameChange = (text) => {
        this.setState({name: text});
    };

    registerUser() {
        const {email, password, name, phone} = this.state
        const businessId = BUSINESS_ID

        const newUser = {
            businessId,
            email,
            password,
            name,
            phone
        }
        this.setState({registering:true})


        this
            .props
            .register(newUser);
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
                                    marginTop: width *0.2,
                                    width: width *0.4,
                                    height: width *0.4
                                }}
                                    source={{
                                    uri: LOGO_URL
                                }}/>

                                <View style={[styles.textInputContainer]}>

                            <Text style={[styles.errorText]}>{this.state.msg}</Text>
                                    <Text style={[styles.labelText]}>Name</Text>
                                    <TextInput
                                        style={[styles.textInput]}
                                        name='name'
                                        type='text'
                                        onChangeText={text => this.onNameChange(text)}
                                        value={this.state.name}/>

                                    <Text style={[styles.labelText]}>Email</Text>
                                    <TextInput
                                        style={[styles.textInput]}
                                        name='email'
                                        type='email'
                                        autoCapitalize='none'
                                        onChangeText={text => this.onEmailChange(text)}
                                        value={this.state.email}/>

<Text style={[styles.labelText]}>Phone</Text>
                                    <TextInput
                                        style={[styles.textInput]}
                                        name='phone'
                                        type='text'
                                        autoCapitalize='none'
                                        onChangeText={text => this.onPhoneChange(text)}
                                        value={this.state.phone}/>

                                    <Text style={[styles.labelText]}>Password</Text>

                                    <TextInput
                                        style={[styles.textInput]}
                                        name='password'
                                        secureTextEntry={true}
                                        autoCapitalize='none'
                                        onChangeText={text => this.onPasswordChange(text)}
                                        value={this.state.password}/>

                                    <View style={[styles.container]}>

{this.state.registering ?
 <TouchableHighlight  style={[styles.loginButton]}>
 <ActivityIndicator style={{padding:10}} size="small" color="#fff" />
 </TouchableHighlight>
 :
 <Button
 onPress={() => this.registerUser()}
 buttonStyle={[styles.loginButton]}
 title="Register"/>
}
                                     

                                       



                                        <Text style={[styles.labelText]}>Already have an account?
                                            <Text
                                                onPress={() => navigate('Login')}
                                                style={{
                                                color: THEME_COLOR,
                                                fontWeight: 'bold'
                                            }}>Login</Text>
                                        </Text>
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

export default connect(mapStateToProps, {register, clearErrors})(Register);