import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import validateInput from '../../../shared/validations/signup'
import TextFieldGroup from '../textField/textFieldGroup'

/**
  * SignUpForm
  *
  * Component
  *
  */
class SignUpForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      errors: {},
      invalid: false
    }

    // bind(this) permet de recupérer le contexte de la class courante
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.checkUserExists = this.checkUserExists.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    const { userSignupRequest } = this.props
    e.preventDefault()

    // Si le form est correctement rempli
    // Axios post request into bdd to add a user
    if (this.isValid()) {
      const { history } = this.props
      userSignupRequest(this.state).then(
        // Succes Sign up
        () => {
          history.push('/login')
        },
        (err) => {
          console.log(err)
        }
      )
    }
  }

  /**
   * Check if user exist
   * @param {event} e
   */
  checkUserExists(e) {
    const { isUserExists } = this.props
    const { errors } = this.state

    const val = e.target.value
    const field = e.target.name

    if (val !== '') {
      isUserExists(val).then((res) => {
        let invalid
        if (res) {
          errors[field] = `Cet ${field} existe déja`
          invalid = true
        } else {
          errors[field] = ''
          invalid = false
        }
        this.setState({ errors, invalid })
      })
    }
  }

  /**
   * isValid
   * Check if input value is valid
   * @return {Boolean} isValid
   */
  isValid() {
    const { errors, isValid } = validateInput(this.state)

    if (!isValid) {
      this.setState({ errors })
    }

    return isValid
  }

  render() {
    const {
      errors,
      username,
      email,
      password,
      passwordConfirmation,
      invalid
    } = this.state

    return (
      <div id="login-form">
        <div className="main-div">
          <div className="panel">
            <h2>Sign in</h2>
            <p>Join our community!</p>
          </div>
          <form onSubmit={this.onSubmit}>

            <TextFieldGroup
              error={errors.username}
              label="Username"
              onChange={this.onChange}
              checkUserExists={this.checkUserExists}
              value={username}
              field="username"
            />

            <TextFieldGroup
              error={errors.email}
              label="Email"
              onChange={this.onChange}
              checkUserExists={this.checkUserExists}
              value={email}
              field="email"
            />

            <TextFieldGroup
              error={errors.password || errors.passwordConfirmation}
              label="Password"
              onChange={this.onChange}
              value={password}
              field="password"
              type="password"
            />

            <TextFieldGroup
              error={errors.passwordConfirmation}
              label="Password Confirmation"
              onChange={this.onChange}
              value={passwordConfirmation}
              field="passwordConfirmation"
              type="password"
            />

            <a href="/login">Avez-vous déja un compte?</a>
            <div className="form-group">
              <button type="submit" disabled={invalid} className="btn btn-primary btn-lg">
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(SignUpForm)
