import {GET_CATEGORY, DELETE_CART, ITEMS_LOADING, SEARCH_CATEGORY} from './types';
import axios from 'axios';
import { loadCart } from './cartActions';
import { BUSINESS_ID, BASE_URL } from '../properties' 

export const getCategories = (payload) => dispatch => {
    dispatch(setItemsLoading);
    axios
        .get(`${BASE_URL}/queryAllCategories?email=${payload.email}&businessId=${payload.businessId}`)
        .then(res => {
            console.log("yay")
            dispatch({type: GET_CATEGORY, payload: res.data});
        })
}

export const deleteItem = (id) => {
    return {type: DELETE_CART, payload: id}
}

export const setItemsLoading = () => {
    return {type: ITEMS_LOADING}
}
