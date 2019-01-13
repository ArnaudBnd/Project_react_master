/**
  *
  * ACTION
  *
  * Fluc d'information que l'ont veut envoyer
  * à notre State globale
  *
  */
import store from '../../../store'
import setAuthorizationToken from '../../../utils/setAuthorizationToken'
import userAuth from '../../login/actions'

/**
  * Disptach logout user
  *
  */
export function logout() {
  // Suppression du token
  localStorage.removeItem('jwtToken')
  // delete Authorization
  setAuthorizationToken(false)
  // dispatch store empty object to USER_AUTH
  store.dispatch(userAuth({}))
}
