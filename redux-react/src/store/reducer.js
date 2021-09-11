import { combineReducers } from 'redux';
import accountReducer from './account';

const reducer = combineReducers({
  account: accountReducer,
});

export default reducer;
