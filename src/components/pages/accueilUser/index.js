import React, { Component } from 'react'
import FilteredListPost from './filteredListPost/index.js'
import './index.css'

class AccueilUser extends Component {
  render() {
    return (
      <section className="content">
        <FilteredListPost />
      </section>
    )
  }
}

export default AccueilUser
