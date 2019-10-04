import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers/index';

const configureStore = () => {
    return createStore(reducers, applyMiddleware(thunkMiddleware));
};

export default configureStore;