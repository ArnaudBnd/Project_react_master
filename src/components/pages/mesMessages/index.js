import React, { Component } from 'react'
import MesPosts from './mesPosts'
import './index.css'

class MesMessages extends Component {
  render() {
    return (
      <section className="content">
        <MesPosts />
      </section>
    )
  }
}

export default MesMessages
