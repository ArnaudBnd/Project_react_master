import React, { Component } from 'react'
import { connect } from 'react-redux'
import SignUpForm from './signupForm'
import { userSignupRequest, isUserExists } from './actions/index'
import '../login/index.css'

class SignUp extends Component {
  render() {
    return (
      <div id="LoginForm">
        <SignUpForm
          userSignupRequest={userSignupRequest}
          isUserExists={isUserExists}
        />
      </div>
    )
  }
}

export default connect(null, null)(SignUp)
