import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoginForm from './loginForm'
import { login } from './actions/index'
import './index.css'

class Login extends Component {
  render() {
    return (
      <div id="LoginForm">
        <LoginForm login={login} />
      </div>
    )
  }
}

export default connect(null, null)(Login)
