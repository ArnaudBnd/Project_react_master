import React, { Component } from 'react'
import { getAllComToDisplay } from './actions/index'

class ListPost extends Component {
  constructor(props) {
    super(props)

    this.state = {
      comToCount: []
    }

    this.getAllCom = this.getAllCom.bind(this)
    this.displayNbrOfComs = this.displayNbrOfComs.bind(this)
  }

  componentWillMount() {
    this.getAllCom()
  }

  /**
   * getAllCom
   * pour compter le nbr de com par post
   * actions getAllComToDisplay
   */
  getAllCom() {
    getAllComToDisplay().then((res) => {
      this.setState({
        comToCount: res
      })
    })
  }

  /**
   * getAllCom
   * pour compter le nbr de com par post
   * actions getAllComToDisplay
   * @params idPost
   * @return nbr of coms from posts
   */
  displayNbrOfComs(idPost) {
    const { comToCount } = this.state
    const tmp = comToCount.filter(element => idPost === element.idPost)

    return tmp.length
  }

  render() {
    const { allPosts } = this.props

    return (
      <div>
        <h1>Voici la liste de tout les posts</h1>
        {
          allPosts
            .map((post, idMap) => (
              <div key={idMap}>
                <hr />
                <h2>
                  Sujet:
                  {' '}
                  {post.title}
                </h2>
                Réponses:
                {' '}
                {this.displayNbrOfComs(post.id)}
                <h5>
                  <span className="glyphicon glyphicon-time" />
                  {' '}
                  Post by
                  {' '}
                  {post.username}
                  ,
                  {' '}
                  {new Date(post.created_at).toLocaleDateString()}
                  .
                </h5>
                <h5>
                  Forum:
                  {' '}
                  <span className="label label-danger">Foot</span>
                </h5>
                <br />
                <p>
                  Food is my passion. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                  minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                  consequat. Excepteur sint occaecat cupidatat ....
                  <br />
                  {post.content}
                </p>
              </div>
            ))
        }
      </div>
    )
  }
}

export default ListPost
