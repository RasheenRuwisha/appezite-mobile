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
import {STARTER_URL, LOGO_URL, THEME_COLOR} from '../../properties'
const {width, height} = Dimensions.get('window');
import {AsyncStorage} from 'react-native';
import {Button} from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
import {addTokenToState,loadUser} from '../../actions/authActions';
class Loader extends React.Component {

    state = {
        modal: false,
        email: '',
        password: '',
        msg: null
    }

    componentDidUpdate(previousProps) {

    }

    getValue = async () => {
      try {
          await AsyncStorage.getItem('token')
          .then((value) =>{
            if(value != null){
                this.props.addTokenToState(value)
                this
                .props
                .loadUser();
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Categories' })],
                  });
                  this.props.navigation.dispatch(resetAction);
            }else{
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Login' })],
                  });
                  this.props.navigation.dispatch(resetAction);

            }
          })
      } catch (error) {
          console.log(error.message);
          return null;

      }
    };


    render() {
        if(this.props.categories.loading == false){
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
                                    marginTop: width*0.2,
                                    width: width*0.4,
                                    height: width*0.4
                                }}
                                    source={{
                                    uri: LOGO_URL
                                }}/>

                                <View style={[styles.textInputContainer]}>
                                
                                    <View style={[styles.container]}>
                                     
                                        <Text style={[styles.labelText]}>Loading Business Details...</Text>
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
        marginTop: width*0.4
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

export default connect(mapStateToProps, {login, clearErrors,addTokenToState,loadUser})(Loader);