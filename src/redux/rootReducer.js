import { combineReducers } from 'redux';
import authReducer from './auth/reducers';
import cityReducer from './city/reducers';

const rootReducers = combineReducers({
    auth: authReducer,
    city: cityReducer
});

export default rootReducers;