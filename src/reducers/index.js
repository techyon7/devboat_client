import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import counterReducer from './counterReducer';
import loginFormReducer from './loginFormReducer';
import registerFormReducer from './registerFormReducer';


const rootReducer = combineReducers({
	counter: counterReducer,
	loginActive: loginFormReducer,
	registerActive: registerFormReducer,
	form: reduxFormReducer
});

export default rootReducer;
