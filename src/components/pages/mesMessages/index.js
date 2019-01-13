import React, { Component } from 'react'
import MesCommentaires from './mesCommentaires/index.js'
import MesPosts from './mesPosts/index.js'

class MesMessages extends Component {
  render() {
    return (
      <div className="container">
        <h1>Mes Commentaires: </h1>
        <MesCommentaires />
        <h1>Mes Posts: </h1>
        <MesPosts />
      </div>
    )
  }
}

export default MesMessages
