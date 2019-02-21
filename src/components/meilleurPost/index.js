import React, { Component } from 'react'
import { getPopularPostFoot } from './actions/index'

class MeilleurPost extends Component {
  constructor(props) {
    super(props)

    this.state = {
      postsMostPopular: []
    }

    this.getMostPopular = this.getMostPopular.bind(this)
  }

  componentDidMount() {
    this.getMostPopular()
  }

  /**
    * Récupérer les 5 postes les plus populaires
    *
    * @return {Object} Promise response
    */
  getMostPopular() {
    getPopularPostFoot().then((res) => {
      this.setState({
        postsMostPopular: res.data
      })
    })
  }

  render() {
    const { postsMostPopular } = this.state

    return (
      <div className="col-lg-4 col-md-4">
        <div className="sidebarblock">
          <h3>Les + populaires</h3>
          <div className="divline" />
          {
            postsMostPopular
              .map((element, idMap) => (
                <div className="blocktxt" key={idMap}>
                  <ul className="cats">
                    <li>
                      <a href={`/displayPostFromAccueil/${element.id_element}`}>
                        {element.title}
                      </a>
                      <span className="badge pull-right">
                        likes:
                        {' '}
                        {element.count}
                      </span>
                    </li>
                  </ul>
                </div>
              ))
          }
        </div>
      </div>
    )
  }
}

export default MeilleurPost
