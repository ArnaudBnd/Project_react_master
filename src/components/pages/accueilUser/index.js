import React, { Component } from 'react'
import FilteredListPost from './filteredListPost/index.js'
import './index.css'

class AccueilUser extends Component {
  render() {
    return (
      <div>
        <section className="content">
          <hr />
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <a href="#">
                  <i className="fa fa-home" />
                  {' '}
                  <span className="diviver">&gt;</span>
                  {' '}
                  Discussion général
                  {' '}
                </a>
                <span className="diviver">&gt;</span>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <FilteredListPost />
                <div className="pull-left">
                  <a href="#" className="prevnext">
                    <i className="fa fa-angle-left" />
                  </a>
                </div>
                <div className="pull-left">
                  <ul className="paginationforum">
                    <li className="hidden-xs"><a href="#">1</a></li>
                    <li className="hidden-xs"><a href="#">2</a></li>
                    <li className="hidden-xs"><a href="#">3</a></li>
                    <li className="hidden-xs"><a href="#">4</a></li>
                    <li><a href="#">5</a></li>
                    <li><a href="#">6</a></li>
                    <li><a href="#" className="active">7</a></li>
                    <li><a href="#">8</a></li>
                    <li className="hidden-xs"><a href="#">9</a></li>
                    <li className="hidden-xs"><a href="#">10</a></li>
                    <li className="hidden-xs hidden-md"><a href="#">11</a></li>
                    <li className="hidden-xs hidden-md"><a href="#">12</a></li>
                    <li className="hidden-xs hidden-sm hidden-md"><a href="#">13</a></li>
                    <li><a href="#">1586</a></li>
                  </ul>
                </div>
                <div className="pull-left">
                  <a href="#" className="prevnext last">
                    <i className="fa fa-angle-right" />
                  </a>
                </div>
                <div className="clearfix" />
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default AccueilUser
