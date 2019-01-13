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
  * UserToken
  * Dispatch méthod
  * @param {Object} isTokenValid
  */
const userToken = isTokenValid => ({
  type: 'CHECK_TOKEN_EXIST_FOR_UPDATE_MDP',
  isTokenValid
})

/**
  * Action de check le token du user
  * @param {Object} token
  * @return {Object} Promise response
  */
export function checkIsUserTokenExist(token) {
  return new Promise((resolve) => {
    axios.post(`${apiPath}/api/reset`, { token })
      .then((res) => {
        resolve(res)
        store.dispatch(userToken(res.status))
      })
  })
}

/**
  * Dispatch user change mdp
  * @param {Object} isUpdateMdp
  */
const userUpdateMdp = isUpdateMdp => ({
  type: 'UPDATE_MDP_USER',
  isUpdateMdp
})

/**
  * Action updateResetPassword
  * Mettre a jour le mdp
  * @param {Object} password
  * @return {Object} Promise response
  */
export function updateResetPassword(password) {
  return new Promise((resolve) => {
    axios.post(`${apiPath}/api/reset/update`, { password })
      .then((res) => {
        store.dispatch(userUpdateMdp(res.status))
        resolve(res.status)
      })
  })
}
