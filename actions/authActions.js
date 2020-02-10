import axios from 'axios';
import {returnErrors} from './errorActions';
import {initCart, loadCart} from './cartActions';
import {AsyncStorage} from 'react-native';
import {USER_LOADING, USER_LOADED, AUTH_ERROR, REGISTER_SUCCESS, REGISTER_FAIL, LOGOUT_SUCCESS, LOGIN_SUCCESS, LOGIN_FAIL, TOKEN_ADDED} from './types';
import { BUSINESS_ID } from '../properties' 

export const loadUser = () => (dispatch, getState) => {
    dispatch({type: USER_LOADING});

    let businessId =BUSINESS_ID ;
    const jsonBody = {businessId: businessId}
    const body = JSON.stringify(jsonBody)
    axios
        .post(`http://localhost:8082/getBusinessUser`,body, tokenConfig(getState))
        .then(res => {
            dispatch(loadCart());
            dispatch({type: USER_LOADED, payload: res.data});
            dispatch(loadCart());
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({type: AUTH_ERROR});
        })
}

export const register = ({businessId, email, password}) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({businessId, email, password});

    axios
        .post('http://localhost:8082/createBusinessUser', body, config)
        .then(res => {
            dispatch({type: REGISTER_SUCCESS, payload: res.data});
            dispatch(initCart(businessId,email))
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({type: REGISTER_FAIL})
        })
}

export const logout = () => {
    return{
        type: LOGOUT_SUCCESS
    }
}

export const login = ({businessId, email, password}) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({businessId, email, password});

    axios
        .post('http://localhost:8082/loginBusinessUser', body, config)
        .then(res => {
            dispatch({type: LOGIN_SUCCESS, payload: res.data});
            dispatch(loadCart());
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({type: LOGIN_FAIL})
        })
}

export const addTokenToState = (token) =>  dispatch => {
    dispatch({type:TOKEN_ADDED, payload:token});
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