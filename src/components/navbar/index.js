import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from './actions'

class NavBar extends Component {
  logout(e) {
    e.preventDefault()
    logout()
  }

  render() {
    const { auth } = this.props

    const guestLinks = (
      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul className="navbar-nav ml-auto">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/signup">
                Sign up
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/login">
                Login
              </a>
            </li>
          </ul>
        </ul>
      </div>
    )

    const userLinks = (
      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul className="navbar-nav ml-auto">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/accueilUser">
                Accueil
              </a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Catégories
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a className="dropdown-item" href="/foot">Foot</a>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                About me
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a className="dropdown-item" href="/profil">Editer mon profil</a>
                <a className="dropdown-item" href="/mesMessages">Mes messages</a>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/logout" onClick={this.logout.bind(this)}>
                Logout
              </a>
            </li>
          </ul>
        </ul>
      </div>
    )

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">S.Y.T</a>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          { auth.isAuthentificated ? userLinks : guestLinks }
        </div>
      </nav>
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
