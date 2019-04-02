const initialState = {
	meetings: []
}

export default function meetings(state=initialState, action) {
	let meetingList = state.meetings.slice()

	switch (action.type) {
		case 'GET_MEETING':
			console.log('GET : ')
			return Object.assign({}, state, {
				meetings: action.meetings
			})

		case 'POST_MEETING':
			console.log('POST : ' + action.meeting.sinceWhen + ' ~ ' + action.meeting.tilWhen)
			return Object.assign({}, state, {
				meetings: [
					...state.meetings,
					action.meeting
				]
			})

		case 'PUT_MEETING':
			console.log('PUT : ' + action.index + ' to ' +
				action.meeting.sinceWhen + ' ~' +
				action.meeting.tilWhen)

			meetingList.splice(action.index, 1, action.meeting)
		
			return Object.assign({}, state, {
				meetings: meetingList
			})

		case 'DELETE_MEETING':
			console.log('DELETE : ' + 
				meetingList[action.index].sinceWhen + ' ~ ' + 
				meetingList[action.index].tilWhen)

			meetingList.splice(action.index, 1)
			return Object.assign({}, state, {
				meetings: meetingList
			})

		default:
			console.log(action.type)
			return state
	}
}


