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
const getPost = posts => ({
  type: 'GET_ALL_POST_FROM_USER',
  posts
})

/**
  * Action de récupérer chaques post d'user connecté
  * @param {Object} id
  * @return {Object} Promise response
  */
export function getAllPostFromUser(id) {
  return new Promise((resolve) => {
    axios.get(`${apiPath}/api/posts/${id}`)
      .then((response) => {
        resolve(response.data.posts)
        store.dispatch(getPost(response.data.posts))
      })
  })
}
