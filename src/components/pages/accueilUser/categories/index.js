import React, { Component } from 'react'
import '../index.css'

class Categories extends Component {
  render() {
    const { allPosts } = this.props

    return (
      <div className="col-lg-4 col-md-4">
        <div className="sidebarblock">
          <h3>Categories</h3>
          <div className="divline" />
          <div className="blocktxt">
            <ul className="cats">
              <li>
                <a href="/foot">
                  Foot
                  <span className="badge pull-right">{allPosts.length}</span>
                </a>
              </li>
              <li>
                <a href="#">
                  Tennis
                  <span className="badge pull-right">10</span>
                </a>
              </li>
              <li>
                <a href="#">
                  Rugby
                  <span className="badge pull-right">3</span>
                </a>
              </li>
              <li>
                <a href="#">
                  Judo
                  <span className="badge pull-right">16</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Categories
