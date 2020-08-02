import {createStore} from 'redux';
import {applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {rootReducer} from './reducers/rootReducer';

const rootStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
};

export default rootStore;
