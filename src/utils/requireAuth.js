import React, { Component } from 'react'
import { connect } from 'react-redux'

/**
 * Check si l'utilisateur est connecté
 * pour acceder aux components qui necessites
 * une authentification (component prit en parametre)
 * @param {Component} ComposedComponent
 */
export default function (ComposedComponent) {
  class Authenticate extends Component {
    // Redirection quand l'utilisateur veut acceder
    // à une page sans être connecté
    componentWillMount() {
      const { isAuthentificated, history } = this.props

      if (!isAuthentificated) {
        history.push('/login')
        alert('Vous devez vous connecter pour avoir accès à cette page')
      }
    }

    // Redirection quand l'utilisateur se deconnect
    componentWillUpdate(nextProps) {
      const { history } = this.props

      if (!nextProps.isAuthentificated) {
        history.push('/login')
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      )
    }
  }

  /**
   * mapStateToProps
   * Me permet de récupére la state du store (ici auth)
   * Et le passe en paramètre dans les props avec connect(props, actions)
   * De sorte a pourvoir vérifier si l'utilisateur est connecté (isAuthentificated)
   */
  function mapStateToProps(state) {
    return {
      isAuthentificated: state.auth.isAuthentificated
    }
  }

  return connect(mapStateToProps)(Authenticate)
}
