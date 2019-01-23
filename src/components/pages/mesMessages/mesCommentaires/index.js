import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllCommentFromUser } from './actions/index'

class MesCommentaires extends Component {
  constructor(props) {
    super(props)

    this.state = {
      allComments: []
    }

    this.getComFromUser = this.getComFromUser.bind(this)
    this.commentsFromUser = this.commentsFromUser.bind(this)
    this.displayAllCommentsFromUser = this.displayAllCommentsFromUser.bind(this)
  }

  componentDidMount() {
    this.getComFromUser()
  }

  /**
   * getComFromUser
   * Action getAllCommentFromUser triggered
   * pour recupérer tout les comments du user connecté
   */
  getComFromUser() {
    const { auth } = this.props

    getAllCommentFromUser(auth.auth.username).then((response) => {
      this.setState({
        allComments: response
      })
    })
  }

  /**
   * commentsFromUser
   * parcourir les comments pour display
   * @return
   */
  commentsFromUser() {
    const { allComments } = this.state

    return (
      allComments
        .map((item, idMap) => this.displayAllCommentsFromUser(
          idMap,
          item.comment,
          item.date,
          item.id,
          item.idPost,
          item.idCategorie
        ))
    )
  }

  /**
   * displayAllCommentsFromUser
   * Display chaques comments
   * @params idMap, comment, date, id, idPost, categorie
   */
  displayAllCommentsFromUser(idMap, comment, date, id, idPost, categorie) {
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
          {comment}
        </h4>
        <button type="submit">
          Supprimer
        </button>
      </div>
    )
  }

  render() {
    const { allComments } = this.state
    console.log(allComments)

    return (
      <div>
        {this.commentsFromUser()}
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

export default connect(mapStateToProps, null)(MesCommentaires)
