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
  * Disptach like register
  * @param {Object} coms
  */
const getAllLikes = allLikes => ({
  type: 'GET_ALL_LIKES',
  allLikes
})

/**
  * Get all like
  *
  */
export function getLikes() {
  return new Promise((resolve) => {
    axios.get(`${apiPath}/api/likes`).then((res) => {
      resolve(res.data.likes)
      store.dispatch(getAllLikes(res.data.likes))
    })
  })
}

/**
  * Disptach alldislike register
  * @param {Object} allDisLikes
  */
const getAllDisLikes = allDisLikes => ({
  type: 'GET_ALL_DISLIKES',
  allDisLikes
})

/**
  * Get all like
  *
  */
export function getDisLikes() {
  return new Promise((resolve) => {
    axios.get(`${apiPath}/api/disLikes`).then((res) => {
      resolve(res.data.disLikes)
      store.dispatch(getAllDisLikes(res.data.disLikes))
    })
  })
}

/**
  * getPost
  * Dispatch méthode to reducer
  * @param {Object} post
  */
const getPost = getPostToDisplay => ({
  type: 'GET_POST_FROM_ID',
  getPostToDisplay
})

/**
  * Action de recupérer le post par id
  *
  * @param {Object} idPost
  * @return {Object} Promise response
  */
export function getPostWithId(idPost) {
  return new Promise((resolve) => {
    axios.get(`${apiPath}/api/posts/display/${idPost}`)
      .then((response) => {
        // dispatch méthode
        store.dispatch(getPost(response.data.posts))
        resolve(response.data.posts)
      })
  })
}

/**
  * emailExists
  * Dispatch méthode to reducer
  * @param {Object} isEmailExist
  */
const getCom = getComToDisplay => ({
  type: 'GET_COM_FROM_ID',
  getComToDisplay
})

/**
  * Action de recupérer un com par id
  *
  * @param {Object} idPost
  * @return {Object} Promise response
  */
export function getComWithIdPost(idPost) {
  return new Promise((resolve) => {
    axios.get(`${apiPath}/api/comments/display/${idPost}`)
      .then((response) => {
        store.dispatch(getCom(response.data.comments))
        resolve(response.data.comments)
      })
  })
}

/**
  * postCom
  * Dispatch méthode to reducer
  * @param {Object} com
  */
const postCom = postComToDisplay => ({
  type: 'POST_COM',
  postComToDisplay
})

/**
  * Action de  post un commentaire
  * @param {Object} post
  * @return {Object} Promise response
  */
export function postUserComment(comment) {
  return new Promise((resolve) => {
    axios.post(`${apiPath}/api/comments/`, comment)
      .then((response) => {
        resolve(response.config.data)
        store.dispatch(postCom(response.config.data))
      })
  })
}

/**
  * Dispatch deleteCommTraining
  * @param {Object} deleteCom
  */
const deleteComm = deleteCom => ({
  type: 'DELETE_COM',
  deleteCom
})

/**
* Permet de supprimer un commentaire
* En base
* @param {Object} idComment
* @return {Object} Promise response
*/
export function deleteComment(idComment) {
  return new Promise((resolve) => {
    axios.delete(`${apiPath}/api/comments/${idComment}`).then((res) => {
      store.dispatch(deleteComm(res.status))
      resolve(res.status)
    })
  })
}

/**
  * Dispatch deletePostTraining
  * @param {Object} deletePost
  */
const deleteArticle = deleteP => ({
  type: 'DELETE_POST',
  deleteP
})

/**
* Permet de supprimer un post
* En base
* @param {Object} idPost
* @return {Object} Promise response
*/
export function deletePost(idPost) {
  return new Promise((resolve) => {
    axios.delete(`${apiPath}/api/posts/${idPost}`).then((res) => {
      store.dispatch(deleteArticle(res))
      resolve(res)
    })
  })
}

const comsDispatch = dispatchAllComs => ({
  type: 'DISPATCH_ALL_COMS',
  dispatchAllComs
})

export function dispatchComs(coms) {
  return (
    store.dispatch(comsDispatch(coms))
  )
}
