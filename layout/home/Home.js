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
import {login} from '../../actions/authActions';
import {clearErrors} from '../../actions/errorActions';
import {STARTER_URL, LOGO_URL, THEME_COLOR,BUSINESS_NAME} from '../../properties'
const {width, height} = Dimensions.get('window');
import {Button} from 'react-native-elements';

class Home extends React.Component {

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

<View style={[styles.welcomeContainer]}>

<Text style={[styles.welcomeText]}>Welcome to {BUSINESS_NAME}</Text>
<View/>
</View>

                                <View style={[styles.textInputContainer]}>
                                
                                    <View style={[styles.container]}>
                                        <Button  onPress={() => navigate('Register')} titleStyle={{fontSize:15 }} buttonStyle={[styles.loginButton]} title="CREATE AN ACCOUNT"/>
                                        <Button onPress={() => navigate('Categories')} type="outline" titleStyle={{ color: THEME_COLOR, fontSize:15 }} buttonStyle={[styles.guestButton]} title="CONTINUE AS GUEST"/>

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
        width: width*0.7,
    },
    guestButton: {
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: THEME_COLOR,
        height: 40,
        marginTop: 20,
        width: width*0.7,
        borderWidth:2
    },
    welcomeContainer: {
        marginTop:40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcomeText: {
        color: '#fff',
        fontSize:25
    },
})

const mapStateToProps = state => ({isAuthenticated: state.auth.isAuthenticated, error: state.error, categories: state.categories, business: state.business, products: state.products});

export default connect(mapStateToProps, {login, clearErrors})(Home);