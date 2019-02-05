import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  getPostWithId,
  getComWithIdPost,
  postUserComment,
  deleteComment,
  deletePost,
  dispatchComs
} from './actions/index'
import './index.css'

class DisplayPostFromAccueil extends Component {
  constructor(props) {
    super(props)

    this.state = {
      postToDisplay: [],
      comToDisplay: [],
      comment: '',
      idCategorie: '2'
    }

    this.getPost = this.getPost.bind(this)
    this.getCom = this.getCom.bind(this)
    this.dispatchAllCom = this.dispatchAllCom.bind(this)
    this.handleDeleteCommentArticle = this.handleDeleteCommentArticle.bind(this)
    this.handleDeletePostArticle = this.handleDeletePostArticle.bind(this)
    this.onSubmitComment = this.onSubmitComment.bind(this)
    this.handleCommentChange = this.handleCommentChange.bind(this)
    this.resetInput = this.resetInput.bind(this)
    this.showPost = this.showPost.bind(this)
    this.showButtonDeleteComment = this.showButtonDeleteComment.bind(this)
    this.showButtonDeletePost = this.showButtonDeletePost.bind(this)
    this.showCom = this.showCom.bind(this)
    this.displayPost = this.displayPost.bind(this)
    this.displayComment = this.displayComment.bind(this)
  }

  componentWillMount() {
    this.getPost()
    this.getCom()
  }

  componentDidUpdate() {
    this.dispatchAllCom()
  }

  /**
   * When submit button comment
   * post and display a comment
   * @param e
   */
  onSubmitComment(e) {
    e.preventDefault()

    const { comment, idCategorie } = this.state
    const { match, auth } = this.props
    const date = new Date()
    const objComment = {
      user: auth.auth.username,
      idCategorie,
      idPost: match.params.idPost,
      comment,
      date
    }

    postUserComment(objComment).then(() => {
      getComWithIdPost(match.params.idPost).then((res) => {
        console.log('res: ', res)
        this.setState({
          comToDisplay: res
        })
      })
    })
    this.resetInput()
  }

  /**
   * Get com to display with id
   * Action getComWithIdPost triggered
   */
  getCom() {
    const { match } = this.props

    getComWithIdPost(match.params.idPost).then((res) => {
      this.setState({
        comToDisplay: res
      })
    })
  }

  /**
   * Get post to display with id
   * Action getPostWithId triggered
   */
  getPost() {
    const { match } = this.props

    getPostWithId(match.params.idPost).then((res) => {
      this.setState({
        postToDisplay: res
      })
    })
  }

  handleCommentChange(e) {
    const comment = e.target.value

    this.setState({
      comment
    })
  }

  /**
   * When we click to delete COM
   * Action deleteComment triggered
   * @param e, idCom
   */
  handleDeleteCommentArticle(e, idCom) {
    e.preventDefault()

    deleteComment(idCom).then(() => {
      const { comToDisplay } = this.state
      const tmp = comToDisplay.filter(com => com.id !== idCom)

      this.setState({
        comToDisplay: tmp
      })
    })
  }

  /**
   * When we click to delete COM
   * Action deletePost triggered
   * @param e, idPost
   */
  handleDeletePostArticle(e, idPost) {
    e.preventDefault()
    const { history } = this.props

    deletePost(idPost).then(() => {
      alert('le post a été supprimé')
      history.push('/accueilUser')
    })
  }

  /**
   * Post to display
   * Lors du rendu
   * @param idMap, title, content, idPost, username, createdAt
   * @return dom HTML
   */
  displayPost(idMap, username, content, title, createdAt, idPost) {
    return (
      <div className="col-lg-12 col-md-8">
        <div key={idMap} className="post beforepagination">
          <div className="topwrap">
            <div className="userinfo pull-left">
              <div className="avatar">
                <img src="images/avatar.jpg" alt="" />
                <div className="status green">&nbsp;</div>
              </div>
              <div className="icons">
                <img src="images/icon1.jpg" alt="" />
                <img src="images/icon4.jpg" alt="" />
                <img src="images/icon5.jpg" alt="" />
                <img src="images/icon6.jpg" alt="" />
              </div>
            </div>
            <div className="posttext pull-left">
              <h1>
                {title}
              </h1>
              <p>
                SalutSalutSalutSalutSalutSalutSalut
                SalutSalutSalutSalutSalutSalutSalut
                SalutSalutSalutSalutSalutSalutSalut
                SalutSalutSalutSalutSalutSalutSalut
                <br />
                {content}
              </p>
            </div>
            <div className="clearfix" />
          </div>
          <div className="postinfobot">
            <div className="likeblock pull-left">
              <a href="#" className="up">
                <i className="fa fa-thumbs-o-up" />
                25
              </a>
              <a href="#" className="down">
                <i className="fa fa-thumbs-o-down" />
                3
              </a>
            </div>
            <div className="prev pull-left">
              <a href="#">
                <i className="fa fa-reply" />
              </a>
            </div>

            <div className="posted pull-left">
              <i className="fa fa-clock-o" />
              Posted on :
              {' '}
              {new Date(createdAt).toLocaleDateString()}
              <br />
              <i className="fa fa-eye" />
              {' '}
              by:
              {' '}
              {username}
            </div>

            <div className="next pull-right">
              <a href="#">
                <i className="fa fa-share" />
              </a>
              <a href="#">
                <i className="fa fa-flag" />
              </a>
            </div>
            {this.showButtonDeletePost(username, idPost)}
            <div className="clearfix" />
            <hr />
          </div>
        </div>
        {this.showCom()}
      </div>
    )
  }

  /**
   * Com to display
   * Lors du rendu
   * @param idMap, title, comment, date, username, idCom
   * @return dom HTML
   */
  displayComment(idMap, comment, date, username, idCom) {
    return (
      <blockquote>
        <div key={idMap} className="post beforepagination">
          <div className="topwrap">
            <div className="userinfo pull-left">
              <div className="avatar">
                <img src="images/avatar.jpg" alt="" />
                <div className="status green">&nbsp;</div>
              </div>
              <div className="icons">
                <img src="images/icon1.jpg" alt="" />
                <img src="images/icon4.jpg" alt="" />
                <img src="images/icon5.jpg" alt="" />
                <img src="images/icon6.jpg" alt="" />
              </div>
            </div>
            <div className="posttext pull-left">
              <p>
                SalutSalutSalutSalutSalutSalutSalut
                SalutSalutSalutSalutSalutSalutSalut
                SalutSalutSalutSalutSalutSalutSalut
                SalutSalutSalutSalutSalutSalutSalut
                <br />
                {comment}
              </p>
            </div>
            <div className="clearfix" />
          </div>
          <div className="postinfobot">
            <div className="likeblock pull-left">
              <a href="#" className="up">
                <i className="fa fa-thumbs-o-up" />
                25
              </a>
              <a href="#" className="down">
                <i className="fa fa-thumbs-o-down" />
                3
              </a>
            </div>
            <div className="prev pull-left">
              <a href="#">
                <i className="fa fa-reply" />
              </a>
            </div>

            <div className="posted pull-left">
              <i className="fa fa-clock-o" />
              Posted on :
              {' '}
              {new Date(date).toLocaleDateString()}
              <br />
              <i className="fa fa-eye" />
              {' '}
              by:
              {' '}
              {username}
            </div>

            <div className="next pull-right">
              <a href="#">
                <i className="fa fa-share" />
              </a>
              <a href="#">
                <i className="fa fa-flag" />
              </a>
            </div>
            <div className="clearfix" />
            {this.showButtonDeleteComment(username, idCom)}
          </div>
        </div>
      </blockquote>
    )
  }

  /**
   * dispatch allComs to store
   */
  dispatchAllCom() {
    const { comToDisplay } = this.state
    dispatchComs(comToDisplay)
  }

  /**
   * resetInput
   */
  resetInput() {
    document.getElementById('formCom').reset()
  }

  /**
   * Display buttom delete Com
   * Lors du rendu
   * @param user, idCom
   * @return dom HTML / null
   */
  showButtonDeleteComment(user, idCom) {
    const { auth } = this.props
    const authUsername = auth.auth.username

    if (user === authUsername) {
      return (
        <div>
          <button type="submit" onClick={e => this.handleDeleteCommentArticle(e, idCom)} className="btn btn-danger">
            Delete
          </button>
        </div>
      )
    }

    return null
  }

  /**
   * Display buttom delete Post
   * Lors du rendu
   * @param user, idPost
   * @return dom HTML / null
   */
  showButtonDeletePost(user, idPost) {
    const { auth } = this.props
    const authUsername = auth.auth.username

    if (user === authUsername) {
      return (
        <div>
          <button type="submit" onClick={e => this.handleDeletePostArticle(e, idPost)} className="btn btn-danger">
            Delete
          </button>
        </div>
      )
    }

    return null
  }

  showCom() {
    const { comToDisplay } = this.state

    return (
      comToDisplay
        .map((item, idMap) => this.displayComment(
          idMap,
          item.comment,
          item.date,
          item.user,
          item.id
        ))
    )
  }

  showPost() {
    const { postToDisplay } = this.state

    return (
      postToDisplay
        .map((item, idMap) => this.displayPost(
          idMap,
          item.username,
          item.content,
          item.title,
          item.created_at,
          item.id
        ))
    )
  }

  render() {
    return (
      <section className="content">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <a href="/accueilUser">
                <i className="fa fa-home" />
                {' '}
                <span className="diviver">&gt;</span>
                {' '}
                Discussion général
                {' '}
              </a>
              <span className="diviver">&gt;</span>
              {' '}
              <a href="#">Détail message</a>
            </div>
            <hr />
          </div>
        </div>
        <div className="container">
          <div className="row">
            {this.showPost()}
            <div className="col-lg-12 col-md-8">
              <blockquote>
                <div className="post">
                  <form className="form" id="formCom" onSubmit={e => this.onSubmitComment(e)}>
                    <div className="topwrap">
                      <div className="userinfo pull-left">
                        <div className="avatar">
                          <img src="images/avatar4.jpg" alt="" />
                          <div className="status red">&nbsp;</div>
                        </div>

                        <div className="icons">
                          <img src="images/icon3.jpg" alt="" />
                          <img src="images/icon4.jpg" alt="" />
                          <img src="images/icon5.jpg" alt="" />
                          <img src="images/icon6.jpg" alt="" />
                        </div>
                      </div>
                      <div className="posttext pull-left">
                        <h3>Répondre:</h3>
                        <div className="textwraper">
                          <div className="postreply">Post a Reply</div>
                          <textarea name="reply" id="reply" onChange={this.handleCommentChange} placeholder="Type your message here" />
                        </div>
                      </div>
                      <div className="clearfix" />
                    </div>
                    <div className="postinfobot">

                      <div className="pull-right postreply">
                        <div className="pull-left smile">
                          <a href="#">
                            <i className="fa fa-smile-o" />
                          </a>
                        </div>
                        <div className="pull-left">
                          <button type="submit" className="btn btn-primary">
                            Post Reply
                          </button>
                        </div>
                        <div className="clearfix" />
                      </div>

                      <div className="clearfix" />
                    </div>
                  </form>
                </div>
              </blockquote>
            </div>
          </div>
        </div>
      </section>
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

export default withRouter(connect(mapStateToProps, null)(DisplayPostFromAccueil))
