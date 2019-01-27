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
  * Disptach comment deleted
  * @param {Object} comment
  */
const deleteCom = deleteComment => ({
  type: 'DELETE_COM_BY_ID',
  deleteComment
})

/**
  * Action de supprimer un com avec son id
  * @param {Object} idCom
  * @return {Object} Promise response
  */
export function deleteComById(idCom) {
  return new Promise((resolve) => {
    axios.delete(`${apiPath}/api/comments/${idCom}`).then((res) => {
      resolve(res.status)
      store.dispatch(deleteCom(idCom))
    })
  })
}
