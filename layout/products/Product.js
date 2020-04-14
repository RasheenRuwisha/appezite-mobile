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
    ScrollView,
    View,
    Text,
    TouchableHighlight,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import {connect} from 'react-redux';
import {getBusiness} from '../../actions/businessActions';
import {getCategories} from '../../actions/categoryActions';
import {CheckBox} from 'react-native-elements'
import {getProducts, getProduct, setProductLoading} from '../../actions/productActions';
import RNPickerSelect, {defaultStyles} from 'react-native-picker-select';
import {Button} from 'react-native-elements';
import {addToCart} from '../../actions/cartActions';
import {TextInput} from 'react-native-gesture-handler';
import {FloatingAction} from "react-native-floating-action";
import {Modal as RNModal} from 'react-native';
const {width, height} = Dimensions.get('window');
import {Icon as IconButon} from 'react-native-elements';
import { IP_ADR } from '../../properties';
var styles = require('./ProductStyles');

class Product extends React.Component {

    state = {
        modalVisible: false,
        variant: undefined,
        variantPrice: undefined,
        msg: null,
        value: 1,
        price: 0,
        initPrice: 0,
        checkboxesValue: [],
        checkBoxMax: undefined,
        varPrice: 0,
        varName: null,
        checked: false,
        totalAddonsPrice: 0,
        selectectedItems: [],
        isShownPicker: false
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
    componentDidMount() {
        const {navigation} = this.props;
        console.log(navigation);
        this
            .props
            .setProductLoading();
        this
            .props
            .getProduct(this.props.business.business.email, navigation.getParam('productId'))

    }

    componentWillUnmount() {
        this
            .props
            .setProductLoading();
    }

    setInitProduct() {
        var price = 0;
        var varPrice = 0;
        var name = null;
        if (this.state.price == 0) {
            if (this.props.products.product.variant.variants.length > 0) {
                price = this.props.products.product.variant.variants[0].price;
                varPrice = this.props.products.product.variant.variants[0].price;
                name = this.props.products.product.variant.variants[0].name;
            } else {
                price = this.props.products.product.price
            }
            this.setState({price: price, initPrice: this.props.products.product.price, varName: name, varPrice: varPrice});
        }
    }

    getVariants() {
        let variantLabels = [];
        this
            .props
            .products
            .product
            .variant
            .variants
            .map((u, i) => {
                let jsonVariant = {
                    label: u.name,
                    value: u.price
                }
                if (i != 0) {
                    variantLabels.push(jsonVariant);
                }
            })

        return variantLabels;
    }

    addCheckboxesValue = (event, parentAddon, childAddon) => {
        let price = this.state.price;
        let value = {
            parent: parentAddon,
            child: childAddon.name,
            price: childAddon.price
        }
        const {checkboxesValue} = this.state // The state in our class
        let updatedCheckboxesValue = [...checkboxesValue];
        let checkBoxMax = this.state.checkBoxMax;
        let obj = updatedCheckboxesValue.find(x => x.parent === parentAddon && x.child === childAddon.name);
        let index = updatedCheckboxesValue.indexOf(obj);
        let selectedAddons = this.state[parentAddon + 'selected'];
        let selectedAddonsPrice = this.state[parentAddon + 'selectedTotal'];
        let totalAddonPrice = this.state.totalAddonsPrice;
        if (selectedAddons === undefined) {
            selectedAddons = ''
        }
        if (selectedAddonsPrice === undefined) {
            selectedAddonsPrice = 0
        }

        let obj1 = checkBoxMax.find(x => x.name === parentAddon);

        if (obj1.max > obj1.current) {
            if (index > -1) {
                obj1.current--;
                updatedCheckboxesValue.splice(index, 1);
                price = parseFloat(this.state.price) - (parseFloat(childAddon.price) * parseFloat(this.state.value))
                selectedAddons = selectedAddons.replace(childAddon.name, '')
                totalAddonPrice = parseFloat(totalAddonPrice) - parseFloat(childAddon.price)
            } else {
                obj1.current++;
                price = parseFloat(this.state.price) + (parseFloat(childAddon.price) * parseFloat(this.state.value))

                updatedCheckboxesValue = [
                    ...checkboxesValue,
                    value
                ];
                selectedAddons = selectedAddons + '' + childAddon.name + ' x(1), ';
                selectedAddonsPrice = parseFloat(selectedAddonsPrice) + parseFloat(childAddon.price)
                totalAddonPrice = parseFloat(totalAddonPrice) + parseFloat(childAddon.price)
                this.setState({checked: true})
            }
        } else {
            if (index > -1) {
                obj1.current--;
                updatedCheckboxesValue.splice(index, 1);
                price = parseFloat(this.state.price) - (parseFloat(childAddon.price) * parseFloat(this.state.value))
                selectedAddons = selectedAddons.replace(childAddon.name + ' x(1), ', '')
                selectedAddonsPrice = parseFloat(selectedAddonsPrice) - parseFloat(childAddon.price)
                totalAddonPrice = parseFloat(totalAddonPrice) - parseFloat(childAddon.price)

            }
            event.target.checked = false;
            event.stopPropagation();
        }

        this.setState({
            checkboxesValue: updatedCheckboxesValue,
            price: price,
            checkBoxMax: checkBoxMax,
            [parentAddon + 'selected']: selectedAddons,
            [parentAddon + 'selectedTotal']: selectedAddonsPrice,
            totalAddonsPrice: totalAddonPrice
        })
        console.log(this.state)
    }

    renderAddons() {
        let addonsRender = [];
        let addons = this.props.products.product.addons
        for (let i = 0; i < addons.length; i++) {
            let addonsGroups = [];
            addonsRender.push(
                <View
                    style={{
                    marginTop: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: '#e4e6e8',
                    paddingLeft:10,
                    paddingRight:10,
                    paddingTops:10,
                }}>
                    <Text>
                        Choose a {addons[i].name}
                    </Text>
                    <View style={[styles.selectedVariants]}>
                        <Text>
                            {this.state[addons[i].name + 'selected']}</Text>
                        <Text>
                            {this.state[addons[i].name + 'selectedTotal'] === undefined || this.state[addons[i].name + 'selectedTotal'] === 0
                                ? null
                                : 'Price : ' + this.state[addons[i].name + 'selectedTotal']}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={[styles.addonButton]}
                        onPress={() => {
                        this.setState({
                            ['addon-modal' + i]: true
                        });
                    }}>
                        <Text
                            style={{
                            padding: 7,
                            zIndex: 999,
                            color:'white'
                        }}>Choose</Text>
                    </TouchableOpacity>

                    

                </View>

            );
        }
        return addonsRender;
    }

    renderAddonModals() {
        let addonsRender = [];
        let addons = this.props.products.product.addons
        for (let i = 0; i < addons.length; i++) {
            let addonsGroups = [];
            for (let z = 0; z < addons[i].addons.length; z++) {
                let parentAddon = addons[i].name
                let childAddon = addons[i].addons[z]
                addonsGroups.push(<CheckBox
                    title={`${addons[i].addons[z].name} ${(Math.round(addons[i].addons[z].price * 100) / 100).toFixed(2)} `}
                    onPress={(e) => {
                    this.addCheckboxesValue(e, parentAddon, childAddon)
                }}
                    checked={this
                    .state
                    .checkboxesValue
                    .find(o => o.child === addons[i].addons[z].name && o.parent === addons[i].name)}/>)
            }
            addonsRender.push(
                <RNModal
                borderWidth={0}
                            animationType='fade'
                    transparent={true}
                    visible={this.state['addon-modal' + i] == undefined
                    ? false
                    : this.state['addon-modal' + i]}
                    onTouchOutside={() => {
                    this.setState({
                        ['addon-modal' + i]: false
                    });
                }}>
                    <TouchableHighlight
                              
                              style={{
                              borderWidth: 0,
                              backgroundColor: 'rgba(0,0,0,0.5)',
                              flex: 1,
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'center'
                          }}>
                    <View
                        style={{
                        width: width,
                        flex: 1,
                        flexDirection: 'column',
                        textAlign: 'center',
                        justifyContent: 'center'
                    }}>

                        <View
                            style={{
                            backgroundColor: 'white',
                            width: 300,
                            marginLeft:width*0.13
                        }}>

                            <Text style={[{padding:10}]}>{addons[i].name}
                            </Text>

                            <Text style={[{padding:10}]}>Max allowed addons : {addons[i].maximimCount}</Text>
                            {addonsGroups}

                            <TouchableOpacity
                                style={[
                                styles.addonButton, {
                                    justifyContent: "center",
                                    alignContent: "center",
                                    margin:10
                                }
                            ]}
                                onPress={() => {
                                this.setState({
                                    ['addon-modal' + i]: false
                                });
                            }}>
                                <Text
                                    style={{
                                    padding: 7,
                                    color:'white'
                                }}>Done</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                    </TouchableHighlight>
                </RNModal>

            );
        }
        console.log(addonsRender.length)
        return addonsRender;

    }

    getVariant() {
        let jsonVariant = {
            label: this.props.products.product.variant.variants[0].name,
            value: this.props.products.product.variant.variants[0].price
        }
        if (this.state.variant == undefined) {
            this.setState({variant: this.props.products.product.variant.variants[0].name, variantPrice: this.props.products.product.variant.variants[0].price})
        }
        return jsonVariant;
    }

    changeVariant(value, index) {
        var price = parseFloat(this.state.price)
        var varPrice = parseFloat(this.state.varPrice);
        var varName = this.props.products.product.variant.variants[index].name
        price = parseFloat(price) - (parseFloat(varPrice) * this.state.value);
        price = parseFloat(price) + (parseFloat(value) * this.state.value);
        this.setState({variant: varName, varPrice: this.props.products.product.variant.variants[index].price, price: price})
    }

    incrementCount = () => {
        let price = 0;
        if (this.state.varPrice === 0) {
            price = parseFloat(this.state.price) + parseFloat(this.state.initPrice)
        } else {
            price = parseFloat(this.state.price) + parseFloat(this.state.varPrice)
        }
        price = price + this.state.totalAddonsPrice;
        this.setState({
            value: this.state.value + 1,
            price: price
        })
    }

    decrementCount = () => {
        if (this.state.value > 1) {
            let price = 0;
            if (this.state.varPrice === 0) {
                price = parseFloat(this.state.price) - parseFloat(this.state.initPrice)
            } else {
                price = parseFloat(this.state.price) - parseFloat(this.state.varPrice)
            }
            price = price - this.state.totalAddonsPrice;
            this.setState({
                value: this.state.value - 1,
                price: price
            })
        }
    }

    addToCart() {
        let msg = null;
        let checkBoxMax = this.state.checkBoxMax
        for (let i = 0; i < checkBoxMax.length; i++) {
            if (checkBoxMax[i].mandatory && checkBoxMax[i].current == 0) {
                msg = `Please select atleast 1 ${checkBoxMax[i].name}`;
                this.setState({msg: `Please select atleast 1 ${checkBoxMax[i].name}`})
                break;
            } else {
                this.setState({msg: null})
            }
        }

        if (msg === null) {
            var cartItem = {
                name: this.props.products.product.name,
                image: this.props.products.product.image,
                quantity: this.state.value,
                price: this.state.price,
                addons: this.state.checkboxesValue,
                variant: this.state.varName,
                variantPrice: this.state.varPrice
            }
            console.log(cartItem)
            this
                .props
                .addToCart(cartItem)
            console.log(cartItem)
            for (let i = 0; i < checkBoxMax.length; i++) {
                checkBoxMax[i].current = 0;
            }
            this.setState({checkBoxMax: checkBoxMax, modalVisible: false})
        }

       
    }

    render() {
        const {navigate} = this.props.navigation;
        let imagePRD = '';
        if (this.props.products.product != null) {
            imagePRD = this.props.products.product.image.replace('api.appezite.com',IP_ADR)
            if (this.state.checkBoxMax === undefined) {
                var addons = this.props.products.product.addons;
                let max = [];
                for (let i = 0; i < addons.length; i++) {
                    let checkBoxMax = {
                        name: addons[i].name,
                        max: addons[i].maximimCount,
                        mandatory: addons[i].addonMandatory,
                        current: 0
                    }
                    max.push(checkBoxMax);
                }
                this.setState({checkBoxMax: max, checkboxesValue: [], modalVisible: false})
            }
        }

        return (
            <SafeAreaView>
                {this.props.products.product == null
                    ? <View >
                            <Text>Loading</Text>
                        </View>
                    : <View>
                        {this.setInitProduct()}
                        <ScrollView>
                            <View
                                style={{
                                height: height
                            }}>
                                <ImageBackground
                                    style={{
                                    width: width,
                                    height: width *0.5
                                }}
                                    source={{
                                    uri: imagePRD
                                }}>

                                    <Text style={[styles.productName]}>{this.props.products.product.name}</Text>
                                    <TouchableHighlight
                                        style={[styles.addToCart]}
                                        onPress={() => {
                                        this.setModalVisible(true);
                                    }}>
                                        <IconButon
                                                size={35}
                                                name='add'
                                                type='material'
                                                color="#fff"
                                        />
                                    </TouchableHighlight>
                                </ImageBackground>

                                <Text>{this.props.products.product.description}</Text>

                            </View>
                        </ScrollView>

                        <RNModal
                            borderWidth={0}
                            animationType='fade'
                            transparent={true}
                            visible={this.state.modalVisible}>

                            {this.props.products.product.addons.length > 0
                                ? this.renderAddonModals()
                                : null}
                            <TouchableHighlight
                              
                                style={{
                                borderWidth: 0,
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <View
                                    style={{
                                    backgroundColor: 'white',
                                    width: width *0.8,
                                    height: width *1.4
                                }}>

                                    <View style={[styles.flex, styles.row, styles.modalProductName]}>
                                        <View style={[styles.flex, styles.row, styles.buttonText]}>
                                            <Text style={{color:'white'}}>{this.props.products.product.name}</Text>
                                        </View>
                                        <TouchableOpacity style={{padding:10,zIndex:9999}} onPress={() => this.setState({modalVisible:false})}>
                                        <IconButon
                  name='close'
                  type='font-awesome'
                  size={20}
                  color={'white'}
                />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={[styles.flex, styles.column, styles.optionContainer]}>
                                        {
                                            this.state.msg == null ?
                                            null :
                                            <Text style={[styles.errorMsg]}>{this.state.msg}</Text>
                                        }

                                        {this.props.products.product.variant.variants.length > 0

                                            ? <View
                                                    style={{
                                                    borderBottomWidth: 1,
                                                    borderBottomColor: '#e4e6e8',
                                                    padding: 10
                                                    
                                                }}>
                                                    <Text>Choose a {this.props.products.product.variant.name}</Text>
                                                    <RNPickerSelect
                                                        placeholder={this.getVariant()}
                                                        items={this.getVariants()}
                                                        onValueChange={(value, index) => this.changeVariant(value, index)}
                                                        style={{
                                                        ...pickerSelectStyles
                                                    }}
                                                        useNativeAndroidPickerStyle={false}/>
                                                </View>
                                            : null}

                                        {this.props.products.product.addons.length > 0
                                            ? this.renderAddons()
                                            : null}

                                    </View>

                                    <View style={[styles.flex, styles.row, styles.itemPriceContainer]}>
                                        <Text
                                            style={{
                                            marginLeft: 10
                                        }}>Item Price</Text>
                                        {this.state.varPrice === 0
                                            ? <Text
                                                    style={{
                                                    marginRight: 10
                                                }}>{(Math.round(this.state.initPrice * 100) / 100).toFixed(2)}</Text>
                                            : <Text
                                                style={{
                                                marginRight: 10
                                            }}>{(Math.round(this.state.varPrice * 100) / 100).toFixed(2)}</Text>
}
                                    </View>

                                    <View style={[styles.flex, styles.row, styles.quantityContainer]}>
                                        <Text
                                            style={{
                                            marginLeft: 10
                                        }}>Quantity</Text>
                                        <View style={[styles.counterContainer, styles.row]}>
                                            <Button
                                                buttonStyle={[styles.counter]}
                                                onPress={() => this.decrementCount()}
                                                title="-"/>
                                            <Text>{this.state.value}</Text>
                                            <Button
                                                buttonStyle={[styles.counter]}
                                                onPress={() => this.incrementCount()}
                                                title="+"/>
                                        </View>
                                    </View>

                                    <View style={[styles.flex, styles.row, styles.subTotalContainer]}>
                                        <Text
                                            style={{
                                            marginLeft: 10
                                        }}>Sub-total</Text>
                                        <Text
                                            style={{
                                            marginRight: 10
                                        }}>{(Math.round(this.state.price * 100) / 100).toFixed(2)}</Text>
                                    </View>

                                    <View style={[styles.flex, styles.row, styles.modalAddtoCart]}>
                                        <Button
                                            onPress={() => this.addToCart()}
                                            buttonStyle={[styles.buttonText]}  title="Add to cart"/>
                                    </View>

                                </View>

                            </TouchableHighlight>

                        </RNModal>

                    </View>}

                {this.props.cart.cart != null
                    ? <FloatingAction
                            onPressMain={() => navigate('Cart')}
                            iconHeight={25}
                            iconWidth={25}
                            animated={false}
                            floatingIcon={require("../../resources/003-shopping-cart.png")}/>
                    : null
}

            </SafeAreaView>
        )
    }
}


const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 14,
      paddingVertical: 6,
      paddingHorizontal: 6,
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 14,
      paddingHorizontal: 6,
      paddingVertical: 6,
      borderWidth: 0.5,
      borderColor: 'black',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },

  });


const mapStateToProps = (state) => ({categories: state.categories, business: state.business, products: state.products, cart: state.cart});

export default connect(mapStateToProps, {
    getCategories,
    getBusiness,
    getProducts,
    getProduct,
    setProductLoading,
    addToCart
})(Product);