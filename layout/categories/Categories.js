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

const {width, height} = Dimensions.get('window');

class Categories extends React.Component {

    // static navigationOptions = ({navigation}) => {     return {header: (    <View
    // style={[styles.flex, styles.row, styles.header]}></View>         ),
    // headerTransparent: true} }

    state = {
        business: undefined,
        categories: undefined
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <SafeAreaView>
                {this.props.categories.loading
                    ? <View >
                            <Text>Loading</Text>
                        </View>
                    : <View>

                        <ScrollView>
                        <View style={{height:height}} >

                                {this
                                    .props
                                    .categories
                                    .categories
                                    .map((u, i) => {
                                        return (
                                            <TouchableOpacity onPress={() => navigate('Products', {catId: u.categoryId})}>
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
                        </ScrollView>
                    </View>
}
                {this.props.cart.cart != null
                    ? <View >
                            <FloatingAction onPressMain={() => navigate('Cart')} iconHeight={25} iconWidth={25} animated={false} floatingIcon={require("../../resources/003-shopping-cart.png")}/>
                        </View>
                    : null
}

            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => ({categories: state.categories, business: state.business, products: state.products, cart: state.cart})

export default connect(mapStateToProps, {getCategories, getBusiness})(Categories);