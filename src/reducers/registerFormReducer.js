const registerFormReducer = (state = false, action) => {
	switch(action.type) {
		case 'REGISTER_ACTIVE':
			return state = true;
		case 'REGISTER_INACTIVE':
			return state = false;
		default:
			return state;
	}
}

export default registerFormReducer;
