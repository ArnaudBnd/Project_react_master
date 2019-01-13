/**
  *
  * REDUCER FOOT
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
  post: null
}

/**
  * Modifie le state global de l'application
  * en fonction de l'action passé/déclanché
  * @param {Object, Object} state initial, action
  */
const Profil = (state = userState, action) => {
  switch (action.type) {
    case 'GET_USER_PROFIL':
      return {
        ...state, user: action.user
      }
    case 'POST_USER_UPDATE':
      return {
        ...state, post: action.post
      }
    default:
      return state
  }
}

export default Profil
