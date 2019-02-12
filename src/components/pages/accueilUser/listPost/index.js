import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllComToDisplay, postliked } from './actions/index'
import Categories from '../categories/index.js'
import '../index.css'

class ListPost extends Component {
  constructor(props) {
    super(props)

    this.state = {
      comToCount: [],
      isLike: false
    }

    this.getAllCom = this.getAllCom.bind(this)
    this.displayNbrOfComs = this.displayNbrOfComs.bind(this)
    this.handleLikePost = this.handleLikePost.bind(this)
    this.handleDislikePost = this.handleDislikePost.bind(this)
    this.showButtonDislike = this.showButtonDislike.bind(this)
    this.showButtonLike = this.showButtonLike.bind(this)
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

  /**
   * to like post
   * @params idPost, e
   */
  handleLikePost(e, idElementLiked) {
    e.preventDefault()
    const { auth } = this.props
    const { isLike } = this.state

    console.log('isLike: ', isLike)

    postliked(idElementLiked, auth.auth.username).then((res) => {
      console.log('res: ', res)
      this.setState({
        isLike: true
      })
    })
  }

  /**
   * to dislike post
   * @params idPost, e
   */
  handleDislikePost(e, idPost) {
    e.preventDefault()
    const { auth } = this.props

    console.log('idPost: ', idPost)
    console.log('auth: ', auth.auth.username)
  }

  /**
   * show button Like
   * @params idPost
   * @return dom html
   */
  showButtonLike(idPost) {
    // if isLicked traitement
    return (
      <a href="#" className="up">
        <i className="fa fa-thumbs-o-up" onClick={e => this.handleLikePost(e, idPost)} />
        25
      </a>
    )
  }

  /**
   * show button Dislike
   * @params idPost
   * @return dom html
   */
  showButtonDislike(idPost) {
    return (
      <a href="#" className="down">
        <i className="fa fa-thumbs-o-down" onClick={e => this.handleDislikePost(e, idPost)} />
        3
      </a>
    )
  }

  render() {
    const { allPosts } = this.props
    const style = {
      fontSize: '24px'
    }
    console.log('allPosts: ', allPosts)

    return (
      <div className="container">
        <hr />
        <div className="row">
          <div className="col-lg-8 col-md-8">
            {
              allPosts
                .map((post, idMap) => (
                  <div className="post" key={idMap}>
                    <div className="wrap-ut pull-left">
                      <div className="userinfo pull-left">
                        <div className="avatar">
                          <i style={style} className="glyphicon glyphicon-user" />
                          <div className="status green">&nbsp;</div>
                        </div>

                        <div className="icons">
                          <img src="images/icon1.jpg" alt="" />
                          <img src="images/icon4.jpg" alt="" />
                        </div>
                      </div>
                      <div className="posttext pull-left">
                        <h2>
                          <a href={`/displayPostFromAccueil/${post.id}`}>
                            {post.title}
                          </a>
                        </h2>
                        <p>
                          Food is my passion. Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                          enim adminim veniam, quis nostrud exercitation ullamco laboris nisi ut
                          <br />
                          {post.content}
                        </p>
                        <div className="likeblock pull-left">
                          {this.showButtonLike(post.id)}
                          {this.showButtonDislike(post.id)}
                        </div>
                      </div>
                      <div className="clearfix" />
                    </div>
                    <div className="postinfo pull-left">
                      <div className="comments">
                        <div className="commentbg">
                          {this.displayNbrOfComs(post.id)}
                          <div className="mark" />
                        </div>
                      </div>
                      <div className="views">
                        <i className="fa fa-eye" />
                        {' '}
                        by:
                        {' '}
                        {post.username}
                      </div>
                      <div className="time">
                        <i className="fa fa-clock-o" />
                        {' '}
                        {new Date(post.created_at).toLocaleDateString()}
                        {' '}
                      </div>
                      <div className="views">
                        <a href="/foot">
                          <i className="fa fa-pencil-square-o" />
                          {' '}
                          {post.idCategorie === '2' ? 'Foot' : 'Tennis'}
                        </a>
                      </div>
                    </div>
                    <div className="clearfix" />
                  </div>
                ))
            }
          </div>
          <Categories allPosts={allPosts} />
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
    auth: state.auth
  }
}

export default connect(mapStateToProps, null)(ListPost)
