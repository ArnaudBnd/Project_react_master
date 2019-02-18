/**
  *
  * ACTION
  *
  * Fluc d'information que l'ont veut envoyer
  * à notre State globale
  *
  */
import axios from 'axios'
import store from '../../../store'
import { apiPath } from '../../../utils/urlAPI'

/**
  * Disptach post register
  * @param {Object} coms
  */
const getPostPopular = post => ({
  type: 'GET_POST_MOST_POPULAR',
  post
})

/**
  * Récupérer les postes les plus populaires
  *
  * @return {Object} Promise response
  */
export function getPopularPostFoot() {
  return new Promise((resolve) => {
    axios.get(`${apiPath}/api/likes/popular`).then((res) => {
      store.dispatch(getPostPopular(res.data))
      resolve(res.data)
    })
  })
}
