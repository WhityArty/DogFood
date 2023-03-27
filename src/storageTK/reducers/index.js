import { combineReducers } from 'redux';
import productsReducer from './productsReducer'
import userReducer from './userReducer';

export const rootReducer = combineReducers({
    products: productsReducer,
    user: userReducer
})