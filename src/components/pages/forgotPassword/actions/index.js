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
  * emailExists
  * Dispatch méthode to reducer
  * @param {Object} isEmailExist
  */
const emailExists = isEmailExist => ({
  type: 'IS_EMAIL_EXIST',
  isEmailExist
})

/**
  * Action de check si l'email existe en base
  * isExist alors on envoie un mail pour reset le mdp
  * @param {Object} email
  * @return {Object} Promise response
  */
export function checkIsMailExist(email) {
  return new Promise((resolve) => {
    axios.post(`${apiPath}/api/checkEmail`, { email })
      .then((response) => {
        // dispatch méthode
        store.dispatch(emailExists(response.data))
        resolve(response)
      })
  })
}
