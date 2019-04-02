const initialState = {
	token: null,
	username: null,
  isAuthenticated: null,
  errors: {},
};


export default function auths(state=initialState, action) {

	switch (action.type) {

		case 'LOGIN_SUCCESSFUL':
			return {...state, 
				isAuthenticated: true, 
				errors: null, 
				username: action.username,
				token: action.data.token
			}

    case 'AUTHENTICATION_ERROR':
    case 'LOGIN_FAILED':
    case 'LOGOUT_TRY':
      localStorage.removeItem("token")
			return {...state,  
				token: null, 
				username: null,
				isAuthenticated: false}

		default:
      return state
  }
}
