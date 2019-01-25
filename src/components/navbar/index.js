import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from './actions'
import './index.css'

class NavBar extends Component {
  logout(e) {
    e.preventDefault()
    logout()
  }

  render() {
    const { auth } = this.props

    const guestLinks = (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">S.Y.T</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li>
                <a href="/signup">
                  Sign up
                  <span className="sr-only">(current)</span>
                </a>
              </li>
              <li>
                <a href="/login">
                  login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )

    const userLinks = (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <a className="navbar-brand" href="#">S.Y.T</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li>
                <a href="/accueilUser">
                  Accueil
                  <span className="sr-only">(current)</span>
                </a>
              </li>
              <li><a href="/profil">Profil</a></li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                  Categories
                  <span className="caret" />
                </a>
                <ul className="dropdown-menu">
                  <li><a href="/foot">Foot</a></li>
                  <li><a href="#">Tennis</a></li>
                  <li><a href="#">Rugby</a></li>
                  <li><a href="#">Judo</a></li>
                </ul>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                  Moi
                  <span className="caret" />
                </a>
                <ul className="dropdown-menu">
                  <li><a href="/profil">Editer mon profil</a></li>
                  <li><a href="/mesMessages">Mes messages</a></li>
                </ul>
              </li>
              <li><a href="/logout" onClick={this.logout.bind(this)}>Deconnexion</a></li>
            </ul>
          </div>
        </div>
      </nav>
    )

    return (
      <div>
        { auth.isAuthentificated ? userLinks : guestLinks }
      </div>
    )
  }
}

/**
 * mapStateToProps
 * Me permet de récupére la state du store (ici auth)
 * Et le passe en paramètre dans les props avec connect(props, actions)
 * De sorte a pourvoir vérifier si l'utilisateur est connecté
 */
function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { logout })(NavBar)
