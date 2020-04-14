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
    ActivityIndicator,
    Text
} from 'react-native';
import {connect} from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import {login} from '../../actions/authActions';
import {clearErrors} from '../../actions/errorActions';
import {STARTER_URL, LOGO_URL, THEME_COLOR, BASE_URL} from '../../properties'
const {width, height} = Dimensions.get('window');
import {AsyncStorage} from 'react-native';
import {Button} from 'react-native-elements';
import {StackActions, NavigationActions} from 'react-navigation';
import {addTokenToState, loadUser} from '../../actions/authActions';
import styles from './LoaderStyles';
import RemotePushController from './../../services/RemotePushController'

class Loader extends React.Component {

    state = {
        modal: false,
        email: '',
        password: '',
        msg: null
    }

    componentDidUpdate(previousProps) {}

    getValue = async() => {
        try {
            await AsyncStorage
                .getItem('token')
                .then((value) => {
                    if (value != null) {
                        this
                            .props
                            .addTokenToState(value)
                        this
                            .props
                            .loadUser();
                        const resetAction = StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({routeName: 'Categories'})]
                        });
                        this
                            .props
                            .navigation
                            .dispatch(resetAction);
                    } else {
                        const resetAction = StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({routeName: 'Login'})]
                        });
                        this
                            .props
                            .navigation
                            .dispatch(resetAction);

                    }
                })
        } catch (error) {
            console.log(error.message);
            return null;

        }
    };

    render() {
        if (this.props.categories.loading == false) {
            this.getValue()
        }
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
                                    marginTop: width *0.2,
                                    width: width *0.4,
                                    height: width *0.4
                                }}
                                    source={{
                                    uri: LOGO_URL
                                }}/>

                                <View style={[styles.textInputContainer]}>

                                    <View style={[styles.container]}>

                                        <ActivityIndicator
                                            style={{
                                            padding: 10,
                                            marginTop:40
                                        }}
                                            size="large"
                                            color="#fff"/>

                                        <Text style={[styles.labelText]}>Loading Business Details...</Text>
                                        <View/>

                                    </View>
                                </View>
                            </View>

                        </View>
                        <RemotePushController/>
                    </SafeAreaView>
                </View>
            </ImageBackground>
        )
    }
}

const mapStateToProps = state => ({isAuthenticated: state.auth.isAuthenticated, error: state.error, categories: state.categories, business: state.business, products: state.products});

export default connect(mapStateToProps, {login, clearErrors, addTokenToState, loadUser})(Loader);