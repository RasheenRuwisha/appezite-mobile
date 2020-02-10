// import React from 'react'; import { createAppContainer } from
// 'react-navigation' import bottomNavigator from
// './layout/navigation/Navigation'; type Props = {}; export default
// createAppContainer(bottomNavigator);

import React from 'react';
import {createAppContainer} from 'react-navigation'
import AppDrawerNavigation from './layout/navigation/Navigation';
import store from './store';
import {Provider} from 'react-redux'
import {loadUser} from './actions/authActions';
import {removeCart} from './actions/cartActions';
import {getCategories} from './actions/categoryActions';
import {getBusiness} from './actions/businessActions';
let Navigation = createAppContainer(AppDrawerNavigation);
import {BUSINESS_ID} from './properties'
import {connect} from 'react-redux';
import Login from './layout/login/Login';
import {View} from 'react-native';
import {YellowBox} from 'react-native';
class App extends React.Component {

    componentDidMount() {
        this
            .props
            .getBusiness(BUSINESS_ID);
    }
    render() {
        return (<Navigation/>)
    }

}

console.disableYellowBox = true

const mapStateToProps = (state) => ({categories: state.categories, cart: state.cart, business: state.business, products: state.products, auth: state.auth})

export default connect(mapStateToProps, {getCategories, getBusiness, removeCart, loadUser})(App);