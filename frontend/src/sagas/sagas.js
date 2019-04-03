import { take, put, call, fork, select } from 'redux-saga/effects'
import api from '../services/api'
import * as actions from '../actions/index'

const loginUrl= 'http://127.0.0.1:8000/users/login/'
const meetingUrl= 'http://127.0.0.1:8000/meetings/'
const userUrl= 'http://127.0.0.1:8000/users/'

export function* logInTryRequest(name, passwd) {
	const ret = yield call(api.logIn, loginUrl, name, passwd)
	console.log('login in ' + name + ' and ' + passwd)
	if(ret.status === 200) {
		yield put({type: actions.auths.LOGIN_SUCCESSFUL, data: ret.data, username: name})
	}
	else if (ret.status === 403 || ret.status === 401) {
		yield put({type: 'AUTHENTICATION_ERROR', data: ret.data})
	}
	else {
		yield put({type: 'REGISTRATION_FAILED', data: ret.data})
	}
}

export function* watchLogInTryRequest() {
	while(true) {
		const { id, passwd } = yield take(actions.auths.LOGIN_TRY)
		yield call (logInTryRequest, id, passwd)
	}
}

export function* getMeeting() {
	const token = yield select(state => (state.auths.token))
	const { status, data } = yield call(api.getMeeting, meetingUrl, token)
	if(status >= 400) {
		console.log('An error occured, error code : ' + status)
	}
	else {	
		yield put({type: actions.meetings.GET_MEETING, meetings: data})
	}
}

export function* watchGetMeetingRequest() {
	while(true) {
		yield take(actions.meetings.GET_MEETING_REQUEST)
		yield call(getMeeting) 
	}
}

export function* postMeeting(meeting) {
	const token = yield select(state => (state.auths.token))
	const { status, data } = yield call(api.postMeeting, meetingUrl, meeting, token)
	if(status >= 400) {
		console.log('An error occured, error code : ' + status)
	}
	else {	
		yield put({type: actions.meetings.POST_MEETING, meeting: data})
	}
}

export function* watchPostMeetingRequest() {
	while(true) {
		const { meeting } = yield take(actions.meetings.POST_MEETING_REQUEST)
		console.log('post detected')
		yield call(postMeeting, meeting)
	}
}

export function* putMeeting(index, meeting) {
	const token = yield select(state => (state.auths.token))
	const id = yield select(state => (state.meetings.meetings[index].id))
	const { status, data } = yield call(api.putMeeting, meetingUrl, id, meeting, token)
	if(status >= 400) {
		console.log('An error occured, error code : ' + status)
	}
	else {	
		yield put({type: actions.meetings.PUT_MEETING, index: index, meeting: data})
	}
}

export function* watchPutMeetingRequest() {
	while(true) {
		const { index, meeting } = yield take(actions.meetings.PUT_MEETING_REQUEST)
		console.log('put detected')
		yield call(putMeeting, index, meeting)
	}
}

export function* deleteMeeting(index) {
	const token = yield select(state => (state.auths.token))
	const id = yield select(state => (state.meetings.meetings[index].id))
	const status = yield call(api.deleteMeeting, meetingUrl, id, token)
	if(status >= 400) {
		console.log('An error occured, error code : ' + status)
	}
	else {
		yield put({type: actions.meetings.DELETE_MEETING, index: index})
	}
}

export function* watchDeleteMeetingRequest() {
	while(true) {
		const { index } = yield take(actions.meetings.DELETE_MEETING_REQUEST)
		yield call(deleteMeeting, index)
	}
}

export function* getUser() {
	const token = yield select(state => (state.auths.token))
	const { status, data } = yield call(api.getMeeting, userUrl, token)
	if(status >= 400) {
		console.log('An error occured, error code : ' + status)
	}
	else {
		yield put({type: actions.meetings.GET_USER, users: data})
	}
}

export function* watchGetUserRequest() {
	while(true) {
		yield take(actions.meetings.GET_USER_REQUEST)
		yield call(getUser)
	}
}

export default function* rootSaga() {
	yield fork(watchLogInTryRequest)
	yield fork(watchGetMeetingRequest)
	yield fork(watchPostMeetingRequest)
	yield fork(watchPutMeetingRequest)
	yield fork(watchDeleteMeetingRequest)
	yield fork(watchGetUserRequest)
}
