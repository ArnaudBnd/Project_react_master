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
  * Disptach comment register
  * @param {Object} comment
  */
const getComment = comments => ({
  type: 'GET_ALL_COMM_FROM_USER',
  comments
})

/**
  * Action de récupérer chaques com d'user connecté
  * @param {Object} identifier
  * @return {Object} Promise response
  */
export function getAllCommentFromUser(username) {
  console.log(username)
  return new Promise((resolve) => {
    axios.get(`${apiPath}/api/comments/${username}`)
      .then((response) => {
        resolve(response.data.comments)
        store.dispatch(getComment(response.data.comments))
      })
  })
}
