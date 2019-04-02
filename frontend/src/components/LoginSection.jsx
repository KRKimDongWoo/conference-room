import React, {Component} from 'react'
import {connect} from 'react-redux'

import {auths} from '../actions/index'

class LoginSection extends Component {

  state = {
    username: "",
    password: "",
  }
	
  onSubmit = e => {
    e.preventDefault()
		this.props.login(this.state.username, this.state.password)
		this.setState({
			username: '',
			pssword: '',
		})
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <fieldset>
          <legend>Login</legend>
          <p>
            <label htmlFor="username">Username</label>
            <input
              type="text" id="username"
              onChange={e => this.setState({username: e.target.value})} />
          </p>
          <p>
            <label htmlFor="password">Password</label>
            <input
              type="password" id="password"
              onChange={e => this.setState({password: e.target.value})} />
          </p>
          <p>
            <button type="submit">Login</button>
          </p>
        </fieldset>
      </form>
    )
  }
}
const mapStateToProps = state => {
	return {}
}

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => {
      dispatch(auths.logInTry(username, password))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginSection)
