import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllComFomUser, notificationReading } from './actions/index'

import './index.css'

class Notification extends Component {
  constructor(props) {
    super(props)

    this.state = {
      allComToDisplayFromUser: []
    }

    this.onSubmitToReadNotif = this.onSubmitToReadNotif.bind(this)
    this.displayNotifCom = this.displayNotifCom.bind(this)
    this.getAllComFromUser = this.getAllComFromUser.bind(this)
    this.showNotifCom = this.showNotifCom.bind(this)
  }

  componentWillMount() {
    this.getAllComFromUser()

    if (window.socket !== null) {
      // Lorsque le user recoit une notification
      window.socket.on('userDataToNotify', (data) => {
        const { allComToDisplayFromUser } = this.state
        const { auth } = this.props

        if (data.commentToSend.user !== auth.auth.username) {
          allComToDisplayFromUser.push(data.commentToSend)

          this.setState({
            allComToDisplayFromUser
          })
        }
      })
    } else {
      console.log('--> notification nop')
    }
  }

  /**
   * onSubmitToReadNotif
   * actions notificationReading, getAllComFomUser
   * lorsque l'utilisateur clique sur la notification
   * @param e, id_element_notify, read
   */
  onSubmitToReadNotif(e, id_element_notify, read) {
    const { auth } = this.props

    if (read === false) {
      notificationReading(id_element_notify).then((res) => {
        if (res.read) {
          getAllComFomUser(auth.auth.username).then((resp) => {
            // On crée que les notifs des coms qui different du user connecté
            const tmp = resp.filter(com => com.user !== auth.auth.username)
            this.setState({
              allComToDisplayFromUser: tmp
            })
          })
        }
      })
    }
  }

  /**
   * getAllComFromUser
   * Recup tout les posts à notifier
   */
  getAllComFromUser() {
    const { auth } = this.props

    getAllComFomUser(auth.auth.username).then((res) => {
      // On crée que les notifs des coms qui different du user connecté
      const tmp = res.filter(com => com.user !== auth.auth.username)
      this.setState({
        allComToDisplayFromUser: tmp
      })
    })
  }

  /**
   * displayNotifCom
   * Lors du rendu, on affiche les notifications
   * @param read, user, comment, date, idPost, id_element_notify, idMap
   * @return dom HTML
   */
  displayNotifCom(read, user, comment, date, idPost, id_element_notify, idMap) {
    return (
      <li className="notification-box" key={idMap}>
        <a href={`/displayPostFromAccueil/${idPost}`} onClick={e => this.onSubmitToReadNotif(e, id_element_notify, read)} style={read === false ? { backgroundColor: 'silver' } : { backgroundColor: 'white' }}>
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

  /**
   * showNotifCom
   * loop for get data
   */
  showNotifCom() {
    const { allComToDisplayFromUser } = this.state

    return (
      allComToDisplayFromUser
        .map((post, idMap) => this.displayNotifCom(
          post.read,
          post.user,
          post.comment,
          post.date,
          post.idPost,
          post.id_element_notify,
          idMap
        ))
    )
  }

  render() {
    const { allComToDisplayFromUser } = this.state
    const comsNotReads = allComToDisplayFromUser.filter(com => com.read === false)

    return (
      <li className="nav-item dropdown">
        <a className="nav-link text-light" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          { comsNotReads.length > 0
            ? (
              <b>
                Notifications
                (
                {comsNotReads.length}
                )
              </b>
            )
            : 'Notification'
          }
        </a>
        <ul className="dropdown-menu">
          <li className="head text-light bg-dark">
            <div className="col-lg-12 col-sm-12 col-12">
              <span>
              Notifications
              (
                {allComToDisplayFromUser.length}
              )
              </span>
              {' '}
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
