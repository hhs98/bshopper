import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {
    shopCreateReducer,
    shopDeleteReducer,
    shopDetailsReducer,
    shopListReducer,
    shopUpdateReducer
} from "./reducers/ShopReducers";
import {
    productCreateReducer,
    productDeleteReducer,
    productDetailsReducer,
    productListReducer,
    productReviewCreateReducer,
    productTopRatedReducer,
    productUpdateReducer,
} from "./reducers/ProductReducers";
import {favouriteReducer} from "./reducers/favouriteReducers";
import {
    userDeleteReducer,
    userDetailsReducer,
    userListReducer,
    userLoginReducer,
    userRegisterReducer,
    userUpdateProfileReducer,
    userUpdateReducer
} from "./reducers/userReducers";

const reducer = combineReducers({
    shopList: shopListReducer,
    shopDetails: shopDetailsReducer,
    shopDelete: shopDeleteReducer,
    shopCreate: shopCreateReducer,
    shopUpdate: shopUpdateReducer,
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated: productTopRatedReducer,
    favourite: favouriteReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer
});

const favouriteItemsFromStorage = localStorage.getItem("favouriteItems")
    ? JSON.parse(localStorage.getItem("favouriteItems"))
    : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const initialState = {
    favourite: {favouriteItems: favouriteItemsFromStorage},
    userLogin: {userInfo: userInfoFromStorage}
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
