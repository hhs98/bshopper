import axios from "axios";
import {
    SHOP_CREATE_FAIL,
    SHOP_CREATE_REQUEST,
    SHOP_CREATE_SUCCESS,
    SHOP_DELETE_FAIL,
    SHOP_DELETE_REQUEST,
    SHOP_DELETE_SUCCESS,
    SHOP_DETAILS_FAIL,
    SHOP_DETAILS_REQUEST,
    SHOP_DETAILS_SUCCESS,
    SHOP_LIST_FAIL,
    SHOP_LIST_REQUEST,
    SHOP_LIST_SUCCESS,
    SHOP_UPDATE_FAIL,
    SHOP_UPDATE_REQUEST,
    SHOP_UPDATE_SUCCESS
} from "../constants/ShopConstants";

export const listShops = (user = '', level = '') => async (dispatch) => {
    try {
        dispatch({type: SHOP_LIST_REQUEST});

        const {data} = await axios.get(`/api/shops?user=${user}&level=${level}`);

        dispatch({
            type: SHOP_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: SHOP_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const listShopDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: SHOP_DETAILS_REQUEST});

        const {data} = await axios.get(`/api/shops/${id}/`);

        dispatch({
            type: SHOP_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: SHOP_DETAILS_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const deleteShop = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SHOP_DELETE_REQUEST
        })

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.delete(
            `/api/shops/delete/${id}`,
            config
        )
        dispatch({
            type: SHOP_DELETE_SUCCESS
        })

    } catch (error) {
        dispatch({
            type: SHOP_DELETE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
}

export const createShop = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: SHOP_CREATE_REQUEST
        })

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post(
            `/api/shops/create/`,
            {'id': userInfo.id},
            config
        )
        dispatch({
            type: SHOP_CREATE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: SHOP_CREATE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
}

export const updateShop = (shop) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SHOP_UPDATE_REQUEST
        })

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(
            `/api/shops/update/${shop.id}/`,
            shop,
            config
        )
        dispatch({
            type: SHOP_UPDATE_SUCCESS,
            payload: data,
        })
        dispatch({
            type: SHOP_DETAILS_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: SHOP_UPDATE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
}