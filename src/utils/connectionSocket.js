import { apiPath } from './urlAPI'

/**
  * setAuthorizationTOken
  * @param {Object} token
  */
export default function setSocketConnection(token) {
  // Quand un user est connecté
  // on envoie son token au serveur
  window.socket = window.io(apiPath)
  window.socket.emit('userLogged', {
    token
  })
}
