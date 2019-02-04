import React, { Component } from 'react'
import { connect } from 'react-redux'
import './index.css'
import {
  userPostTraining,
  getPostTrainingFromUser,
  deletePostTrainingFromUser,
  updatePostTrainingFromUser,
  userPostComment,
  getCommentFoot,
  updateCommentTrainingFromUser,
  deleteCommentTrainingFromUser,
  dispatchComs
} from './actions/index'

class Foot extends Component {
  constructor(props) {
    super(props)

    this.state = {
      idCategorie: '2',
      idUser: '',
      idCommentToUpdate: '',
      idPostToUpdate: null,
      title: '',
      content: '',
      postToDisplay: [],
      isArticleUpdate: false,
      isCommentUpdate: false,
      commentPost: [],
      commentToDisplay: [],
      commentToUpdate: '',
      comment: '',
      nameTextarea: '',
      nbrComments: []
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onSubmitComment = this.onSubmitComment.bind(this)
    this.onSubmitDisplayCom = this.onSubmitDisplayCom.bind(this)
    this.onSubmitDisplayFormPost = this.onSubmitDisplayFormPost.bind(this)
    this.articleTraining = this.articleTraining.bind(this)
    this.handleCommentChange = this.handleCommentChange.bind(this)
    this.handleDeleteArticle = this.handleDeleteArticle.bind(this)
    this.handleUpdateArticle = this.handleUpdateArticle.bind(this)
    this.handleUpdateCommentArticle = this.handleUpdateCommentArticle.bind(this)
    this.handleDeleteCommentArticle = this.handleDeleteCommentArticle.bind(this)
    this.reqToDisplayArticle = this.reqToDisplayArticle.bind(this)
    this.reqToDisplayComment = this.reqToDisplayComment.bind(this)
    this.resetForm = this.resetForm.bind(this)
    this.resetFormComment = this.resetFormComment.bind(this)
    this.showButtonDelete = this.showButtonDelete.bind(this)
    this.showButtonDeleteComment = this.showButtonDeleteComment.bind(this)
    this.showButtonUpdate = this.showButtonUpdate.bind(this)
    this.showButtonUpdateComment = this.showButtonUpdateComment.bind(this)
    this.showCommentArticle = this.showCommentArticle.bind(this)
    this.showNbrComments = this.showNbrComments.bind(this)
  }

  componentDidMount() {
    this.reqToDisplayArticle()
    this.reqToDisplayComment()
  }

  componentDidUpdate() {
    const { commentToDisplay } = this.state
    dispatchComs(commentToDisplay)
  }

  onChange(e) {
    const { auth } = this.props
    const idUserState = auth.auth.id

    this.setState({
      idUser: idUserState,
      [e.target.name]: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault()
    const { isArticleUpdate } = this.state

    if (!isArticleUpdate) {
      userPostTraining(this.state).then(() => {
        getPostTrainingFromUser().then((posts) => {
          this.setState({
            postToDisplay: posts
          })
        })
      })
      this.resetForm()
    } else {
      const {
        title,
        content,
        idPostToUpdate,
        postToDisplay
      } = this.state

      updatePostTrainingFromUser(idPostToUpdate, title, content).then((res) => {
        const postToUpdate = postToDisplay.map((post) => {
          const tmp = post
          if (tmp.id === res.id) {
            tmp.title = res.title
            tmp.content = res.content
          }
          return tmp
        })

        this.setState({
          postToDisplay: postToUpdate,
          isArticleUpdate: false
        })
      })
      this.resetForm()
    }
  }

  onSubmitComment(e, idPost) {
    e.preventDefault()
    const { auth } = this.props
    const date = new Date()
    const {
      comment,
      isCommentUpdate,
      idCommentToUpdate,
      commentToDisplay,
      idCategorie
    } = this.state
    const objComment = {
      user: auth.auth.username,
      idPost,
      comment,
      date,
      idCategorie
    }

    this.setState({
      commentPost: objComment
    })

    if (!isCommentUpdate) {
      // action to send data into bdd
      userPostComment(objComment).then(() => {
        getCommentFoot().then((comments) => {
          this.setState({
            commentToDisplay: comments
          })
        })
      })
      this.resetFormComment(idPost)
    } else {
      updateCommentTrainingFromUser(idCommentToUpdate, comment).then((res) => {
        const commentToUpdateAfter = commentToDisplay.map((com) => {
          const tmp = com
          if (tmp.id === res.id) {
            tmp.comment = res.comment
          }
          return tmp
        })

        this.setState({
          commentToDisplay: commentToUpdateAfter,
          isCommentUpdate: false
        })
      })

      this.resetFormComment(idPost)
    }
  }

  /**
   * Au clique pour afficher les coms
   * @param e, idPost
   */
  onSubmitDisplayCom(e, idPost) {
    e.preventDefault()

    const button = document.getElementById(`${idPost}`)
    if (button.style.display === 'none') {
      button.style.display = 'block'
    } else {
      button.style.display = 'none'
    }
  }

  /**
   * Au clique pour afficher les posts
   * @param e
   */
  onSubmitDisplayFormPost(e) {
    e.preventDefault()

    const button = document.getElementById('formFoot')
    if (button.style.display === 'none') {
      button.style.display = 'block'
    } else {
      button.style.display = 'none'
    }
  }

  /**
   * Article to display
   * Lors du rendu
   * @param id, title, content, date
   * @return dom HTML
   */
  articleTraining(idMap, title, content, user, date, idPost) {
    const { isCommentUpdate, nameTextarea } = this.state
    const style = {
      fontSize: '24px'
    }

    return (
      <div className="post" key={idMap}>
        <div className="wrap-ut pull-left">
          <div className="userinfo pull-left">
            <div className="avatar">
              <i style={style} className="glyphicon glyphicon-user" />
              <div className="status green">&nbsp;</div>
            </div>

            <div className="icons">
              <img src="images/icon1.jpg" alt="" />
              <img src="images/icon4.jpg" alt="" />
            </div>
          </div>
          <div className="posttext pull-left">
            <h2>
              <a href={`/displayPostFromAccueil/${idPost}`}>
                {title}
              </a>
            </h2>
            <p>
              Food is my passion. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              enim adminim veniam, quis nostrud exercitation ullamco laboris nisi ut
              <br />
              {content}
            </p>
          </div>
          <div className="clearfix" />
          <div id="buttonCom">
            {this.showNbrComments(idPost)}
            {' '}
            Responses
            <br />
            <div className="col-lg-4">
              {this.showButtonDelete(user, idPost)}
            </div>
            <div className="col-lg-4">
              <button type="submit" onClick={e => this.onSubmitDisplayCom(e, idPost)} className="btn btn-primary ">Show more</button>
            </div>
            <div className="col-lg-4">
              {this.showButtonUpdate(user, idPost)}
            </div>
          </div>
          <div id={idPost} style={{ display: 'none', paddingLeft: '85px' }}>
            <h4>Ecrire un Commentaire:</h4>
            <form id="formComment" onSubmit={e => this.onSubmitComment(e, idPost)}>
              <div className="form-group">
                <textarea name={idPost} id="commentaire" onChange={this.handleCommentChange} className="form-control" rows="3" required />
              </div>
              <button type="submit" className="btn btn-success">{isCommentUpdate ? (idPost === nameTextarea ? 'Mettre a jour le commentaire' : 'Partager') : 'Partager'}</button>
            </form>
            <br />
            <p>
              Comment(s):
              {' '}
              {this.showNbrComments(idPost)}
            </p>
            <br />
            {this.showCommentArticle(idPost)}
            <br />
            <br />
            <br />
          </div>
        </div>
        <div className="postinfo pull-left">
          <div className="comments">
            <div className="commentbg">
              {this.showNbrComments(idPost)}
              <div className="mark" />
            </div>
          </div>
          <div className="views">
            <i className="fa fa-eye" />
            {' '}
            by:
            {' '}
            {user}
          </div>
          <div className="time">
            <i className="fa fa-clock-o" />
            {' '}
            {new Date(date).toLocaleDateString()}
            {' '}
          </div>
        </div>
        <div className="clearfix" />
      </div>
    )
  }

  /**
   * When we click to delete post
   * Action deletePostTrainingFromUser triggered
   * @param e, idPost
   */
  handleDeleteArticle(e, idPost) {
    e.preventDefault()
    const { postToDisplay, commentToDisplay } = this.state

    deletePostTrainingFromUser(idPost).then(() => {
      const tmp = postToDisplay.filter(post => post.id !== idPost)
      const tmp1 = commentToDisplay.filter(post => post.idPost !== idPost)

      this.setState({
        postToDisplay: tmp,
        commentToDisplay: tmp1
      })
    })
  }

  /**
   * Quand on click pour delete un commentaire
   * Action deleteCommentTrainingFromUser triggered
   * @param e, idComment
   */
  handleDeleteCommentArticle(e, idComment) {
    e.preventDefault()
    deleteCommentTrainingFromUser(idComment).then(() => {
      const { commentToDisplay } = this.state
      const tmp = commentToDisplay.filter(com => com.id !== idComment)

      this.setState({
        commentToDisplay: tmp
      })
    })
  }

  /**
   * When we clic to update post
   *
   * @param e, idPost
   */
  handleUpdateArticle(e, idPost) {
    e.preventDefault()
    const { postToDisplay } = this.state
    // On recupère l'OBJECT post qui est cliqué
    const postToUpdate = postToDisplay.find(post => post.id === idPost)

    this.setState({
      isArticleUpdate: true,
      idPostToUpdate: idPost,
      title: postToUpdate.title,
      content: postToUpdate.content
    })

    const button = document.getElementById('formFoot')
    button.style.display = 'block'

    // On set les values voulus dans le formulaire
    document.querySelector('input[name="title"]').value = postToUpdate.title
    document.querySelector('textarea[name="content"]').value = postToUpdate.content
  }

  /**
   * Quand on clic pour update un commentaire
   *
   * @param e, idComment, nameTextarea
   */
  handleUpdateCommentArticle(e, idComment, nameTextarea) {
    e.preventDefault()
    const { commentToDisplay } = this.state
    const commentToUpdate = commentToDisplay.find(post => post.id === idComment)

    this.setState({
      isCommentUpdate: true,
      idCommentToUpdate: commentToUpdate.id,
      commentToUpdate: commentToUpdate.comment,
      nameTextarea
    })

    // On set les values voulus dans le formulaire de commentaire
    document.querySelector(`textarea[name="${nameTextarea}"]`).value = commentToUpdate.comment
  }

  /**
   * On récupère le commentaire pour set a la state
   *
   * @param e
   */
  handleCommentChange(e) {
    const comment = e.target.value

    this.setState({
      comment
    })
  }

  /**
   * Reset form foot
   *
   */
  resetForm() {
    document.getElementById('formFoot').reset()

    const button = document.getElementById('formFoot')
    if (button.style.display === 'block') {
      button.style.display = 'none'
    }
  }

  /**
   * Reset Comment form foot
   *
   */
  resetFormComment(idPost) {
    document.querySelector(`textarea[name="${idPost}"]`).value = ''
  }

  /**
   * Request to display data from article
   * Quand user accede ou re-actualise la page
   *
   */
  reqToDisplayArticle() {
    getPostTrainingFromUser().then((res) => {
      this.setState({
        postToDisplay: res
      })
    })
  }

  /**
   * Request pour afficher commentaires d'un article
   * Quand user accede ou re-actualise la page
   *
   */
  reqToDisplayComment() {
    getCommentFoot().then((comments) => {
      this.setState({
        commentToDisplay: comments
      })
    })
  }

  /**
   * Show all article created
   * @return
   */
  showArticleTraining() {
    const { postToDisplay } = this.state

    return (
      postToDisplay
        .map((item, idMap) => this.articleTraining(
          idMap,
          item.title,
          item.content,
          item.username,
          item.created_at,
          item.id
        ))
    )
  }

  /**
   * Display button delete post
   * Pour l'utilisateur qui l'a crée
   * @param id, user
   * @return true / null
   */
  showButtonDelete(user, idPost) {
    const { auth } = this.props
    const authUsername = auth.auth.username

    if (user === authUsername) {
      return (
        <div>
          <button type="submit" style={{ backgroundColor: 'red' }} onClick={e => this.handleDeleteArticle(e, idPost)} className="btn btn-primary">
            Delete
          </button>
        </div>
      )
    }

    return null
  }

  /**
   * Display button delete post
   * Pour l'utilisateur qui l'a crée
   * @param id, user
   * @return true / null
   */
  showButtonUpdate(user, idPost) {
    const { auth } = this.props
    const authUsername = auth.auth.username

    if (user === authUsername) {
      return (
        <div>
          <button type="submit" onClick={e => this.handleUpdateArticle(e, idPost)} className="btn btn-primary">
            Update
          </button>
        </div>
      )
    }

    return null
  }

  /**
   * Display button delete post from comment
   * Pour l'utilisateur qui l'a crée
   * @param user
   * @return true / null
   */
  showButtonDeleteComment(user, idComment) {
    const { auth } = this.props
    const authUsername = auth.auth.username

    if (user === authUsername) {
      return (
        <div>
          <button type="submit" onClick={e => this.handleDeleteCommentArticle(e, idComment)} className="btn btn-danger">
            Delete
          </button>
        </div>
      )
    }

    return null
  }

  /**
   * Display button update post from comment
   * Pour l'utilisateur qui l'a crée
   * @param user
   * @return true / null
   */
  showButtonUpdateComment(user, idComment, nameTextarea) {
    const { auth } = this.props
    const authUsername = auth.auth.username

    if (user === authUsername) {
      return (
        <div>
          <button type="submit" onClick={e => this.handleUpdateCommentArticle(e, idComment, nameTextarea)} className="btn btn-danger">
            Update
          </button>
        </div>
      )
    }

    return null
  }

  /*
   * Show comment of each article
   *
   * @param idPost
   * @return dom html
   */
  showCommentArticle(idPost) {
    const idP = idPost
    const { commentToDisplay } = this.state
    // Pour chaque idP on va recupérer ceux qui ont le meme idP === idPost
    const tmp = commentToDisplay.filter(element => idP === element.idPost)

    return (
      tmp
        .map((element, idx) => (
          <div key={idx}>
            <blockquote>
              <div className="container">
                <div className="row">
                  <div className="col-lg-1">
                    <div id="imgComment">
                      <img src="https://hdwallsource.com/img/2014/9/blur-26347-27038-hd-wallpapers.jpg" className="img-circle" height="65" width="65" alt="Avatar" />
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div id="comment">
                      <h2>
                        {element.user}
                        {' '}
                      </h2>
                      <h4>
                        {element.comment}
                        .
                      </h4>
                      <small>
                        {new Date(element.date).toLocaleDateString()}
                      </small>
                      <div className="col-lg-4">
                        {this.showButtonDeleteComment(element.user, element.id)}
                      </div>
                      <div className="col-lg-4">
                        {this.showButtonUpdateComment(element.user, element.id, idPost)}
                      </div>
                      <br />
                    </div>
                  </div>
                </div>
              </div>
            </blockquote>
          </div>
        ))
    )
  }

  /*
   * Show nbr of comments
   *
   * @param idPost
   * @return tmp.length
   */
  showNbrComments(idPost) {
    const { commentToDisplay } = this.state
    const tmp = commentToDisplay.filter(element => idPost === element.idPost)

    return tmp.length
  }

  render() {
    const { isArticleUpdate, postToDisplay } = this.state

    return (
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
                Discussion
                <b> foot </b>
                {' '}
              </a>
              <span className="diviver">&gt;</span>
            </div>
            <div className="col-lg-8 col-md-8">
              <form id="formFoot" style={{ display: 'none' }} onSubmit={this.onSubmit}>
                <div className="form-group">
                  <h3 className="control-label">Foot</h3>
                </div>
                <div className="form-group">
                  <h3 className="control-label">Titre</h3>
                  <input type="text" name="title" className="form-control" onChange={this.onChange} />
                </div>
                <div className="form-group">
                  <h3 className="control-label">Description</h3>
                  <textarea name="content" className="form-control" id="exampleTextarea" rows="3" onChange={this.onChange} />
                </div>
                <button type="submit" className="btn btn-primary">{isArticleUpdate ? 'Mettre à jour le partager' : 'Partager'}</button>
              </form>
              <hr />
              <button type="submit" onClick={e => this.onSubmitDisplayFormPost(e)} className="btn btn-primary">Start New Topic</button>
              <hr />
              <h4>
                Nombre total de posts:
                {' '}
                {postToDisplay.length}
              </h4>
            </div>

            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-md-8">
                  {this.showArticleTraining()}
                </div>
                <div className="col-lg-4 col-md-4">
                  <div className="sidebarblock">
                    <h3>Le + populaire</h3>
                    <div className="divline" />
                    <div className="blocktxt">
                      <ul className="cats">
                        <li>
                          <a href="/foot">
                            Foot
                            <span className="badge pull-right">20</span>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            Tennis
                            <span className="badge pull-right">16</span>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            Rugby
                            <span className="badge pull-right">13</span>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            Judo
                            <span className="badge pull-right">1</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
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

export default connect(mapStateToProps, null)(Foot)
