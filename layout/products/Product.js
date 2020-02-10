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
    ImageBackground,
    Platform
} from 'react-native';
import * as theme from '../../themes';
import {connect} from 'react-redux';
import {getBusiness} from '../../actions/businessActions';
import {getCategories} from '../../actions/categoryActions';
import {CheckBox} from 'react-native-elements'
import {getProducts, getProduct, setProductLoading} from '../../actions/productActions';
import Modal, {ModalFooter, ModalButton, ModalContent} from 'react-native-modals';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-elements';
import {addToCart} from '../../actions/cartActions';
import { THEME_COLOR } from '../../properties';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import {FloatingAction} from "react-native-floating-action";

const {width, height} = Dimensions.get('window');

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
    

    componentWillUnmount(){
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
        let selectedAddons =  this.state[parentAddon+'selected'];
        let selectedAddonsPrice =  this.state[parentAddon+'selectedTotal'];
        let totalAddonPrice = this.state.totalAddonsPrice;
        if(selectedAddons === undefined){
            selectedAddons = ''
        }
        if(selectedAddonsPrice === undefined){
            selectedAddonsPrice = 0
        }

        let obj1 = checkBoxMax.find(x => x.name === parentAddon);

        if (obj1.max > obj1.current) {
            if (index > -1) {
                obj1.current--;
                updatedCheckboxesValue.splice(index, 1);
                price = parseInt(this.state.price) - ( parseInt(childAddon.price) *  parseInt(this.state.value))
                selectedAddons = selectedAddons.replace(childAddon.name,'')
                totalAddonPrice = parseInt(totalAddonPrice) - parseInt(childAddon.price)
            } else {
                obj1.current++;
                price = parseInt(this.state.price) +( parseInt(childAddon.price) *  parseInt(this.state.value))
                
                updatedCheckboxesValue = [
                    ...checkboxesValue,
                    value
                ];
                selectedAddons = selectedAddons +''+ childAddon.name + ' x(1), ';
                selectedAddonsPrice = parseInt(selectedAddonsPrice) +  parseInt(childAddon.price)
                totalAddonPrice = parseInt(totalAddonPrice) +  parseInt(childAddon.price)
                this.setState({checked: true})
            }
        } else {
            if (index > -1) {
                obj1.current--;
                updatedCheckboxesValue.splice(index, 1);
                price = parseInt(this.state.price) - ( parseInt(childAddon.price) *  parseInt(this.state.value))
                selectedAddons = selectedAddons.replace(childAddon.name +' x(1), ' , '')
                selectedAddonsPrice = parseInt(selectedAddonsPrice) -  parseInt(childAddon.price)
                totalAddonPrice = parseInt(totalAddonPrice) - parseInt(childAddon.price)

            }
            event.target.checked = false;
            event.stopPropagation();
        }

        this.setState({checkboxesValue: updatedCheckboxesValue, price: price, checkBoxMax: checkBoxMax,[parentAddon+'selected']: selectedAddons, [parentAddon+'selectedTotal']: selectedAddonsPrice, totalAddonsPrice: totalAddonPrice})
        console.log(this.state)
    }

    renderAddons() {
        let addonsRender = [];
        let addons = this.props.products.product.addons
        for (let i = 0; i < addons.length; i++) {
            let addonsGroups = [];
            for (let z = 0; z < addons[i].addons.length; z++) {
                let parentAddon = addons[i].name
                let childAddon = addons[i].addons[z]
                addonsGroups.push(<CheckBox
                    title={`${addons[i].addons[z].name} ${addons[i].addons[z].price} `}
                    onPress={(e) => {
                    this.addCheckboxesValue(e, parentAddon, childAddon)
                }}
                    checked={this
                    .state
                    .checkboxesValue
                    .find(o => o.child === addons[i].addons[z].name && o.parent === addons[i].name)}/>)
            }
            addonsRender.push(
                <View style={{marginTop:10,borderBottomWidth:1, borderBottomColor:'#e4e6e8', paddingBottom:10}}>
                         <Text> Choose a {addons[i].name}
                    </Text>
                    <TouchableOpacity style={[styles.addonButton]} onPress={() => {
                            this.setState({['addon-modal'+i]: true});
                        }}>
                            <Text style={{padding:7}}>Choose</Text>
                        </TouchableOpacity>

<View  style={[styles.selectedVariants]}>
<Text> {this.state[addons[i].name+'selected']}</Text>
                        <Text> {this.state[addons[i].name+'selectedTotal'] === undefined || this.state[addons[i].name+'selectedTotal'] === 0 ? null : 'Price : ' + this.state[addons[i].name+'selectedTotal']}  </Text>
</View>
                       


<Modal
                            visible={this.state['addon-modal'+i]}
                            onTouchOutside={() => {
                            this.setState({['addon-modal'+i]: false});
                        }}>
                    <ModalContent style={{textAlign:'center',justifyContent:'center'}}>
                    <Text>{addons[i].name}
                    </Text>

                    <Text>Max allowed addons : {addons[i].maximimCount}</Text>
                    {addonsGroups}

                    <TouchableOpacity style={[styles.addonButton,{justifyContent:"center",alignContent:"center"}]} onPress={() => {
                            this.setState({['addon-modal'+i]: false});
                        }}>
                            <Text style={{padding:7}}>Done</Text>
                        </TouchableOpacity>
                    </ModalContent>
                </Modal>
                </View>
                
            );
        }
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
        var price = parseInt(this.state.price)
        var varPrice = parseInt(this.state.varPrice);
        var varName = this.props.products.product.variant.variants[index].name
        price = parseInt(price) - (parseInt(varPrice) * this.state.value);
        price = parseInt(price) + (parseInt(value) * this.state.value);
        this.setState({variant: varName, varPrice: this.props.products.product.variant.variants[index].price,price:price})
    }

    incrementCount = () => {
        let price = 0;
        if (this.state.varPrice === 0) {
            price = parseInt(this.state.price) + parseInt(this.state.initPrice)
        } else {
            price = parseInt(this.state.price) + parseInt(this.state.varPrice)
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
                price = parseInt(this.state.price) - parseInt(this.state.initPrice)
            } else {
                price = parseInt(this.state.price) - parseInt(this.state.varPrice)
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
            this.setState({checkBoxMax: checkBoxMax, modalVisible:false})
        }
    }

    render() {

        if (this.props.products.product != null) {
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
                            <View style={{height:height}} >
                            <ImageBackground
                                    style={{
                                    width: width,
                                    height: width*0.5
                                }}
                                    source={{
                                    uri: this.props.products.product.image
                                }}>

                                <Text style={[styles.productName]}>{this.props.products.product.name}</Text>
                                <TouchableHighlight
                                 style={[styles.addToCart]}
                    onPress={() => {
                    this.setModalVisible(true);
                }}>
                    <Text>Hi</Text>
                </TouchableHighlight>
                                </ImageBackground>

                                <Text>{this.props.products.product.description}</Text>
                               
                            </View>
                        </ScrollView>

                        <Modal
                            visible={this.state.modalVisible}
                            onTouchOutside={() => {
                            this.setState({modalVisible: false});
                        }}>
                            <ModalContent style={[styles.modal]}>

                            <View  style={[styles.flex, styles.row,styles.modalProductName]}>
                                <View style={[styles.flex, styles.row,styles.buttonText]} >
                                    <Text>{this.props.products.product.name}</Text>
                                </View>
                            </View>

                            <View  style={[styles.flex, styles.column, styles.optionContainer]}>
                              
                                {this.props.products.product.variant.variants.length > 0

                                    ? 
                                    <View style={{borderBottomWidth:1, borderBottomColor:'#e4e6e8', paddingBottom:10}}>
                                        <Text>Choose a {this.props.products.product.variant.name}</Text>
                                    <RNPickerSelect
            placeholder={this.getVariant()}
            items={this.getVariants()}
            onValueChange={(value, index) => this.changeVariant(value, index)}
            style={{
              ...pickerSelectStyles
            }}
            useNativeAndroidPickerStyle={false}
          
          />
                                    </View>
                                    : null}

                                {this.props.products.product.addons.length > 0
                                    ? this.renderAddons()
                                    : null}

                            </View>
                                
                                <View style={[styles.flex, styles.row,styles.itemPriceContainer]}>
                                    <Text style={{marginLeft:10}}>Item Price</Text>
                                    {
                                        this.state.varPrice === 0 ?
                                        <Text  style={{marginRight:10}}>{this.state.initPrice}</Text>
                                        :
                                        <Text  style={{marginRight:10}}>{this.state.varPrice}</Text>
                                    }
                                </View>

                                <View style={[styles.flex, styles.row,styles.quantityContainer]}>
                                    <Text style={{marginLeft:10}}>Quantity</Text>
                                    <View style={[styles.counterContainer,styles.row]}>
                                        <Button  buttonStyle={[styles.counter]} onPress={() => this.decrementCount()} title="-"/>
                                        <Text>{this.state.value}</Text>
                                        <Button  buttonStyle={[styles.counter]} onPress={() => this.incrementCount()} title="+"/>
                                    </View>
                                </View>


                                <View style={[styles.flex, styles.row,styles.subTotalContainer]}>
                                    <Text style={{marginLeft:10}}>Sub-total</Text>
                                    <Text  style={{marginRight:10}}>{this.state.price}</Text>
                                </View>
                              
                              <View  style={[styles.flex, styles.row,styles.modalAddtoCart]}>
                              <TouchableOpacity style={[styles.flex, styles.row,styles.buttonText]}  onPress={() => this.addToCart()} >
                                    <Text> Add to Cart</Text>
                                </TouchableOpacity>
                              </View>
                               
                            </ModalContent>
                        </Modal>
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


const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    column: {
        flexDirection: 'column'
    },
    row: {
        flexDirection: 'row'
    },
    addToCart: {
        height: 60,
        width: 60,
        borderRadius:100,
        textAlign:"center",
        backgroundColor: THEME_COLOR,
        position:"absolute",
        bottom:-25,
        zIndex:999,
        right:10
    },
    productName:{
        backgroundColor: 'rgba(0,0,0,0.7)',
        width:width,
        padding:10,
        position:"absolute",
        bottom:0,
        color:'white'
    },
    modal:{
        width:width*0.8,
        height:width*1.4
    },
    modalProductName:{
        justifyContent:'space-between',
        position:"absolute",
        top:0,
        width:width *0.8,
        height:40,
        backgroundColor:THEME_COLOR,
    },
    modalAddtoCart:{
        justifyContent:'space-between',
        position:"absolute",
        bottom:0,
        width:width *0.8,
        height:40,
        backgroundColor:THEME_COLOR,
    },
    buttonText:{
        width:width*0.8,
        justifyContent:'center',
        alignContent:'center',
        alignItems: 'center',
        textAlign:"center"
    },
    quantityContainer:{
        alignContent:'center',
        alignItems: 'center',
        justifyContent:'space-between',
        bottom:70,
        position: 'absolute',
        width:width *0.8,
        height:30,
        backgroundColor:'rgba(0,0,0,0.5)'
    },
    subTotalContainer:{
        alignContent:'center',
        alignItems: 'center',
        justifyContent:'space-between',
        bottom:40,
        position: 'absolute',
        width:width *0.8,
        height:30,
        backgroundColor:'rgba(0,0,0,0.5)'
    },
    itemPriceContainer:{
        alignContent:'center',
        alignItems: 'center',
        justifyContent:'space-between',
        bottom:100,
        position: 'absolute',
        width:width *0.8,
        height:30,
        backgroundColor:'rgba(0,0,0,0.5)'
    },
    counterContainer: {
        justifyContent:'center',
        alignContent:'center',
        alignItems: 'center',
    },
    counter:{
        height:20,
        width:20,
        marginLeft:10,
        marginRight:10,
        borderRadius:20,
        display:"flex",
    },
    addonButton:{
        width:width*0.17,
        borderWidth:2,
        borderRadius:10,
        borderColor:THEME_COLOR
    },
    optionContainer:{
         marginTop:20,
         borderWidth:1,
         borderBottomColor:'#e4e6e8',
         borderTopColor:'white',
         borderRightColor:'white',
         borderLeftColor:'white',
    },
    selectedVariants:{
        alignContent:'flex-start',
        alignItems: 'flex-start',
        justifyContent:'space-between',
    } 
})

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

const mapStateToProps = (state) => ({categories: state.categories, business: state.business, products: state.products,cart:state.cart});

export default connect(mapStateToProps, {
    getCategories,
    getBusiness,
    getProducts,
    getProduct,
    setProductLoading,
    addToCart
})(Product);