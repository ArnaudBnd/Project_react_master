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
  * Disptach user register
  * @param {Object} userExist
  */
const getUser = user => ({
  type: 'GET_USER_PROFIL',
  user
})

/**
  * Action d'afficher le profil d'un utilisateur
  * @param {Object} identifier
  * @return {Object} Promise response
  */
export function getUserProfil(identifier) {
  return new Promise((resolve) => {
    axios.get(`${apiPath}/api/profils/${identifier}`)
      .then((response) => {
        // dispatch méthode
        store.dispatch(getUser(response.data.user))
        resolve(response.data.user)
      }).catch((err) => {
        console.log(err)
      })
  })
}

const postProfil = post => ({
  type: 'POST_USER_UPDATE',
  post
})

/**
  * Action d'update un profil d'un utilisateur
  * @param {Object} user
  * @return {Object} Promise response
  */
export function postToUpdateProfil(user) {
  return new Promise((resolve) => {
    axios.post(`${apiPath}/api/profils`, user)
      .then((response) => {
        // dispatch méthode
        store.dispatch(postProfil(response.data.post))
        resolve(response.status)
      }).catch((err) => {
        console.log(err)
      })
  })
}
