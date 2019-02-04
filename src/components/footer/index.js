import React, { Component } from 'react'
import './index.css'

class Footer extends Component {
  render() {
    return (
      <div>
        <footer id="myFooter">
          <div className="container">
            <ul>
              <li><a href="#">Company Information</a></li>
              <li><a href="#">Nous contacter</a></li>
              <li><a href="#">Reviews</a></li>
              <li><a href="#">Terms of service</a></li>
            </ul>
            <p className="footer-copyright">© 2019 S.Y.T. Company</p>
          </div>
          <div className="footer-social">
            <a href="#" className="social-icons"><i className="fa fa-facebook" /></a>
            <a href="#" className="social-icons"><i className="fa fa-google-plus" /></a>
            <a href="#" className="social-icons"><i className="fa fa-twitter" /></a>
          </div>
        </footer>
      </div>
    )
  }
}

export default Footer
