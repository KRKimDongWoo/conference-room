import { combineReducers } from 'redux'
import auths from './Auth'
import meetings from './Meeting'

const rootReducer = combineReducers({
	auths,
	meetings,
})

export default rootReducer
