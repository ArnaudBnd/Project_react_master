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
  type: 'GET_ALL_POST',
  posts
})

/**
  * Action de récupérer chaques post d'user connecté
  * @param {Object} id
  * @return {Object} Promise response
  */
export function getAllPost() {
  return new Promise((resolve) => {
    axios.get(`${apiPath}/api/posts/allPost`)
      .then((response) => {
        resolve(response.data.post)
        store.dispatch(getPost(response.data.post))
      })
  })
}
