import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteComById } from './actions/index'

class MesCommentaires extends Component {
  constructor(props) {
    super(props)

    this.state = {
      allComs: []
    }

    this.displayAllComsFromUser = this.displayAllComsFromUser.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      allComs: nextProps.allComs
    })
  }

  displayAllComsFromUser(idMap, comment, date, id, categorie, idPost) {
    const AMJ = date.substring(0, 10)
    const H = date.substring(11, 19)

    return (
      <div key={idMap}>
        <hr />
        <a href={`/displayPostFromAccueil/${idPost}`}>
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
        </a>
        <button type="submit" onClick={e => this.handleDeletePost(e, id)}>
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
  comsFromUser() {
    const { allComs } = this.state

    return (
      allComs
        .map((item, idMap) => this.displayAllComsFromUser(
          idMap,
          item.comment,
          item.date,
          item.id,
          item.idCategorie,
          item.idPost
        ))
    )
  }

  handleDeletePost(e, id) {
    e.preventDefault()
    const { allComs } = this.state

    deleteComById(id).then(() => {
      const tmp = allComs.filter(com => com.id !== id)

      this.setState({
        allComs: tmp
      })
    })
  }

  render() {
    return (
      <div>
        {this.comsFromUser()}
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
