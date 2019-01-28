import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deletePostComById, getAllPostsFromUser, getAllCommentsFromUser } from './actions/index'
import MesCommentaires from '../mesCommentaires'

class MesPosts extends Component {
  constructor(props) {
    super(props)

    this.state = {
      allPosts: [],
      allComs: []
    }

    this.displayAllPostsFromUser = this.displayAllPostsFromUser.bind(this)
    this.deleteComDeleted = this.deleteComDeleted.bind(this)
    this.getComs = this.getComs.bind(this)
    this.getPosts = this.getPosts.bind(this)
    this.handleDeletePost = this.handleDeletePost.bind(this)
    this.postsFromUser = this.postsFromUser.bind(this)
  }

  componentWillMount() {
    this.getComs()
    this.getPosts()
  }

  componentWillReceiveProps(nextProps) {
    const id = nextProps.mesComments.deleteComment
    this.deleteComDeleted(id)
  }

  /**
   * getPostFromUser
   * Action getAllPostsFromUser triggered
   * pour recupérer tout les posts du user connecté
   */
  getPosts() {
    const { auth } = this.props

    getAllPostsFromUser(auth.auth.id).then((res) => {
      this.setState({
        allPosts: res
      })
    })
  }

  /**
   * getComFromUser
   * Action getAllCommentsFromUser triggered
   * pour recupérer tout les coms du user connecté
   */
  getComs() {
    const { auth } = this.props

    getAllCommentsFromUser(auth.auth.username).then((res) => {
      this.setState({
        allComs: res
      })
    })
  }

  deleteComDeleted(id) {
    const { allComs } = this.state

    if (id) {
      const tmp = allComs.filter(com => id !== com.id)

      this.setState({
        allComs: tmp
      })
    }
  }

  /**
   * displayAllPostsFroUser
   * Display chaques posts
   * @params idMap, content, title, id, categorie
   */
  displayAllPostsFromUser(idMap, content, date, title, id, categorie) {
    const AMJ = date.substring(0, 10)
    const H = date.substring(11, 19)

    return (
      <div key={idMap}>
        <hr />
        <h3>
          Title:
          {title}
        </h3>
        <h4>
          Post:
          {' '}
          {content}
        </h4>
        <h5>
          Date:
          {' '}
          {`${AMJ}/${H}`}
          {' '}
        </h5>
        Catérogie:
        {' '}
        {categorie === '2' ? ' Foot' : ' Tennis'}
        <br />
        <button type="submit" onClick={e => this.handleDeletePost(e, id)}>
          Supprimer
        </button>
      </div>
    )
  }

  /**
   * handleDeletePost
   * delete Post
   * @params e, idPost
   */
  handleDeletePost(e, idPost) {
    e.preventDefault()
    const { allPosts, allComs } = this.state

    deletePostComById(idPost).then(() => {
      const tmpPost = allPosts.filter(post => post.id !== idPost)
      const tmpCom = allComs.filter(com => com.idPost !== idPost)

      this.setState({
        allPosts: tmpPost,
        allComs: tmpCom
      })
    })
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
        .map((item, idMap) => this.displayAllPostsFromUser(
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
    const { allComs } = this.state

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-8">
            <h1>Mes Commentaires: </h1>
            <MesCommentaires allComs={allComs} />
          </div>
          <div className="col-lg-4 col-md-4">
            <h1>Mes Posts: </h1>
            {this.postsFromUser()}
          </div>
        </div>
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
    auth: state.auth,
    mesComments: state.mesComments
  }
}

export default connect(mapStateToProps, null)(MesPosts)
