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
  * @param {Object} coms
  */
const getAllComs = coms => ({
  type: 'GET_ALL_NBR_COMS',
  coms
})

/**
* Récupérer tout les commentaires pour compter
*
* @return {Object} Promise response
*/
export function getAllComToDisplay() {
  return new Promise((resolve) => {
    axios.get(`${apiPath}/api/comments`).then((res) => {
      store.dispatch(getAllComs(res.data.comments))
      resolve(res.data.comments)
    })
  })
}
