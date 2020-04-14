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
import * as theme from '../../themes';
import {connect} from 'react-redux';
import {getBusiness} from '../../actions/businessActions';
import {getCategories} from '../../actions/categoryActions';
import {Card, ListItem, Button, Icon} from 'react-native-elements'
import {FloatingAction} from "react-native-floating-action";
import {removeCart, updateCart} from '../../actions/cartActions';
import {THEME_COLOR, IP_ADR} from '../../properties';
import styles from './CartStyles'

const {width, height} = Dimensions.get('window');

class Cart extends React.Component {

    // static navigationOptions = ({navigation}) => {     return {header: (    <View
    // style={[styles.flex, styles.row, styles.header]}></View>         ),
    // headerTransparent: true} }

    state = {
        business: undefined,
        categories: undefined
    }



    static navigationOptions = ({ navigation }) => {
        return {
            headeLeft: (
                <TouchableOpacity
                style={{
                    paddingLeft:17
                }}
                onPress={() => {
                  this.props.navigation.toggleDrawer();
                }}
              >
                <Icon
                  name='bars'
                  type='font-awesome'
                  size={20}
                  color={'white'}
                />
              </TouchableOpacity>
            ),
        }
    }


    removeCart = (index) => {
        this
            .props
            .updateCart();
        this
            .props
            .removeCart(index)
    }

    calculateTotal = () => {
        var price = 0;

        for (var i = 0; i < this.props.cart.cart.products.length; i++) {
            (price) = parseFloat(price) + parseFloat(this.props.cart.cart.products[i].price);
        }
        return (
            <Text>{price}</Text>
        )
    }

    calculateTotalItems = () => {
        var totalItems = 0;

        for (var i = 0; i < this.props.cart.cart.products.length; i++) {
            totalItems = parseFloat(totalItems) + parseFloat(this.props.cart.cart.products[i].quantity)
        }
        return (
            <Text>{totalItems}</Text>
        )
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <SafeAreaView style={{
                height: height
            }}>
                {this.props.cart.cart == null
                    ? <View >
                            <Text>Loading</Text>
                        </View>
                    : <View style={{
                        height: height
                    }}>
                        {this.props.cart.cart.products.length > 0
                            ? <View
                                    style={{
                                    flex: 0.9
                                }}>
                                    <ScrollView >
                                        <View >
                                            {this
                                                .props
                                                .cart
                                                .cart
                                                .products
                                                .map((cart, i) => {
                                                    cart.image =  cart.image.replace('api.appezite.com',IP_ADR);

                                                    return (
                                                        <TouchableOpacity>
                                                            <View
                                                                style={{
                                                                padding: 10,
                                                                borderBottomWidth: 1
                                                            }}>

                                                                <View style={[styles.flex, styles.row]}>
                                                                    <Image
                                                                        style={{
                                                                        width: width*0.15,
                                                                        height: width*0.15
                                                                    }}
                                                                        source={{
                                                                        uri: cart.image
                                                                    }}/>

                                                                    <View style={[styles.flex, styles.column]}>

                                                                        <View style={[styles.flex, styles.row, styles.namePriceContainer]}>
                                                                            <Text style={[styles.nameText]}>{cart.name}</Text>
                                                                            <Text>{cart.price}</Text>
                                                                        </View>

                                                                        <Text style={[styles.variantText]}>{cart.variant} {cart.addons.length > 0
                                                                                ? 'with ' + cart.addons.length + ' addons'
                                                                                : null}</Text>
                                                                        <View style={[styles.flex, styles.row, styles.namePriceContainer]}>
                                                                            <Icon
                                                                                size={14}
                                                                                name='trash'
                                                                                type='font-awesome'
                                                                                onPress={() => this.removeCart(i)}
                                                                                color={THEME_COLOR}/>

                                                                            <Text style={[styles.variantText]}>RS.{cart.price}
                                                                                x {cart.quantity}</Text>
                                                                        </View>
                                                                    </View>
                                                                </View>

                                                            </View>
                                                        </TouchableOpacity>

                                                    );
                                                })
}

                                        </View>
                                    </ScrollView>
                                    <TouchableOpacity
                                        style={[styles.checkoutButton]}
                                        onPress={() => navigate('Checkout')}>
                                        <View style={[styles.flex, styles.row, styles.namePriceContainer]}>
                                            <View>
                                                <Text
                                                    style={{
                                                    color: '#fff'
                                                }}>
                                                    {this.calculateTotalItems()}
                                                    item(s) in the cart</Text>
                                                <Text
                                                    style={{
                                                    color: '#fff'
                                                }}>
                                                    RS.{this.calculateTotal()}</Text>

                                            </View>

                                            <View >
                                                <Text
                                                    style={{
                                                    color: '#fff',
                                                    fontSize: 16,
                                                    fontWeight: 'bold'
                                                }}>Checkout</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            : <Text>No Products in cart! Lets add some</Text>
}

                    </View>
}
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => ({categories: state.categories, business: state.business, products: state.products, cart: state.cart})

export default connect(mapStateToProps, {getCategories, getBusiness, updateCart, removeCart})(Cart);