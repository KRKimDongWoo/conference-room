export const GET_MEETING_REQUEST = 'GET_MEETING_REQUEST'
export const PUT_MEETING_REQUEST = 'PUT_MEETING_REQUEST'
export const POST_MEETING_REQUEST = 'POST_MEETING_REQUEST'
export const DELETE_MEETING_REQUEST = 'DELETE_MEETING_REQUEST'
export const GET_USER_REQUEST = 'GET_USER_REQUEST'
export const GET_MEETING = 'GET_MEETING'
export const PUT_MEETING = 'PUT_MEETING'
export const POST_MEETING = 'POST_MEETING'
export const DELETE_MEETING = 'DELETE_MEETING'
export const GET_USER = 'GET_USER'

export const getMeetingRequest = () => {
	return {
		type: 'GET_MEETING_REQUEST'
	}
}

export const postMeetingRequest = (meeting) => {
	return {
		type: 'POST_MEETING_REQUEST',
		meeting
	}
}

export const putMeetingRequest = (index, meeting) => {
	return {
		type: 'PUT_MEETING_REQUEST',
		index,
		meeting
	}
}

export const deleteMeetingRequest = (index) => {
	return {
		type: 'DELETE_MEETING_REQUEST',
		index
	}
}

export const getUserRequest = () => {
	return {
		type: 'GET_USER_REQUEST'
	}
}

export const getMeeting = () => {
	return {
		type: 'GET_MEETING'
	}
}

export const postMeeting = (meeting) => {
	return {
		type: 'POST_MEETING',
		meeting
	}
}

export const putMeeting = (index, meeting) => {
	return {
		type: 'PUT_MEETING',
		index,
		meeting
	}
}

export const deleteMeeting = (index) => {
	return {
		type: 'DELETE_MEETING',
		index
	}
}

export const getUser = () => {
	return {
		type: 'GET_USER',
	}
}
