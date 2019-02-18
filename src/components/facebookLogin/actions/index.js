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
  * Disptach auth register
  * @param {Object} auth
  */
export default function userAuth(auth) {
  return {
    type: 'USER_AUTH_FACEBOOK',
    auth
  }
}

/**
  * Action de vérifier un utilisateur en base
  * @param {Object} user
  * @return {Object} Promise response
  */
export function loginFacebook(user) {
  return new Promise((resolve, reject) => {
    axios.post(`${apiPath}/api/auth/facebookLogin`, user)
      .then((response) => {
        // dispatch méthode
        store.dispatch(userAuth(response))
        resolve(response.config.data)
      }, (errors) => {
        reject(errors)
      })
  })
}
