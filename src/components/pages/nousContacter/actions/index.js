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
  * Disptach email register
  * @param {Object} user
  */
const emailSending = emailSent => ({
  type: 'SEND_EMAIL',
  emailSent
})

/**
  * Send email to contact us
  * @param {Object} email
  * @return {Object} Promise response
  */
export function sendEmail(email) {
  return new Promise((resolve, reject) => {
    axios.post(`${apiPath}/api/send`, email)
      .then((response) => {
        store.dispatch(emailSending(response.config.data))
        // Succes de la requête en envoyant ce qu'on veut
        resolve(response.config.data)
      }, (err) => {
        console.log(err)
        reject(err)
      })
  })
}
