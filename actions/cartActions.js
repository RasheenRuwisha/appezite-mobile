import { ADD_CART, GET_CART, CART_LOADED, AUTH_ERROR, CART_UPDATED, PLACE_ORDER, ORDER_PLACED,ADD_INIT_CART, UPDATE_CART } from "./types";
import axios from 'axios';
import {returnErrors} from './errorActions';
import {AsyncStorage} from 'react-native';
import { BUSINESS_ID } from '../properties' 

export const initCart = (businessId, email) => (dispatch,getState) => {

    const bodyJson = {
        businessId: businessId,
        customerEmail: email,
        products: [],
        docType: "Cart"
    }
    const body = JSON.stringify(bodyJson);

    axios
        .post('http://localhost:8082/createBusinessUserCart', body, tokenConfig(getState))
        .then(res => {
            dispatch({type: ADD_INIT_CART, payload: res.data})
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'CART_INIT_FAILED'));
        })
}


export const updateCart = () => (dispatch) =>{
    dispatch({type: UPDATE_CART})
}

export const loadCart = () => (dispatch, getState) => {
    dispatch({type: GET_CART});

    let businessId = BUSINESS_ID;
    const jsonBody = {businessId: businessId}
    const body = JSON.stringify(jsonBody)
    axios
        .post(`http://localhost:8082/getBusinessUserCart`,body, tokenConfig(getState))
        .then(res => {
            console.log(res)
            dispatch({type: CART_LOADED, payload: res.data})
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({type: AUTH_ERROR});
        })
}


export const addToCart= (cartItem) => (dispatch,getState) => {
    let cart =  getState().cart.cart;
    console.log(getState())
    cart.products.push(cartItem);
    axios
        .post(`http://localhost:8082/addProductBusinessUserCart`,JSON.stringify(cart), tokenConfig(getState))
        .then(res => {
            dispatch({type: CART_UPDATED, payload: res.data})
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({type: AUTH_ERROR});
        })
}

export const removeCart= (index) => (dispatch,getState) => {
    let cart =  getState().cart.cart;
    console.log(cart)
    cart.products.splice(index,1);
    axios
        .post(`http://localhost:8082/addProductBusinessUserCart`,JSON.stringify(cart), tokenConfig(getState))
        .then(res => {
            dispatch({type: CART_UPDATED, payload: res.data})
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({type: AUTH_ERROR});
        })
}

export const removeAllCart= () => (dispatch,getState) => {
    let cart =  getState().cart.cart;
    cart.products = [];
    axios
        .post(`http://localhost:8082/addProductBusinessUserCart`,JSON.stringify(cart), tokenConfig(getState))
        .then(res => {
            dispatch({type: CART_UPDATED, payload: res.data})
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({type: AUTH_ERROR});
        })
}


export const placeOrder = (order) => (dispatch, getState) =>{
    dispatch({type: PLACE_ORDER});
    axios
    .post(`http://localhost:8082/placeOrder`,JSON.stringify(order), tokenConfig(getState))
    .then(res => {
        dispatch(removeAllCart())
        dispatch({type: ORDER_PLACED, payload: res.data});
    })
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({type: AUTH_ERROR});
    })
}

export const tokenConfig = getState => {
    const token = getState().auth.token;

    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config
}