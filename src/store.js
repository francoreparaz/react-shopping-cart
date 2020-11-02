import {createStore,applyMiddleware,compose, combineReducers} from "redux";
import thunk from "redux-thunk";
import { productsReducers } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducer";

const initialState = {};
const composeEnhancer = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;;
const store= createStore(
    combineReducers({
        products: productsReducers,
        cart: cartReducer
    }),
    initialState,
    composeEnhancer(applyMiddleware(thunk))

);

export default store