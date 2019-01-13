import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllPostFromUser } from './actions/index'

class MesPosts extends Component {
  constructor(props) {
    super(props)

    this.state = {
      allPosts: []
    }

    this.displayAllPostsFroUser = this.displayAllPostsFroUser.bind(this)
    this.getPostFromUser = this.getPostFromUser.bind(this)
    this.postsFromUser = this.postsFromUser.bind(this)
  }

  componentDidMount() {
    this.getPostFromUser()
  }

  /**
   * getPostFromUser
   * Action getAllPostFromUser triggered
   * pour recupérer tout les posts du user connecté
   */
  getPostFromUser() {
    const { auth } = this.props

    getAllPostFromUser(auth.auth.id).then((res) => {
      this.setState({
        allPosts: res
      })
    })
  }

  /**
   * displayAllPostsFroUser
   * Display chaques posts
   * @params idMap, content, title, id, categorie
   */
  displayAllPostsFroUser(idMap, content, date, title, id, categorie) {
    const AMJ = date.substring(0, 10)
    const H = date.substring(11, 19)

    return (
      <div key={idMap}>
        <hr />
        <h5>
          Date:
          {' '}
          {`${AMJ}/${H}`}
          {' '}
        </h5>
        Catérogie:
        {' '}
        {categorie === '2' ? ' Foot' : ' Tennis'}
        <h4>
          Commentaire:
          {' '}
          {content}
        </h4>
        <button type="submit">
          Supprimer
        </button>
      </div>
    )
  }

  /**
   * postsFromUser
   * parcourir les posts pour display
   * @return
   */
  postsFromUser() {
    const { allPosts } = this.state

    return (
      allPosts
        .map((item, idMap) => this.displayAllPostsFroUser(
          idMap,
          item.content,
          item.created_at,
          item.title,
          item.id,
          item.idCategorie
        ))
    )
  }

  render() {
    return (
      <div>
        {this.postsFromUser()}
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

export default connect(mapStateToProps, null)(MesPosts)
