import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  getPostWithId,
  getComWithIdPost,
  postUserComment
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
    this.onSubmitComment = this.onSubmitComment.bind(this)
    this.handleCommentChange = this.handleCommentChange.bind(this)
    this.resetInput = this.resetInput.bind(this)
    this.showPost = this.showPost.bind(this)
    this.showCom = this.showCom.bind(this)
    this.displayPost = this.displayPost.bind(this)
    this.displayComment = this.displayComment.bind(this)
  }

  componentWillMount() {
    this.getPost()
    this.getCom()
  }

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
        this.setState({
          comToDisplay: res
        })
      })
    })
    this.resetInput()
  }

  getCom() {
    const { match } = this.props

    getComWithIdPost(match.params.idPost).then((res) => {
      this.setState({
        comToDisplay: res
      })
    })
  }

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

  displayPost(idMap, username, content, title, createdAt) {
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
              {createdAt}
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
            <hr />
          </div>
        </div>
        {this.showCom()}
      </div>
    )
  }

  displayComment(idMap, comment, date, username) {
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
              {date}
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
          </div>
        </div>
      </blockquote>
    )
  }

  resetInput() {
    document.getElementById('formCom').reset()
  }

  showCom() {
    const { comToDisplay } = this.state

    return (
      comToDisplay
        .map((item, idMap) => this.displayComment(
          idMap,
          item.comment,
          item.date,
          item.user
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
          item.created_at
        ))
    )
  }

  render() {
    return (
      <section className="content">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <a href="/accueilUser">Discussion général</a>
              <span className="diviver">&gt;</span>
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
