import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllComFomUser } from './actions/index'

import './index.css'

class Notification extends Component {
  constructor(props) {
    super(props)

    this.state = {
      allComToDisplayFromUser: []
    }

    this.displayNotifCom = this.displayNotifCom.bind(this)
    this.getAllComFromUser = this.getAllComFromUser.bind(this)
    this.showNotifCom = this.showNotifCom.bind(this)
  }

  componentDidMount() {
    this.getAllComFromUser()

    if (window.socket !== null) {
      console.log('--> notification envoyé')
      window.socket.on('userDataToNotify', (data) => {
        console.log('userDataToNotify', data)
      })
    } else {
      console.log('--> notification nop')
    }
  }

  getAllComFromUser() {
    const { auth } = this.props

    getAllComFomUser(auth.auth.username).then((res) => {
      // On crée que les notifs des coms qui sont pas celui du user connecté
      const tmp = res.filter(com => com.user !== auth.auth.username)
      this.setState({
        allComToDisplayFromUser: tmp
      })
    })
  }

  displayNotifCom(user, comment, date, idPost) {
    return (
      <li className="notification-box">
        <a href={`/displayPostFromAccueil/${idPost}`}>
          <div className="row">
            <div className="col-lg-8 col-sm-8 col-8">
              <strong className="text-info">{user}</strong>
              <div>
                {comment}
              </div>
              <small className="text-warning">{new Date(date).toLocaleDateString()}</small>
            </div>
            <div className="col-lg-1 col-sm-3 col-3">
              <span className="badge pull-right">foot</span>
            </div>
          </div>
        </a>
      </li>
    )
  }

  showNotifCom() {
    const { allComToDisplayFromUser } = this.state

    return (
      allComToDisplayFromUser
        .map(post => this.displayNotifCom(
          post.user,
          post.comment,
          post.date,
          post.idPost
        ))
    )
  }

  render() {
    return (
      <li className="nav-item dropdown">
        <a className="nav-link text-light" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i className="fa fa-bell" />
        </a>
        <ul className="dropdown-menu">
          <li className="head text-light bg-dark">
            <div className="col-lg-12 col-sm-12 col-12">
              <span>Notifications (3)</span>
              {' '}
              <a href="" className="float-right text-light">Mark all as read</a>
            </div>
          </li>
          {this.showNotifCom()}
          <li className="footer bg-dark text-center">
            <a href="" className="text-light">View All</a>
          </li>
        </ul>
      </li>
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

export default connect(mapStateToProps, null)(Notification)
