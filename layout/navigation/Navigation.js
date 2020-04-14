import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator, DrawerNavigatorItems} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';

import Categories from '../categories/Categories';
import Products from '../products/Products';
import Product from '../products/Product';
import Login from '../login/Login';
import Register from '../register/Register';
import {AsyncStorage} from 'react-native';
import Home from '../home/Home';
import Loader from '../loader/Loader';
import Cart from '../cart/Cart';
import Checkout from '../checkout/Checkout';
import CheckoutSuccess from '../checkoutStatus/CheckoutSuccess';
import Orders from '../orders/Orders';
import React from 'react';
import {Icon} from 'react-native-elements'
import AboutUs from '../aboutus/AboutUs';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Animated,
    FlatList,
    Image,
    ImageBackground,
    Dimensions,
    Platform,
    TouchableOpacity
} from 'react-native';
import {STARTER_URL, BUSINESS_NAME, THEME_COLOR} from '../../properties'
import {connect} from 'react-redux';

const {width, height} = Dimensions.get('window');

class Hidden extends React.Component {
    render() {
        return null;
    }
}

const initNavigataion = createStackNavigator({
    Loader: {
        screen: Loader,
        navigationOptions: {
            header: null
        }
    },
    Categories: {
        screen: Categories,
        navigationOptions: ({navigation}) => ({
            headerLeft: () => (
                <TouchableOpacity
                    style={{
                    paddingLeft: 17
                }}
                    onPress={() => navigation.toggleDrawer()}>
                    <Icon name='bars' type='font-awesome' size={20} color={'white'}/>
                </TouchableOpacity>
            )
        })
    },
    Home: {
        screen: Home,
        navigationOptions: {
            header: null
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
    Register: {
        screen: Register,
        navigationOptions: {
            header: null
        }
    },
    Checkout: Checkout,
    Products: Products,
    Product: {
        screen: Product,
        navigationOptions: {
            title: 'Product'
        }
    },
    CheckoutSuccess: CheckoutSuccess
}, {

    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: THEME_COLOR
        },
        headerTintColor: '#fff'
    }
})

const mainNav = createStackNavigator({
    Loader: {
        screen: Loader,
        navigationOptions: {
            header: null
        }
    },
    Categories: {
        screen: Categories,
        navigationOptions: ({navigation}) => ({
            headerLeft: () => (
                <TouchableOpacity
                    style={{
                    paddingLeft: 17
                }}
                    onPress={() => navigation.toggleDrawer()}>
                    <Icon name='bars' type='font-awesome' size={20} color={'white'}/>
                </TouchableOpacity>
            )
        })
    },
    Home: {
        screen: Home,
        navigationOptions: {
            header: null
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
    Register: {
        screen: Register,
        navigationOptions: {
            header: null
        }
    },
    Checkout: Checkout,
    Products: Products,
    Product: {
        screen: Product,
        navigationOptions: {
            title: 'Product'
        }
    },
    CheckoutSuccess: CheckoutSuccess
}, {

    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: THEME_COLOR
        },
        headerTintColor: '#fff'
    }
})

const orderStack = createStackNavigator({
    Orders: {
        screen: Orders,
        navigationOptions: ({navigation}) => ({
            headerLeft: () => (
                <TouchableOpacity
                    style={{
                    paddingLeft: 17
                }}
                    onPress={() => navigation.toggleDrawer()}>
                    <Icon name='bars' type='font-awesome' size={20} color={'white'}/>
                </TouchableOpacity>
            )
        })
    }
}, {

    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: THEME_COLOR
        },
        headerTintColor: '#fff'
    }
})

const cartStack = createStackNavigator({
    Cart: {
        screen: Cart,
        navigationOptions: ({navigation}) => ({
            headerLeft: () => (
                <TouchableOpacity
                    style={{
                    paddingLeft: 17
                }}
                    onPress={() => navigation.toggleDrawer()}>
                    <Icon name='bars' type='font-awesome' size={20} color={'white'}/>
                </TouchableOpacity>
            )
        })
    }
}, {

    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: THEME_COLOR
        },
        headerTintColor: '#fff'
    }
})

const aboutStack = createStackNavigator({
    ContactUs: {
        screen: AboutUs,
        title: 'Contact Us',
        navigationOptions: ({navigation}) => ({
            title: 'Contact Us',
            headerLeft: () => (
                <TouchableOpacity
                    style={{
                    paddingLeft: 17
                }}
                    onPress={() => navigation.toggleDrawer()}>
                    <Icon name='bars' type='font-awesome' size={20} color={'white'}/>
                </TouchableOpacity>
            )
        })
    }
}, {

    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: THEME_COLOR
        },
        headerTintColor: '#fff'
    }
})

const CustomDrawer = props => {
    return (
        <View >
            <ImageBackground
                style={[
                styles.containerMain, {
                    width: '100%',
                    height: '40%'
                }
            ]}
                resizeMode='cover'
                source={{
                uri: STARTER_URL
            }}>
                <Text>Welcome to {BUSINESS_NAME}</Text>
            </ImageBackground>
            
            
            <DrawerNavigatorItems {...props}/>
        </View>
    );
};

const AppDrawerNavigation = createDrawerNavigator({
    Home: initNavigataion,
    Cart: cartStack,
    Order: orderStack,
    AboutUs: aboutStack
}, {contentComponent: CustomDrawer});

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
        width: width *0.7,
        borderRadius: 2,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        color: '#fff'
    },
    textInputContainer: {
        marginTop:  width *0.4
    },
    labelText: {
        marginTop: 20,
        color: '#fff'
    },
    loginButton: {
        backgroundColor: THEME_COLOR,
        height: 40,
        marginTop: 20,
        width:  width *0.7
    }
})


export default AppDrawerNavigation;