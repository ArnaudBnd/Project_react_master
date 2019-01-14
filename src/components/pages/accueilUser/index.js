import React, { Component } from 'react'
import FilteredListPost from './filteredListPost/index.js'
import './index.css'

class AccueilUser extends Component {
  render() {
    return (
      <div id="contenaire" className="container">
        <FilteredListPost />
      </div>
    )
  }
}

export default AccueilUser
