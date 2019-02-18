import React, { Component } from 'react'
import TextFieldGroup from '../../textField/textFieldGroup'
import {
  sendEmail
} from './actions/index'
import Footer from '../../footer'

import './index.css'

class NousContacter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      email: '',
      phone: '',
      title: '',
      content: '',
      isSent: false,
      errors: ''
    }

    // bind(this) permet de recupérer le contexte de la class courante
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.resetForm = this.resetForm.bind(this)
  }

  onSubmit(e) {
    e.preventDefault()

    sendEmail(this.state).then(() => {
      this.setState({
        isSent: true
      })
    })

    this.resetForm()
  }

  onChange(e) {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value })
  }

  /**
   * Reset form contact
   *
   */
  resetForm() {
    document.getElementById('contact').reset()
  }

  render() {
    const {
      username,
      email,
      phone,
      title,
      content,
      isSent,
      errors
    } = this.state

    const emailHtml = (
      <div className="contenaire">
        <form id="contact" onSubmit={this.onSubmit}>
          <h3>Ecrivez nous un message</h3>

          <TextFieldGroup
            error={errors.username}
            label="Username"
            onChange={this.onChange}
            value={username}
            type="text"
            field="username"
          />
          <TextFieldGroup
            error={errors.username}
            label="Email"
            onChange={this.onChange}
            value={email}
            field="email"
            type="email"
          />
          <TextFieldGroup
            error={errors.username}
            label="Tel"
            onChange={this.onChange}
            value={phone}
            field="phone"
            type="tel"
          />
          <TextFieldGroup
            error={errors.username}
            label="Title"
            onChange={this.onChange}
            value={title}
            field="title"
            type="text"
          />
          <h3 className="control-label">Contenu</h3>
          <textarea type="text" name="content" className="form-control" onChange={this.onChange} value={content} placeholder="Type your message here...." required />

          <button name="submit" type="submit" id="contact-submit" data-submit="...Sending">Envoyer</button>
        </form>
      </div>
    )

    const emailSent = (
      <div className="jumbotron text-xs-center">
        <h1 className="display-3">Merci pour votre message!</h1>
        <p className="lead">
          <strong>Please check your email</strong>
          {' '}
          for further instructions on the subject.
        </p>
        <hr />
        <p>
          Having trouble?
          <a href="/nousContacter">Contact us</a>
        </p>
        <p className="lead">
          <a className="btn btn-primary btn-sm" href="/accueilUser" role="button">Continue to accueil</a>
        </p>
      </div>
    )

    return (
      <div>
        {isSent ? emailSent : emailHtml}
        <Footer />
      </div>
    )
  }
}

export default NousContacter
