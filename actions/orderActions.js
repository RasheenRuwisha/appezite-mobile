import { ADD_CART, GET_CART, CART_LOADED, AUTH_ERROR, GET_ORDERS, ORDERS_LOADED } from "./types";
import axios from 'axios';
import {returnErrors} from './errorActions';
import { BUSINESS_ID, BASE_URL } from '../properties' 

export const loadOrders = () => (dispatch, getState) => {
    dispatch({type: GET_ORDERS});

    let businessId = getState().business.business.businessId;

    axios
        .get(`${BASE_URL}/getBusinessUserOrder?businessId=${businessId}`, tokenConfig(getState))
        .then(res => {
            console.log(res)
            dispatch({type: ORDERS_LOADED, payload: res.data})
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