import React, { Component } from 'react'
import './index.css'

class Footer extends Component {
  render() {
    return (
      <div>
        <footer id="myFooter">
          <div className="container">
            <div className="row">
              <div className="col-sm-3">
                <h2 className="logo"><a href="#"> S.Y.T </a></h2>
              </div>
              <div className="col-sm-2">
                <h5>Get started</h5>
                <ul>
                  <li><a href="/">Home</a></li>
                  <li><a href="/signup">Sign up</a></li>
                  <li><a href="/login">Login</a></li>
                </ul>
              </div>
              <div className="col-sm-2">
                <h5>About us</h5>
                <ul>
                  <li><a href="#">Company Information</a></li>
                  <li><a href="#">Contact us</a></li>
                  <li><a href="#">Reviews</a></li>
                </ul>
              </div>
              <div className="col-sm-2">
                <h5>Support</h5>
                <ul>
                  <li><a href="#">FAQ</a></li>
                  <li><a href="#">Help desk</a></li>
                  <li><a href="#">Forums</a></li>
                </ul>
              </div>
              <div className="col-sm-3">
                <div className="social-networks">
                  <a href="#" className="twitter"><i className="fa fa-twitter" /></a>
                  <a href="#" className="facebook"><i className="fa fa-facebook" /></a>
                  <a href="#" className="google"><i className="fa fa-google-plus" /></a>
                </div>
                <button type="button" className="btn btn-default">Contact us</button>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <p>© 2016 Copyright Text </p>
          </div>
        </footer>
      </div>
    )
  }
}

export default Footer
