import {createStore,applyMiddleware,compose, combineReducers} from "redux";
import thunk from "redux-thunk";
import { productsReducers } from "./reducers/productReducers";

const initialState = {};
const composeEnhancer = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;;
const store= createStore(
    combineReducers({
        products: productsReducers,
    }),
    initialState,
    composeEnhancer(applyMiddleware(thunk))

);

export default store