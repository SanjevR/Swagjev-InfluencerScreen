import { createStore, combineReducers } from 'redux';
import formReducer from './formReducer';

const rootReducer = combineReducers({
    form: formReducer,
});

const store = createStore(rootReducer);

export default store;
