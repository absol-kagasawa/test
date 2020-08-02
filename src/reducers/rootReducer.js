import {combineReducers} from 'redux';
import controllerReducer from './controllerReducer';
export const rootReducer = combineReducers({
  controllerReducer,
});
