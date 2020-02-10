import { USER_LOADING, USER_LOADED, LOGIN_SUCCESS, REGISTER_SUCCESS, AUTH_ERROR, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_FAIL, TOKEN_ADDED } from '../actions/types';
import {AsyncStorage} from 'react-native';

const initialState = {
    token: AsyncStorage.getItem('token'),
    isAuthenticated:null,
    isLoading:false,
    user:null
}

export default function(state = initialState, action){
    switch(action.type){
        case USER_LOADING:
            return{
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            return{
                ...state, 
                isAuthenticated:true,
                isLoading:false,
                user:action.payload
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            console.log(action.payload)
            AsyncStorage.setItem('token', action.payload.token);
            AsyncStorage.setItem('email',  action.payload.user[0].email);
            return{
                ...state, 
                ...action.payload, 
                isAuthenticated:true,
                isLoading:false,
            };
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            AsyncStorage.removeItem('token');
            AsyncStorage.removeItem('email');
            return{
                ...state,
                token:null,
                user:null,
                isAuthenticated:false,
                isLoading:false
            };
        case AUTH_ERROR:
            return{
                ...state,
                token:null,
                user:null,
                isAuthenticated:false,
                isLoading:false
            };
        case TOKEN_ADDED:
            return{
                ...state,
                token:action.payload
            }
        default:
            return state;         

    }
}