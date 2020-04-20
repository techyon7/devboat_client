const loginFormReducer = (state = false, action) => {
	switch(action.type) {
		case 'LOGIN_ACTIVE':
			return state = true;
		case 'LOGIN_INACTIVE':
			return state = false;
		default:
			return state;
	}
}

export default loginFormReducer;
