export const LOGIN_TRY = 'LOGIN_TRY'
export const LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL'
export const AUTH_ERROR = 'AUTH_ERROR'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOGOUT_TRY = 'LOGOUT_TRY'

export const logInTry = (id, passwd) => {
	return {
		type: LOGIN_TRY,
		id,
		passwd
	}
}

export const logoutTry = () => {
	return {
		type: LOGOUT_TRY
	}
}

