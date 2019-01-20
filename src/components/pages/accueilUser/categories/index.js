import React, { Component } from 'react'
import '../index.css'

class Categories extends Component {
  render() {
    return (
      <div className="col-lg-4 col-md-4">
        <div className="sidebarblock">
          <h3>Categories</h3>
          <div className="divline" />
          <div className="blocktxt">
            <ul className="cats">
              <li>
                <a href="#">
                  Trading for Money
                  <span className="badge pull-right">20</span>
                </a>
              </li>
              <li>
                <a href="#">
                  Trading for Money
                  <span className="badge pull-right">20</span>
                </a>
              </li>
              <li>
                <a href="#">
                  Trading for Money
                  <span className="badge pull-right">20</span>
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
