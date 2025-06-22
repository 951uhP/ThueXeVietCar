import { combineReducers } from 'redux';
import userReducer from './userReducer';
import bookingReducer from './bookingReducer';

const rootReducer = combineReducers({
    user: userReducer,
    booking: bookingReducer,
});

export default rootReducer;
