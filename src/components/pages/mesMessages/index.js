import React, { Component } from 'react'
import MesPosts from './mesPosts'
import Footer from '../../footer'
import './index.css'

class MesMessages extends Component {
  render() {
    return (
      <div>
        <section className="content">
          <MesPosts />
        </section>
        <Footer />
      </div>
    )
  }
}

export default MesMessages
