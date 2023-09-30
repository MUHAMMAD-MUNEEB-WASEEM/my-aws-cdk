import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import apiBazaarReducer from '../components/api-bazaar/apiBazaarSlice';

const parentReducer = combineReducers({
    user: userReducer,
    apiBazaar: apiBazaarReducer,
})

export default parentReducer;