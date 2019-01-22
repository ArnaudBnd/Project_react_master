import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { getPostWithId, getComWithIdPost } from './actions/index'
import './index.css'

class DisplayPostFromAccueil extends Component {
  constructor(props) {
    super(props)

    this.state = {
      postToDisplay: [],
      comToDisplay: []
    }

    this.getPost = this.getPost.bind(this)
    this.getCom = this.getCom.bind(this)
    this.showPost = this.showPost.bind(this)
    this.showCom = this.showCom.bind(this)
    this.showComWriting = this.showComWriting.bind(this)
    this.displayPost = this.displayPost.bind(this)
    this.displayComment = this.displayComment.bind(this)
  }

  componentWillMount() {
    this.getPost()
    this.getCom()
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
    console.log(idMap)
    console.log(comment)
    console.log(date)
    console.log(username)

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

  showComWriting() {
    return (
      <div className="col-lg-12 col-md-8">
        <blockquote>
          <div className="post">
            <form action="#" className="form" method="post">
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
                    <textarea name="reply" id="reply" placeholder="Type your message here" />
                  </div>
                </div>
                <div className="clearfix" />
              </div>
              <div className="postinfobot">

                <div className="notechbox pull-left">
                  <input type="checkbox" name="note" id="note" className="form-control" />
                </div>

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
    )
  }

  render() {
    return (
      <section className="content">
        <hr />
        <div className="container">
          <div className="row">
            {this.showPost()}
            {this.showComWriting()}
            <hr />
          </div>
        </div>
      </section>
    )
  }
}

export default withRouter(DisplayPostFromAccueil)
