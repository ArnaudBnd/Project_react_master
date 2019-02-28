import React, { Component } from 'react'
import {
  checkIsMailExist
} from './actions/index'
import TextFieldGroup from '../../textField/textFieldGroup'

class ForgotPassword extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      showError: false,
      messageFromServer: '',
      isSent: false,
      errorMailNotExist: ''
    }

    this.sendEmail = this.sendEmail.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.resetForm = this.resetForm.bind(this)
  }

  /**
   * Envoie du mail à l'utilisateur
   * Pour update le mot de passe
   * Action checkIsMailExist(email)
   * @param e
   */
  sendEmail(e) {
    e.preventDefault()
    const { email } = this.state

    checkIsMailExist(email).then((res) => {
      if (res.data.error) {
        this.setState({
          errorMailNotExist: res.data.error,
          isSent: ''
        })
      } else {
        this.setState({
          isSent: true,
          errorMailNotExist: ''
        })
      }
    })
    this.resetForm()
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  /**
   * Reset le fomulaire
   * apres envoie du mail
   */
  resetForm() {
    document.getElementById('formResetPwd').reset()
  }

  render() {
    const { isSent, errorMailNotExist } = this.state

    const mailSent = (
      <h1>Mail has been sent</h1>
    )

    const mailNotSent = (
      <div className="col-md-6 col-md-offset-3">
        <form id="formResetPwd" onSubmit={this.sendEmail}>

          <TextFieldGroup
            error={errorMailNotExist}
            label="Nous allons vous envoyer un email de reinitialisation"
            onChange={this.handleChange}
            field="email"
            type="text"
          />
          <br />
          <button type="submit" className="btn btn-primary">SEND</button>
        </form>
      </div>
    )

    return (
      <div>
        { isSent ? mailSent : mailNotSent }
      </div>
    )
  }
}

export default ForgotPassword
