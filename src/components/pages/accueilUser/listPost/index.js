import React, { Component } from 'react'
import { getAllComToDisplay } from './actions/index'
import Categories from '../categories/index.js'
import '../index.css'

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
      <div className="container">
        <h1>Voici la liste de tout les posts</h1>
        <div className="row">
          <div className="col-lg-8 col-md-8">
            {
              allPosts
                .map((post, idMap) => (
                  <div className="post" key={idMap}>
                    <div className="wrap-ut pull-left">
                      <div className="userinfo pull-left">
                        <div className="avatar">
                          <i className="glyphicon glyphicon-user" />
                          <div className="status green">&nbsp;</div>
                        </div>

                        <div className="icons">
                          <img src="images/icon1.jpg" alt="" />
                          <img src="images/icon4.jpg" alt="" />
                        </div>
                      </div>
                      <div className="posttext pull-left">
                        <h2>
                          <a href="#">
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
                    </div>
                    <div className="clearfix" />
                  </div>
                ))
            }
          </div>
          <Categories />
        </div>
      </div>
    )
  }
}

export default ListPost
