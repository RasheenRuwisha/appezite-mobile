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
    TextInput,
    View,
    Text,
    Dimensions
} from 'react-native';
import * as theme from '../../themes';
import {connect} from 'react-redux';
import {getBusiness} from '../../actions/businessActions';
import {getCategories} from '../../actions/categoryActions';
import {Card, ListItem, Button, Icon} from 'react-native-elements'
import {FloatingAction} from "react-native-floating-action";
import {removeCart, updateCart,placeOrder} from '../../actions/cartActions';
import {THEME_COLOR} from '../../properties'
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal, {ModalFooter, ModalButton, ModalContent} from 'react-native-modals';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
const {width, height} = Dimensions.get('window');
import RNPaypal from 'react-native-paypal-lib';
import { StackActions, NavigationActions } from 'react-navigation';

class Checkout extends React.Component {

    // static navigationOptions = ({navigation}) => {     return {header: (    <View
    // style={[styles.flex, styles.row, styles.header]}></View>         ),
    // headerTransparent: true} }

    state = {
        modalVisible: false,
        email: '',
        password: '',
        msg: null,
        states: [],
        name: undefined,
        addressline1: '',
        addressline2: '',
        payment: 'Pay at Counter',
        notes: '',
        selectedDate: new Date(),
        total: 0,
        drawerState: 'cart',
        deliveryMethod: 'Pick Up',
        nameError: null,
        addressError: null,
        address2Error: null,
        dateError:null,
        updateCity:true,
        dateChanged:false,
        deliveryCharge:0,
        selectedState: undefined,
        selectedCity: undefined
        
    };

    componentDidUpdate(previousProps) {
     
        let {cart} = this.props;
        if(cart.cart == null)
{
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'CheckoutSuccess' })],
              });
              this.props.navigation.dispatch(resetAction);
}       
    }


  
    componentDidMount(){
        let deliveryLocations = this.props.business.business.deliveryLocation;
        var price = 0;
        for (var i = 0; i < this.props.cart.cart.products.length; i++) {
            (price) = parseInt(price) + parseInt(this.props.cart.cart.products[i].price);
        }
        this.setState({modal: this.props.modal, name:this.props.user.name, total:price});

        if (deliveryLocations !== null) {
            const unique = [...new Set(deliveryLocations.map(item => item.state))];
            let i = 0;
            var firstCity;
            this.setState({states: unique})
            for (i; i < unique.length; i++) {
                let states = [];
                let cities = [];
                let stateName = unique[i] + 'options';
                this.setState({selectedState:unique[0]})
                for (let z = 0; z < deliveryLocations.length; z++) {
                    if (deliveryLocations[z].state === unique[i]) {
                        if (z == 0 && i == 0) {
                            firstCity = deliveryLocations[z].city
                        }
                        var option = {
                            label:deliveryLocations[z].city,
                            value:deliveryLocations[z].city
                        }
                        states.push(option);
                        cities.push(deliveryLocations[z].city)
                    }
                }
                this.setState({
                    [unique[i]]: states,
                    [stateName]: cities
                })
            }
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

    toggleModal(){
        this.setState({modalVisible:!this.state.modalVisible})
    }

    handleCollectionChange = (value) => {
        this.setState({deliveryMethod: value})
    }

    handleNameChange = (value) => {
        this.setState({name: value})
    }

    handlePaymentChange = (value) => {
        this.setState({payment: value})
    }

    handleAddress1Change = (e) => {
        this.setState({addressline1: e});
        this.handleAddress1Error()
    };
    handleAddress2Change = (e) => {
        this.setState({addressline2: e});
        this.handleAddress2Error()
    };

    handleCityChange = (e) => {
        let deliveryLocations = this.props.business.business.deliveryLocation;
        let deliveryLocation = deliveryLocations.find(x => x.city === e && x.state === this.state.selectedState);
        let price  = deliveryLocation.price;
        var total = this.state.total;
        total = parseInt(total) -  parseInt(this.state.deliveryCharge) + parseInt(price);
        this.setState({selectedCity: e, total: total, deliveryCharge: price});
        this.handleCityError()
    };

    handleStateChange = (e) => {
        var first = this.state[e+ 'options'];
        this.setState({selectedState: e, selectedCity: first[0],updateCity:true});
        this.handleStateError()
    };

 

    handleRerender(){
        this.setState({updateCity:false})
    }

    handleNameError = () => {
        if (this.state.name === undefined || this.state.name  === '') {
            this.setState({nameError: 'Enter a valid name'});
            return true;
        } else {
            this.setState({nameError: null});
            return false;
        }
    };

    handleCityError = () => {
        if (this.state.selectedCity === undefined) {
            this.setState({cityError: 'Select a valid city'});
            return true;
        } else {
            this.setState({cityError: null});
            return false;
        }
    };

    handleStateError = () => {
        if (this.state.selectedCity === undefined) {
            this.setState({stateError: 'Select a valid state'});
            return true;
        } else {
            this.setState({stateError: null});
            return false;
        }
    };


    handleAddress1Error = () => {
        if (this.state.addressline1 === "") {
            this.setState({addressError: 'Enter a valid address'});
            return true;

        } else {
            this.setState({addressError: null});
            return false;

        }
    };

    handleAddress2Error = () => {
        if (this.state.addressline2 === "") {
            this.setState({address2Error: 'Enter a valid address'});
            return true;

        } else {
            this.setState({address2Error: null});
            return false;

        }
    };

    handleAllUpdates(){
        this.handleCityUpdate();
        this.handleRerender();
    }

    handleDateChange = (date) => {
        let dates = this.props.business.business.pickUpHours;
        let preparationTime = this.props.business.business.orderPreparationTime;

        let selectedPickupDate = moment(date).format('dddd');
        let selectedPickupTime = moment(date).add(parseInt(preparationTime), 'minutes').format('HH:mm');

        let selectDate = moment(date).format('DD-MM-YYYY HH:mm')
        this.setState({selectedDate: selectDate, date:date,dateChanged:true})
        for (var i = 0; i < dates.length; i++) {
            if (dates[i].dayOfWeek.toLowerCase() === selectedPickupDate.toLowerCase()) {
                if (!moment(date).isAfter(new Date())) {
                    this.setState({dateError: 'Plese Select a valid Time'});
                    return true;
                } else if (selectedPickupTime > dates[i].from && selectedPickupTime < dates[i].to) {
                    this.setState({dateError: null});
                    return false;
                } else {
                    this.setState({dateError: 'Restaurant closed on selected time'});
                    return true;

                }
            }
        }

    }

    renderAddressFields = () => {
        let states = []
        for (let i = 0; i < this.state.states.length; i++) {
            states.push(
                {label:this.state.states[i], value:this.state.states[i]}
            )
        }

        return (
            <View>
                <Text>{this.state.addressError}</Text>
                 <Text style={[styles.labelText]}>Address Line 1</Text>
                    <TextInput style={[styles.textInput]} name='name' autoCapitalize='none' onChangeText={text => this.handleAddress1Change(text)}/>

                    <Text>{this.state.address2Error}</Text>

                <Text style={[styles.labelText]}>Address Line 2</Text>
                    <TextInput style={[styles.textInput]} name='name' autoCapitalize='none' onChangeText={text => this.handleAddress2Change(text)}/>

                    <Text>{this.state.stateError}</Text>

                <Text style={[styles.labelText]}>State</Text>

                <RNPickerSelect
                        onValueChange={(value) => this.handleStateChange(value)}
                        items={states}
                    style={{
                        ...pickerSelectStyles
                      }}
                      useNativeAndroidPickerStyle={false}/>


<Text>{this.state.cityError}</Text>

                <Text style={[styles.labelText]}>City</Text>
                <RNPickerSelect
            onValueChange={(value) => this.handleCityChange(value)}
            items={this.state[this.state.selectedState]}
            style={{
                ...pickerSelectStyles
              }}
              useNativeAndroidPickerStyle={false}/>

            </View>
        )
    }

    handleCheckout(){
        var addressError = false;
        var address2Error = false;
        var stateError = false;
        var cityError = false;

        var nameError = this.handleNameError();
        var dateError = this.handleDateChange(this.state.selectedDate);
        if (this.state.deliveryMethod === 'Delivery') {
            addressError = this.handleAddress1Error();
            address2Error = this.handleAddress2Error();
            stateError = this.handleStateError();
            cityError = this.handleCityError();
        }

        if (!nameError && !dateError  && !addressError && !address2Error && !stateError && !cityError) {
            var delivery = '';
            if (this.deliveryMethod === 'Delivery') {
                delivery = this.state.addressline1 + this.state.addressline2 + this.state.selectedCity + this.state.selectedState;
            }

            var orderedDate = moment(new Date()).format('DD-MM-YYYY HH:mm');
            var order = {
                businessId: this.props.business.business.businessId,
                products: this.props.cart.cart.products,
                docType: 'PurchaseOrder',
                orderedAt: orderedDate,
                orderReadyBy: this.state.selectedDate,
                delveryType: this.state.deliveryMethod,
                notes: this.state.notes,
                deliveryAddress: delivery,
                status: 'PENDING',
                customerName: this.state.name,
                platform: 'WEBSTORE',
                payment: 'Pay At Counter',
            }

            this
                .props
                .placeOrder(order);
        }
    }


    handlePayment(){
        var addressError = false;
        var address2Error = false;

        var dateError = this.handleDateChange(this.state.selectedDate);
        var nameError = this.handleNameError();
        if (this.state.deliveryMethod === 'Delivery') {
            addressError = this.handleAddress1Error();
            address2Error = this.handleAddress2Error();
        }

        if (!nameError && !addressError && !dateError && !address2Error) {
            var delivery = '';
            if (this.deliveryMethod === 'Delivery') {
                delivery = this.state.addressline1 + this.state.addressline2 + this.state.selectedCity + this.state.selectedState;
            }
            var order = {};

            RNPaypal.paymentRequest({
                clientId: 'AbWZf5VD75nz75_a32ChZiz7qPc9zF_FqtBozZGTtu0zyIvv6yJReGbCu8IG5358rildRDBcAHZ78q69',
                environment: RNPaypal.ENVIRONMENT.SANDBOX,
                intent: RNPaypal.INTENT.SALE,
                price: 60,
                currency: 'USD',
                description: `Android testing`,
                acceptCreditCards: true
            }).then(response => {
                var orderedDate = moment(new Date()).format('DD-MM-YYYY HH:mm');
                var order = {
                    businessId: this.props.business.business.businessId,
                    products: this.props.cart.cart.products,
                    docType: 'PurchaseOrder',
                    orderedAt: orderedDate,
                    orderReadyBy: this.state.selectedDate,
                    delveryType: this.state.deliveryMethod,
                    notes: this.state.notes,
                    deliveryAddress: delivery,
                    status: 'PENDING',
                    customerName: this.state.name,
                    platform: 'IOS',
                    payment: response,
                }
                this
                .props
                .placeOrder(order);
                console.log(response)
            }).catch(err => {
                console.log(err.message)
            })

           
           
        }
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <SafeAreaView>
                <View style={{
                        height: height,
                    }}>
                    <View 
                                    style={{
                                    flex: 0.9,
                                    alignItems:"center"
                                }}>
                                    
                    <View style={[styles.container]}>
                            
                            <Text style={[this.state.nameError=== null ? styles.labelText : styles.errorLabel]}>
                                {
                                    this.state.nameError == null ? 'Name' : this.state.nameError 
                                }
                            </Text>
                            <TextInput style={[this.state.nameError=== null ? styles.textInput : styles.errorInput]} value={this.state.name} name='name' autoCapitalize='none' onChangeText={text => this.handleNameChange(text)} />
                    
                    
                    
                            <Text style={[this.state.dateError=== null ? styles.labelText : styles.errorLabel]}>
                                {
                                    this.state.dateError == null ? 'Date and Time' : this.state.dateError 
                                }
                            </Text>
                            <Text style={[this.state.dateError=== null ? styles.textInputDate : styles.errorInputDate]}name='date' onPress={() => this.toggleModal()}  >  {this.state.selectedDate.toString()}  </Text>
                    


                            <Text style={[styles.labelText]}>Collection Method</Text>
                    <RNPickerSelect
                    placeholder={{
                        label: "Pickup",
                        value: "Pickup"
                    }}
                    placeholderTextColor="black"

                        onValueChange={(value) => this.handleCollectionChange(value)}
                        items={[
                         {
                            label: "Delivery",
                            value: "Delivery"
                        }
                    ]}
                    style={{
                        ...pickerSelectStyles
                      }}
                      useNativeAndroidPickerStyle={false}/>


{this.state.deliveryMethod === 'Delivery'?this.renderAddressFields():null}


                            <Text style={[styles.labelText]}>Payment Method</Text>
                    <RNPickerSelect
                    placeholder={ {
                        label: "Pay at Counter",
                        value: "Pay at Counter"
                    }}
                    placeholderTextColor="black"
                    
                        onValueChange={(value) => this.handlePaymentChange(value)}
                        items={[
                       {
                            label: "Card",
                            value: "Card"
                        }
                        
                    ]}
                    style={{
                        ...pickerSelectStyles
                      }}
                      useNativeAndroidPickerStyle={false}/>
                    </View>
                    
                    

                    <Modal
                            visible={this.state.modalVisible}
                            onTouchOutside={() => {
                            this.setState({modalVisible: false});
                        }}>
                            <ModalContent>
                                {this.state.dateError == null ? null : <Text>Business Closed during this time</Text>}
                            <DatePicker
      date={this.state.date}
      onDateChange={(date) => this.handleDateChange(date)}
    />

                {this.state.dateError == null && this.state.dateChanged ?  <Text onPress={()=>{this.toggleModal()}}>Choose</Text> :  <Text onPress={()=>{alert('Please select a valid time')}}>Choose</Text> }
                            </ModalContent>
                        </Modal>


                       
    
                    

                    

</View>
<View>
{
    this.state.payment === 'Pay at Counter'?
    <Button onPress={() => this.handleCheckout()} title='Checkout'/>
:
<Button onPress={() => this.handlePayment()} title='Checkout'/>

}
                </View>
                </View>
            </SafeAreaView>
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
        width:width*0.9,
    },
    textInput: {
        borderRadius: 2,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        color: '#000'
    },
    textInputDate: {
        borderRadius: 2,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        color: '#000',
        paddingVertical: 11,
    },
    textInputContainer: {
        
    },
    labelText: {
        marginTop: 20,
        color: '#000'
    },
    errorLabel: {
        marginTop: 20,
        color: '#FF4B55'
    },
    errorInput:{
        borderRadius: 2,
        height: 40,
        borderColor: '#FF4B55',
        borderWidth: 1,
        color: '#000'
    },
    errorInputDate: {
        borderRadius: 2,
        height: 40,
        borderColor: '#FF4B55',
        borderWidth: 1,
        color: '#000',
        paddingVertical: 11,
    },
    loginButton: {
        backgroundColor: THEME_COLOR,
        height: 40,
        marginTop: 20,
        width: width*0.7
    }
})


const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 14,
      height: 40,
      paddingVertical: 6,
      paddingHorizontal: 6,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 14,
      paddingHorizontal: 6,
      paddingVertical: 6,
      borderWidth: 0.5,
      borderColor: 'gray',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },

  });


const mapStateToProps = (state) => ({categories: state.categories, business: state.business, products: state.products, cart: state.cart, user:state.auth.user[0],})

export default connect(mapStateToProps, {getCategories, getBusiness, updateCart, removeCart,placeOrder})(Checkout);
