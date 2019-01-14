import React, { Component } from 'react'

class ListPost extends Component {
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
                  {post.title}
                </h2>
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
                  <span className="label label-danger">Foot</span>
                  <span className="label label-primary">{post.username}</span>
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
