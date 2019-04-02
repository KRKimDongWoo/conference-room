import React, {Component} from 'react'
import {connect} from 'react-redux'

import {meetings, auths} from '../actions'

class MeetingList extends Component {
	state = {
		sinceWhen: "",
		tilWhen: "",
		updateSinceWhen: "",
		updateTilWhen: "",
		updatedMeetingId: null,
	}

	resetForm = () => {
		this.setState({
			sinceWhen: "",
			tilWhen: "",
			updateSinceWhen: "",
			updateTilWhen: "",
			updatedMeetingId: null,
		})
	}
	
	componentDidMount() {
		this.props.getMeetingRequest()
	}
	
	onSubmit = (e) => {
		e.preventDefault()
		this.props.postMeetingRequest({
			sinceWhen: this.state.sinceWhen,
			tilWhen: this.state.tilWhen,
		})
		this.resetForm()
	}

	chooseUpdate = (index) => {
		this.setState({
			updatedMeetingId: index,
		})
	}

	confirmUpdate = (e) => {
		e.preventDefault()
		console.log('Dealing with : ' +  this.state.updatedMeetingId)
		console.log('to ' + this.state.updateSinceWhen + '~' + this.state.updateTilWhen)
		this.props.putMeetingRequest(this.state.updatedMeetingId, {
			sinceWhen: this.state.updateSinceWhen,
			tilWhen: this.state.updateTilWhen,
		})

		this.resetForm()
	}
	
	render() {
		return (
			<div>
				<h1> Welcome back, {this.props.username}! </h1>
				<button onClick={(e) => this.props.logoutRequest()}>Log out </button>

				<hr />
				
				<h2>Add or modify the meeting list.</h2>	
				<form onSubmit={this.onSubmit}>
					<fieldset>
						<legend>Add New Meetings</legend>
						<p>
							<label htmlFor="sinceWhen">since : </label>
							<input
								type="datetime-local" id="sinceWhen"
								onChange={e => this.setState({sinceWhen: e.target.value})} />
						</p>
						<p>
							<label htmlFor="tilWhen">until : </label>
							<input
								type="datetime-local" id="tilWhen"
								onChange={e => this.setState({tilWhen: e.target.value})} />
						</p>
						<p>
							<button type="submit">Add meeting</button>
						</p>
					</fieldset>
				</form>

				<h2> Meeting Lists </h2>
				
				<table>
					<tbody>
						<tr key={'column_name'}>
							<td> Owner </td>
							<td> Reservation time </td>
							<td> Edit </td>
							<td> Delete </td>
						</tr>
						{this.props.meetings.map((meeting, index) => {
							return (this.state.updatedMeetingId===index) ? 
								<tr key={`meeting_update_${index}`}>
									<td>User {meeting.user}</td>
									<td>
										<input
											type="datetime-local" id="updateSinceWhen"
											onChange={e => this.setState({updateSinceWhen: e.target.value})} />
										{'~'}
										<input
											type="datetime-local" id="updateTilWhen"
											onChange={e => this.setState({updateTilWhen: e.target.value})} />
									</td>
									<td>
										<button onClick={(e) => this.confirmUpdate(e)}>Confirm</button>
									</td>
								</tr>
								:
								<tr key={`meeting_${index}`}>
									<td>User {meeting.user}</td>
									<td>{meeting.sinceWhen} ~ {meeting.tilWhen}</td>
									<td><button onClick={() => this.chooseUpdate(index)}>Edit</button></td>
									<td><button onClick={() => this.props.deleteMeetingRequest(index)}>Delete</button></td>
								</tr>
						})}
					</tbody>
				</table>

			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		meetings : state.meetings.meetings,
		username : state.auths.username,
	}

}

const mapDispatchToProps = dispatch => {
	return {
		getMeetingRequest: () => {
			dispatch(meetings.getMeetingRequest())
		},
		postMeetingRequest: (meeting) => {
			dispatch(meetings.postMeetingRequest(meeting))
		},
		putMeetingRequest: (index, meeting) => {
			dispatch(meetings.putMeetingRequest(index, meeting))
		},
		deleteMeetingRequest: (index) => {
			dispatch(meetings.deleteMeetingRequest(index))
		},
		logoutRequest: () => {
			dispatch(auths.logoutTry())
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingList)
