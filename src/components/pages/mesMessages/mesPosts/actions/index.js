/**
  *
  * ACTION
  *
  * Fluc d'information que l'ont veut envoyer
  * à notre State globale
  *
  */
import axios from 'axios'
import store from '../../../../../store'
import { apiPath } from '../../../../../utils/urlAPI'

/**
  * Disptach post register
  * @param {Object} comment
  */
const getPost = getPosts => ({
  type: 'GET_ALL_POST_FROM_USER',
  getPosts
})

/**
  * Action de récupérer chaques post d'user connecté
  * @param {Object} id
  * @return {Object} Promise response
  */
export function getAllPostsFromUser(id) {
  return new Promise((resolve) => {
    axios.get(`${apiPath}/api/posts/${id}`)
      .then((response) => {
        resolve(response.data.posts)
        store.dispatch(getPost(response.data.posts))
      })
  })
}

/**
  * Disptach comment register
  * @param {Object} comment
  */
const getComment = getComments => ({
  type: 'GET_ALL_COMM_FROM_USER',
  getComments
})

/**
  * Action de récupérer chaques com d'user connecté
  * @param {Object} username
  * @return {Object} Promise response
  */
export function getAllCommentsFromUser(username) {
  return new Promise((resolve) => {
    axios.get(`${apiPath}/api/comments/${username}`)
      .then((response) => {
        resolve(response.data.comment)
        store.dispatch(getComment(response.data.comment))
      })
  })
}

/**
  * Disptach post Com
  * @param {Object} post
  */
const deletePostCom = deletePC => ({
  type: 'DELETE_POST_COM_BY_ID',
  deletePC
})

/**
  * Action de supprimer un post
  * @param {Object} idPost
  * @return {Object} Promise response
  */
export function deletePostComById(idPost) {
  return new Promise((resolve) => {
    axios.delete(`${apiPath}/api/posts/${idPost}`).then((res) => {
      resolve(res.status)
      store.dispatch(deletePostCom(res.status))
    })
  })
}
