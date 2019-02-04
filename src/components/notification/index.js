import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllPost } from './actions/index'

import './index.css'

class Notification extends Component {
  constructor(props) {
    super(props)

    this.state = {
      allPostFromUser: [],
      arrayAllPost: []
    }

    this.displayNotifCom = this.displayNotifCom.bind(this)
    this.showNotifCom = this.showNotifCom.bind(this)
    this.getAllPostFromUser = this.getAllPostFromUser.bind(this)
  }

  componentDidMount() {
    this.getAllPostFromUser()
  }

  componentWillReceiveProps(nextProps) {
    const { allPostFromUser } = this.state
    let tmp = null
    const array = []

    // En fct de tout les posts du user
    // on va chercher les coms crées
    allPostFromUser
      .map((post) => {
        // COM ADD DELETE FOOT
        if (nextProps
          .foot
          .dispatchAllComsFoot !== undefined && nextProps.foot.dispatchAllComsFoot !== null) {
          tmp = nextProps.foot.dispatchAllComsFoot
            .filter(postFoot => post.id === postFoot.idPost)
          if (tmp.length !== 0) {
            array.push(tmp)
          }
          // on recupère chaque commentaire pour les posts d'un user connecté
        }

        // COM ADD DELETE DISPLAYPOSTFROMACCUEIL
        if (nextProps
          .displayPostFromAccueil
          .dispatchAllComs !== undefined
          && nextProps.displayPostFromAccueil.dispatchAllComs !== null) {
          tmp = nextProps.displayPostFromAccueil.dispatchAllComs
            .filter(postDisplay => post.id === postDisplay.idPost)
          if (tmp.length !== 0) {
            array.push(tmp)
          }
        }

        return array
      })

    this.setState({
      arrayAllPost: array
    })
  }

  getAllPostFromUser() {
    const { auth } = this.props

    getAllPost(auth.auth.id).then((allPost) => {
      this.setState({
        allPostFromUser: allPost
      })
    })
  }

  displayNotifCom(user, comment, date) {
    console.log('here')
    return (
      <li className="notification-box">
        <div className="row">
          <div className="col-lg-3 col-sm-3 col-3 text-center">
            <img alt="" src="/demo/man-profile.jpg" className="w-50 rounded-circle" />
          </div>
          <div className="col-lg-8 col-sm-8 col-8">
            <strong className="text-info">{user}</strong>
            <div>
              {comment}
            </div>
            <small className="text-warning">{new Date(date).toLocaleDateString()}</small>
          </div>
        </div>
      </li>
    )
  }

  showNotifCom() {
    const { arrayAllPost } = this.state
    const arrayToDisplayPost = []

    for (let i = 0; i < arrayAllPost.length; i += 1) {
      arrayAllPost[i]
        .map(post => arrayToDisplayPost.push(post))
    }

    return (
      arrayToDisplayPost
        .map(post => this.displayNotifCom(
          post.user,
          post.comment,
          post.date
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
    displayPostFromAccueil: state.displayPostFromAccueil,
    foot: state.foot,
    auth: state.auth
  }
}

export default connect(mapStateToProps, null)(Notification)
