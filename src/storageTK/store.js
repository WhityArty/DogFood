import { configureStore } from '@reduxjs/toolkit';
import api from '../utils/api';
import userSlice from './user/userSlice';

const store = configureStore({
    reducer: {
        user: userSlice,
        // product: {}
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        thunk: {
            extraArgument: api
        }
    })
});


export default store;