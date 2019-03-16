import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllPost } from './actions/index'
import List from '../listPost'

class FilteredListPost extends Component {
  constructor(props) {
    super(props)

    this.state = {
      allPosts: [],
      inputValue: '',
      allPostForReset: []
    }

    this.getAllPost = this.getAllPost.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillMount() {
    this.getAllPost()
  }

  onChange(e) {
    const { allPostForReset } = this.state

    this.setState({
      inputValue: e.target.value,
      allPosts: allPostForReset
    })
  }

  onSubmit(e) {
    e.preventDefault()

    const { allPosts, inputValue } = this.state
    const tmp = allPosts.filter(element => (
      element.title.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
    ))
    this.setState({
      allPosts: tmp
    })
  }

  /**
   * getAllPost
   * actions getAllPost
   */
  getAllPost() {
    getAllPost().then((response) => {
      this.setState({
        allPosts: response,
        allPostForReset: response
      })
    })
  }

  render() {
    const { allPosts } = this.state

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-8">
            <div>
              <hr />
              <form id="formFoot" onSubmit={this.onSubmit}>
                <div className="pull-left txt">
                  <input type="text" onChange={this.onChange} className="form-control" placeholder="Search Post" />
                </div>
                <div className="pull-left">
                  <button type="submit" className="btn btn-secondary">rechercher</button>
                </div>
              </form>
            </div>
            <hr />
            <List allPosts={allPosts} />
          </div>
        </div>
      </div>
    )
  }
}

/**
 * mapStateToProps
 * Me permet de récupére la state du store (ici auth)
 * Et le passe en paramètre dans les props avec connect(props, actions)
 * De sorte a pourvoir vérifier si l'utilisateur est connecté
 */
function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, null)(FilteredListPost)
