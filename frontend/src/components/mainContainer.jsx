import React, { Component } from 'react'
import {connect} from 'react-redux'

import {auths} from '../actions/index'

import LoginSection from './LoginSection'
import MeetingList from './MeetingList'

class MainContainer extends Component {
	render() {
		return(
			<div>
				{
					(this.props.isAuthenticated) ? <MeetingList />
						: <LoginSection />
				}
			</div>
		)
	}
}


const mapStateToProps = state => {
	return {
		isAuthenticated: state.auths.isAuthenticated,
	}
}

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => {
      dispatch(auths.logInTry(username, password))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
