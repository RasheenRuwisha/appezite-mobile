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
import {IP_ADR} from '../../properties';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    flex: {
        flex: 0
    },
    column: {
        flexDirection: 'column'
    },
    row: {
        flexDirection: 'row'
    },
    header: {
        backgroundColor: '#1e1e1e',
        paddingHorizontal: theme.sizes.padding,
        paddingTop: theme.sizes.padding * 1.33,
        paddingBottom: theme.sizes.padding * 0.66
    },
    games: {
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: 30
    },
    game: {
        width: width - (theme.sizes.padding * 2),
        height: height * 0.44,
        marginHorizontal: theme.sizes.margin,
        borderRadius: theme.sizes.radius
    },
    gameInfo: {
        position: 'absolute',
        borderRadius: theme.sizes.radius,
        paddingHorizontal: theme.sizes.padding,
        paddingVertical: theme.sizes.padding / 2,
        bottom: 20,
        left: (width - (theme.sizes.padding * 4)) / (Platform.OS === 'ios'
            ? 3.2
            : 3),
        backgroundColor: theme.colors.white,
        width: width - (theme.sizes.padding * 4)
    },
    rating: {
        fontSize: theme.sizes.font * 2,
        color: theme.colors.white,
        fontWeight: 'bold'
    },
    shadow: {
        shadowColor: theme.colors.black,
        shadowOffset: {
            width: 0,
            height: 6
        },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 5
    },
    dots: {
        width: 5,
        height: 5,
        borderWidth: 1.5,
        borderRadius: 5,
        marginHorizontal: 6,
        backgroundColor: theme.colors.gray,
        borderColor: 'transparent'
    },
    activeDot: {
        width: 6.5,
        height: 6.5,
        borderRadius: 6.25,
        borderColor: theme.colors.active
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: width - (theme.sizes.padding * 2),
        height: height * 0.44,
        paddingHorizontal: theme.sizes.padding,
        paddingVertical: theme.sizes.padding * 0.66,
        borderRadius: theme.sizes.radius
    },
    searchGames: {
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: 30
    },
    searchGame: {
        width: width - (theme.sizes.padding * 2),
        height: width * 0.4,
        marginHorizontal: theme.sizes.margin,
        marginVertical: theme.sizes.margin,
        borderRadius: theme.sizes.radius
    },
    searchGameInfo: {
        position: 'absolute',
        borderRadius: theme.sizes.radius,
        paddingHorizontal: theme.sizes.padding,
        paddingVertical: theme.sizes.padding / 2,
        bottom: 20,
        left: (width - (theme.sizes.padding * 4)) / (Platform.OS === 'ios'
            ? 3.2
            : 3),
        backgroundColor: theme.colors.white,
        width: width - (theme.sizes.padding * 4)
    },
    searchOverlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: theme.sizes.radius,
        height: width * 0.4,
        paddingHorizontal: theme.sizes.padding,
        paddingVertical: theme.sizes.padding * 0.66
    },
    recommendedHeader: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: theme.sizes.padding
    },
    recommendedList: {},
    recommendation: {
        width: (width - (theme.sizes.padding * 2)) / 2.1,
        marginHorizontal: 14,
        // backgroundColor: theme.colors.white,
        overflow: 'hidden',
        borderRadius: theme.sizes.radius,
        marginVertical: theme.sizes.margin * 0.5
    },
    recommendationHeader: {
        overflow: 'hidden',
        borderTopRightRadius: theme.sizes.radius,
        borderTopLeftRadius: theme.sizes.radius
    },
    recommendationOptions: {
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.sizes.padding / 2,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0
    },
    recommendationTemp: {
        fontSize: theme.sizes.font * 1.25,
        color: theme.colors.white
    },
    recommendationImage: {
        width: (width - (theme.sizes.padding * 2)) / 2.1,
        height: (width - (theme.sizes.padding * 2)) / 2.1,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    text: {
        color: theme.colors.white,
        width: (width - (theme.sizes.padding * 2)) / 3.9
    },
    price: {
        height: 20,
        borderTopLeftRadius: theme.sizes.radius,
        borderBottomLeftRadius: theme.sizes.radius,
        textAlign: 'right',
        justifyContent: 'flex-end',
        paddingRight: 3
    },
    priceText: {
        color: theme.colors.white,
        fontSize: 11,
        textAlign: 'right'
    }
});

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

    Item = item => {
        const {navigate} = this.props.navigation;
        item.image = item
            .image
            .replace('api.appezite.com', IP_ADR);
        return (
            <TouchableOpacity
                onPress={() => navigate('Product', {productId: item.productId})}
                activeOpacity={0.8}>
                <ImageBackground
                    style={[styles.flex, styles.column, styles.recommendation, styles.shadow]}
                    imageStyle={{
                    borderRadius: theme.sizes.radius
                }}
                    source={{
                    uri: item.image
                }}>
                    <View
                        style={[
                        styles.row,
                        styles.recommendationImage,
                        styles.shadow, {
                            flex: 4
                        }
                    ]}>
                        <View
                            style={[
                            styles.flex,
                            styles.row, {
                                flex: 2
                            }
                        ]}>
                            <View
                                style={[{
                                    flex: 1,
                                    paddingLeft: 10,
                                    justifyContent: 'flex-end',
                                    marginBottom: 26
                                }
                            ]}>
                                <Text
                                    style={[
                                    styles.flex,
                                    styles.text, {
                                        flexWrap: 'wrap'
                                    }
                                ]}>{item.name}</Text>

                            </View>
                        </View>

                        <View
                            style={[
                            styles.flex,
                            styles.row, {
                                flex: 1.5
                            }
                        ]}>
                            <View
                                style={[{
                                    flex: 1,
                                    paddingLeft: 10,
                                    justifyContent: 'flex-end',
                                    marginBottom: 26
                                }
                            ]}>
                                <View
                                    style={[
                                    styles.flex,
                                    styles.row,
                                    styles.price, {
                                        backgroundColor: this.props.business.business.theme.dark
                                    }
                                ]}>
                                    <Text
                                        style={[
                                        styles.flex,
                                        styles.priceText, {
                                            flexWrap: 'wrap',
                                            paddingTop: 3,
                                            paddingLeft: 3
                                        }
                                    ]}>RS {(Math.round(item.price * 100) / 100).toFixed(2)}</Text>

                                </View>

                            </View>
                        </View>
                    </View>
                </ImageBackground>

            </TouchableOpacity>
        );
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
                                <View
                                    style={{
                                    height: height
                                }}>

                                    {this.props.products.products.length > 0
                                        ? <FlatList
                                                data={this.props.products.products}
                                                vertical
                                                numColumns={2}
                                                renderItem={({item}) => this.Item(item)}
                                                keyExtractor={item => item.id}/>

                                        //                                         <View>
                                        //                  {this
                                        // .props                                                     .products
                                        //                                            .products
                                        //                            .map((u, i) => {
                                        //                       return (
                                        //              <TouchableOpacity >
                                        //                    <Card
                                        //                image={{
                                        //               uri: u.image
                                        //              }}>
                                        //        <View>
                                        //         <Text>{u.name}</Text>
                                        //                     </View>
                                        //               </Card>
                                        //     </TouchableOpacity>
                                        //   );                                                     }) }
                                        //                             </View>
                                        : <Text>No products available in this category</Text>
}

                                </View>
                            </ScrollView>
                        </View>
}
                    {this.props.cart.cart != null
                        ? <FloatingAction
                                onPressMain={() => navigate('Cart')}
                                iconHeight={25}
                                iconWidth={25}
                                animated={false}
                                floatingIcon={require("../../resources/003-shopping-cart.png")}/>
                        : null
}
                </View>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => ({categories: state.categories, business: state.business, products: state.products, cart: state.cart})

export default connect(mapStateToProps, {getCategories, getBusiness, getProducts})(Products);