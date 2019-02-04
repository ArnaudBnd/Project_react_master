/**
  *
  * ACTION
  *
  * Fluc d'information que l'ont veut envoyer
  * à notre State globale
  *
  */
import axios from 'axios'
import store from '../../../../store'
import { apiPath } from '../../../../utils/urlAPI'

/**
  * Dispatch user register
  * @param {Object} user
  */
const userPost = postFoot => ({
  type: 'POST_TRAINING_FOOT',
  postFoot
})

/**
  * Action d'ajouter un utilisateur en base
  * @param {Object} user
  * @return {Object} Promise response
  */
export function userPostTraining(post) {
  return new Promise((resolve, reject) => {
    axios.post(`${apiPath}/api/posts`, post)
      .then((response) => {
        store.dispatch(userPost(response.config.data))
        // Succes de la requête en envoyant ce qu'on veut
        resolve(response.config.data)
      }, (err) => {
        reject(err)
      })
  })
}

/**
  * Dispatch comment register
  * @param {Object} postComment
  */
const userComment = postComment => ({
  type: 'POST_TRAINING_FOOT_COMMENT',
  postComment
})

/**
  * Action d'ajouter un commentaire d'un post en base
  * @param {Object} user
  * @return {Object} Promise response
  */
export function userPostComment(comment) {
  return new Promise((resolve) => {
    axios.post(`${apiPath}/api/comments`, comment)
      .then((res) => {
        store.dispatch(userComment(res.config.data))
        resolve(res)
      })
  })
}

/**
  * Dispatch getPostTraining
  * @param {Object} getPostFromUser
  */
const getPostTraining = getAllPosts => ({
  type: 'GET_ALL_POSTS',
  getAllPosts
})

/**
* Récupérer un post d'un utilisateur en base
* Lorsque le user actualise ou accede a la page
* @return {Object} Promise response
*/
export function getPostTrainingFromUser() {
  return new Promise((resolve) => {
    axios.get(`${apiPath}/api/posts`).then((res) => {
      store.dispatch(getPostTraining(res.data.post))
      resolve(res.data.post)
    })
  })
}

/**
  * Dispatch getPostTraining
  * @param {Object} getPostFromUser
  */
const getComments = getAllComments => ({
  type: 'GET_ALL_COMMENTS',
  getAllComments
})

/**
* Récupérer tout les commentaires
*
* @return {Object} Promise response
*/
export function getCommentFoot() {
  return new Promise((resolve) => {
    axios.get(`${apiPath}/api/comments`).then((res) => {
      store.dispatch(getComments(res.data.comments))
      resolve(res.data.comments)
    })
  })
}

/**
  * Dispatch deletePostTraining
  * @param {Object} deletePost
  */
const deletePostTraining = deletePost => ({
  type: 'DELETE_POST_TRAINING',
  deletePost
})

/**
* Permet de supprimer un post
* En base
* @param {Object} idPost
* @return {Object} Promise response
*/
export function deletePostTrainingFromUser(idPost) {
  return new Promise((resolve) => {
    axios.delete(`${apiPath}/api/posts/${idPost}`).then((res) => {
      store.dispatch(deletePostTraining(res))
      resolve(res)
    })
  })
}

/**
  * Dispatch deleteCommTraining
  * @param {Object} deleteCom
  */
const deleteCommTraining = deleteCom => ({
  type: 'DELETE_COM_TRAINING',
  deleteCom
})

/**
* Permet de supprimer un commentaire
* En base
* @param {Object} idComment
* @return {Object} Promise response
*/
export function deleteCommentTrainingFromUser(idComment) {
  return new Promise((resolve) => {
    axios.delete(`${apiPath}/api/comments/${idComment}`).then((res) => {
      store.dispatch(deleteCommTraining(res.status))
      resolve(res.status)
    })
  })
}

/**
  * Dispatch updatePostTraining
  * @param {Object} updatePost
  */
const updatePostTraining = updatePost => ({
  type: 'UPDATE_POST_TRAINING',
  updatePost
})

/**
* Permet de mettre à jour un post
* En base
* @param {Object} idPostToUpdate, title, content
* @return {Object} Promise response
*/
export function updatePostTrainingFromUser(idPostToUpdate, title, content) {
  return new Promise((resolve) => {
    axios.post(`${apiPath}/api/posts/update`, {
      idPostToUpdate,
      title,
      content
    }).then((res) => {
      store.dispatch(updatePostTraining(res.data.post))
      resolve(res.data.post)
    })
  })
}

/**
  * Dispatch updatePostTraining
  * @param {Object} updateComm
  */
const updateComTraining = updateCom => ({
  type: 'UPDATE_COM_TRAINING',
  updateCom
})

/**
* Permet de mettre à jour un commentaire d'un post
* En base
* @param {Object} idCommentToUpdate, comment
* @return {Object} Promise response
*/
export function updateCommentTrainingFromUser(idCommentToUpdate, comment) {
  return new Promise((resolve) => {
    axios.post(`${apiPath}/api/comments/update`, {
      idCommentToUpdate,
      comment
    }).then((res) => {
      store.dispatch(updateComTraining(res.data.post))
      resolve(res.data.post)
    })
  })
}

const comsDispatch = dispatchAllComsFoot => ({
  type: 'DISPATCH_ALL_COMS',
  dispatchAllComsFoot
})

export function dispatchComs(coms) {
  return (
    store.dispatch(comsDispatch(coms))
  )
}
