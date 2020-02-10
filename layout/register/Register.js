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
    ImageBackground,
    Text
} from 'react-native';
import {connect} from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import {register} from '../../actions/authActions';
import {clearErrors} from '../../actions/errorActions';
import {STARTER_URL, LOGO_URL, THEME_COLOR, BUSINESS_ID} from '../../properties'
const {width, height} = Dimensions.get('window');
import {Button} from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';

class Register extends React.Component {

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

    onNameChange = (text) => {
        this.setState({name: text});
    };

    registerUser(){
        const { email, password, name } = this.state
        const businessId = BUSINESS_ID
    
        const newUser = {
            businessId,
            email,
            name,
            password
        }
        this.props.register(newUser);
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

                        <View>
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
                                        onChangeText={text => this.onEmailChange(text)}
                                        value={this.state.email}/>

                                    <Text style={[styles.labelText]}>Password</Text>

                                    <TextInput
                                        style={[styles.textInput]}
                                        name='password'
                                        secureTextEntry={true}
                                        onChangeText={text => this.onPasswordChange(text)}
                                        value={this.state.password}/>

                                    <View style={[styles.container]}>
                                        <Button onPress={this.registerUser()} buttonStyle={[styles.loginButton]} title="Register"/>

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

                        </View>
                    </SafeAreaView>
                </View>
            </ImageBackground>
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
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        width: width*0.7,
        borderRadius: 2,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        color:'#fff'
    },
    textInputContainer: {
        marginTop: width*0.3
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
    }
})

const mapStateToProps = state => ({isAuthenticated: state.auth.isAuthenticated, error: state.error, categories: state.categories, business: state.business, products: state.products});

export default connect(mapStateToProps, {register, clearErrors})(Register);