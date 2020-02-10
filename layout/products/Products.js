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
    AsyncStorage,
    TouchableOpacity
} from 'react-native';
import * as theme from '../../themes';
import {connect} from 'react-redux';
import {getBusiness} from '../../actions/businessActions';
import {getCategories} from '../../actions/categoryActions';
import {getProducts} from '../../actions/productActions';
import {FloatingAction} from "react-native-floating-action";

import {Card, ListItem, Button, Icon} from 'react-native-elements'

const {width, height} = Dimensions.get('window');

class Products extends React.Component {

    state = {
        business: undefined,
        categories: undefined
    }
    componentDidMount() {
        const {navigation} = this.props;
        console.log(navigation);
        this
            .props
            .getProducts(this.props.business.business.businessId, this.props.business.business.email, navigation.getParam('catId'))

    }

    render() {
        const {navigate} = this.props.navigation;

        return (
            <SafeAreaView>
                <View>
                    {this.props.products.loading
                        ? <View >
                                <Text>Loading</Text>
                            </View>
                        : <View>

                            <ScrollView>
                            <View style={{height:height}} >

                                    {this.props.products.products.length > 0
                                        ? <View>
                                                {this
                                                    .props
                                                    .products
                                                    .products
                                                    .map((u, i) => {
                                                        return (
                                                            <TouchableOpacity onPress={() => navigate('Product', {productId: u.productId})}>
                                                                <Card
                                                                    image={{
                                                                    uri: u.image
                                                                }}>
                                                                    <View>
                                                                        <Text>{u.name}</Text>
                                                                    </View>
                                                                </Card>
                                                            </TouchableOpacity>

                                                        );
                                                    })
}
                                            </View>
                                        : <Text>No products available in this category</Text>
}

                                </View>
                            </ScrollView>
                        </View>
}
                    {this.props.cart.cart != null
                        ? <View >
                                <FloatingAction
                                    onPressMain={() => navigate('Cart')}
                                    iconHeight={25}
                                    iconWidth={25}
                                    animated={false}
                                    floatingIcon={require("../../resources/003-shopping-cart.png")}/>
                            </View>
                        : null
}
                </View>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => ({categories: state.categories, business: state.business, products: state.products, cart: state.cart})

export default connect(mapStateToProps, {getCategories, getBusiness, getProducts})(Products);