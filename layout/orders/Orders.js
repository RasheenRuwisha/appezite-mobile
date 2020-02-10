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
import {loadOrders} from '../../actions/orderActions';
import {clearErrors} from '../../actions/errorActions';
import {STARTER_URL, LOGO_URL, THEME_COLOR} from '../../properties'
const {width, height} = Dimensions.get('window');
import {Button} from 'react-native-elements';
import {StackActions, NavigationActions} from 'react-navigation';
import Modal, {ModalFooter, ModalButton, ModalContent} from 'react-native-modals';
import {TouchableOpacity} from 'react-native-gesture-handler';

class Orders extends React.Component {

    state = {
        modal: false,
        email: '',
        password: '',
        msg: null
    }

    componentDidMount() {
        this
            .props
            .loadOrders()
    }

    onEmailChange = (text) => {
        this.setState({email: text});
    };

    onPasswordChange = (text) => {
        this.setState({password: text});
    };

    openProductDetails(product) {
        this.setState({modalProduct: product,modalVisible:true})
    }

    renderOrders(orders) {
        let userOrder = [];

        if (orders.length > 0) {
            for (let i = 0; i < orders.length; i++) {
                let orderProducts = [];
                for (let z = 0; z < orders[i].products.length; z++) {
                    orderProducts.push(
                        <Text>{orders[i].products[z].name}
                            - {orders[i].products[z].variant === null
                                ? null
                                : orders[i].products[z].variant}</Text>
                    )
                    for (let x = 0; x < orders[i].products[z].addons.length; x++) {
                        orderProducts.push(
                            <Text>{orders[i].products[z].addons[x].child}</Text>
                        )
                    }
                }
                userOrder.push(
                    <TouchableOpacity onPress={() => this.openProductDetails(orderProducts)}>
                        <Text>{orders[i].purchaseId}
                            - {orders[i].status}</Text>
                    </TouchableOpacity>
                )
            }
            return userOrder;
        } else {
            return <Text>No previous order</Text>
        }
    }

    render() {
        const {navigate} = this.props.navigation;

        return (

            <View>
                <SafeAreaView>

                    <View>
                        {this.props.orders.loading
                            ? <Text>Loading</Text>
                            : this.renderOrders(this.props.orders.orders)
}

                        <Modal
                            visible={this.state.modalVisible}
                            onTouchOutside={() => {
                            this.setState({modalVisible: false});
                        }}>
                            <ModalContent>
                                {this.state.modalProduct}
                            </ModalContent>
                        </Modal>
                    </View>
                </SafeAreaView>
            </View>
        )
    }
}

const mapStateToProps = state => ({auth: state.auth, orders: state.orders, business: state.business});

export default connect(mapStateToProps, {loadOrders})(Orders);