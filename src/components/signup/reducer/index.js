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
const userState = {
  user: null,
  isUserExist: null,
  isEmailExist: null,
  isTokenValid: null,
  isUpdateMdp: null
}

/**
  * Modifie le state global de l'application
  * en fonction de l'action passé/déclanché
  * @param {Object, Object} state initial, action
  */
const user = (state = userState, action) => {
  switch (action.type) {
    case 'USER_REGISTER':
      return {
        ...state, user: action.user
      }
    case 'IS_USER_EXIST':
      return {
        ...state, isUserExist: action.isUserExist
      }
    case 'IS_EMAIL_EXIST':
      return {
        ...state, isEmailExist: action.isEmailExist
      }
    case 'CHECK_TOKEN_EXIST_FOR_UPDATE_MDP':
      return {
        ...state, isTokenValid: action.isTokenValid
      }
    case 'UPDATE_MDP_USER':
      return {
        ...state, isUpdateMdp: action.isUpdateMdp
      }
    default:
      return state
  }
}

export default user
