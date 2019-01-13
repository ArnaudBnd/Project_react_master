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
const authState = {
  auth: null,
  isAuthentificated: false
}

/**
  * Modifie le state global de l'application
  * en fonction de l'action passé/déclanché
  * @param {Object, Object} state initial, action
  */
const auth = (state = authState, action) => {
  switch (action.type) {
    case 'USER_AUTH':
      return {
        ...state,
        auth: action.auth,
        isAuthentificated: !isEmpty(action.auth)
      }
    default:
      return state
  }
}

export default auth
