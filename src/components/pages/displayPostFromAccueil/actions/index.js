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
