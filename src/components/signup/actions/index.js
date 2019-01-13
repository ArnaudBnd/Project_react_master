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
  * Disptach user register
  * @param {Object} user
  */
const userRegister = user => ({
  type: 'USER_REGISTER',
  user
})

/**
  * Action d'ajouter un utilisateur en base
  * @param {Object} user
  * @return {Object} Promise response
  */
export function userSignupRequest(user) {
  return new Promise((resolve, reject) => {
    axios.post(`${apiPath}/api/users`, user)
      .then((response) => {
        store.dispatch(userRegister(response.config.data))
        // Succes de la requête en envoyant ce qu'on veut
        resolve(response.config.data)
      }, (err) => {
        console.log(err)
        reject(err)
      })
  })
}

/**
  * Disptach user register
  * @param {Object} userExist
  */
const userExists = isUserExist => ({
  type: 'IS_USER_EXIST',
  isUserExist
})

/**
  * Action de check si l'utilisateur existe en base
  * @param {Object} identifier
  * @return {Object} Promise response
  */
export function isUserExists(identifier) {
  return new Promise((resolve) => {
    axios.get(`${apiPath}/api/users/${identifier}`)
      .then((response) => {
        // dispatch méthode
        store.dispatch(userExists(response.data.user))
        resolve(response.data.user)
      }).catch((err) => {
        console.log(err)
      })
  })
}
