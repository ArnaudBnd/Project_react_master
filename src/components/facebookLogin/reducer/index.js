import isEmpty from 'lodash/isEmpty'

/**
  *
  * REDUCER
  *
  * Fonction qui modifie le state global
  *
  *
  */
/**
 * Initial state
 *
 */
const authFacebookState = {
  auth: null,
  isAuthentificatedFacebook: false
}

/**
  * Modifie le state global de l'application
  * en fonction de l'action passé/déclanché
  * @param {Object, Object} state initial, action
  */
const authFacebook = (state = authFacebookState, action) => {
  switch (action.type) {
    case 'USER_AUTH_FACEBOOK':
      return {
        ...state,
        auth: action.auth,
        isAuthentificatedFacebook: !isEmpty(action.auth)
      }
    default:
      return state
  }
}

export default authFacebook
