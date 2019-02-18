import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login'
import { withRouter } from 'react-router-dom'
import { loginFacebook } from './actions/index'

class Facebook extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: false,
      userID: '',
      name: '',
      email: '',
      picture: ''
    }

    // bind(this) permet de recupérer le contexte de la class courante
    this.responseFacebook = this.responseFacebook.bind(this)
    this.componentClicked = this.componentClicked.bind(this)
  }

  responseFacebook(response) {
    this.setState({
      isLoggedIn: true,
      userID: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url
    })
  }

  componentClicked() {
    const { history } = this.props

    loginFacebook(this.state).then((res) => {
      console.log('response login fb: ', res)
      history.push('/accueilUser')
    })
  }

  render() {
    let fbContent
    const { history } = this.props
    const {
      picture,
      name,
      email,
      isLoggedIn
    } = this.state

    if (isLoggedIn) {
      history.push('/accueilUser')

      fbContent = (
        <div
          style={{
            width: '400px',
            margin: 'auto',
            background: '#f4f4f4',
            padding: '20px'
          }}
        >
          <img src={picture} alt={name} />
          <h2>
            Welcome
            {name}
          </h2>
          Email:
          {email}
        </div>
      )
    } else {
      fbContent = (
        <FacebookLogin
          appId="1170881536426279"
          fields="name,email,picture"
          onClick={this.componentClicked}
          callback={this.responseFacebook}
        />
      )
    }

    return <div>{fbContent}</div>
  }
}

export default withRouter(Facebook)
