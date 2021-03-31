import axios from 'axios'
import {FAVOURITE_ADD_ITEM, FAVOURITE_REMOVE_ITEM} from '../constants/favouriteConstants'

export const addToFavourite = (id) => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/products/${id}`)

    dispatch({
        type: FAVOURITE_ADD_ITEM,
        payload: {
            product: data.id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock
        }
    })
    localStorage.setItem('favouriteItems', JSON.stringify(getState().favourite.favouriteItems))
}

export const removeFromFavourite = (id) => (dispatch, getState) => {
    dispatch({
        type: FAVOURITE_REMOVE_ITEM,
        payload: id,
    })
    localStorage.setItem('favouriteItems', JSON.stringify(getState().favourite.favouriteItems))
}