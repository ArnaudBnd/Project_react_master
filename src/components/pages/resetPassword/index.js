import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { checkIsUserTokenExist, updateResetPassword } from './actions/index'
import validatePassword from '../../../../shared/validations/resetPassword'
import TextFieldGroup from '../../textField/textFieldGroup'

class ResetPassword extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      update: false,
      isLoaded: true,
      errors: {}
    }

    this.updatePassword = this.updatePassword.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.isValid = this.isValid.bind(this)
    this.resetFrom = this.resetFrom.bind(this)
  }

  /**
   * LifeCycle
   * Action checkIsUserTokenExist(match.params.token)
   * Vérification de la validité du token
   * Avant d'acceder à la page
   *
   */
  componentDidMount() {
    const { match, history } = this.props

    checkIsUserTokenExist(match.params.token).then((res) => {
      if (res.data.message === 'password can be reset' && res.status === 200) {
        this.setState({
          username: res.data.username,
          update: false,
          isLoaded: false,
          errors: {}
        })
      } else {
        this.setState({
          update: false,
          isLoaded: false,
          errors: {}
        })
        // redirection de l'utilisateur car token expiré
        history.push('/forgotPassword')
      }
    })
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  /**
   * Si les champs sont valide
   * Action updateResetPassword(this.state)
   * @return Boolean isValid/errors
   */
  isValid() {
    const { errors, isValid } = validatePassword(this.state)

    if (!isValid) {
      this.setState({ errors })
    }

    return isValid
  }

  /**
   * Reset le fomulaire
   * apres envoie du mail
   */
  resetFrom() {
    document.getElementById('formUpdatePassword').reset()
  }

  /**
   * Update le mpd
   * Action updateResetPassword(this.state)
   * @param e
   */
  updatePassword(e) {
    e.preventDefault()
    const { history } = this.props

    if (this.isValid()) {
      // add an action to update en base
      updateResetPassword(this.state).then(() => {
        history.push('/login')
      })
    }
    this.resetFrom()
  }

  render() {
    const { errors } = this.state
    console.log('render')

    return (
      <div>
        <div className="col-md-6 col-md-offset-3">
          <form id="formUpdatePassword" onSubmit={this.updatePassword}>
            <h1>Changez votre mot de passe</h1>

            <TextFieldGroup
              error={errors.confirmPassword}
              label="Password"
              onChange={this.handleChange}
              field="password"
              type="text"
            />

            <TextFieldGroup
              error={errors.confirmPassword}
              label="Confirm password"
              onChange={this.handleChange}
              field="confirmPassword"
              type="text"
            />

            <br />
            <button type="submit" className="btn btn-primary">Update</button>
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(ResetPassword)
