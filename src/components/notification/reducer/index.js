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
const notifState = {
  comsFromUser: null
}

/**
  * Modifie le state global de l'application
  * en fonction de l'action passé/déclanché
  * @param {Object, Object} state initial, action
  */
const Notification = (state = notifState, action) => {
  switch (action.type) {
    case 'GET_ALL_COMS_FROM_USER_TO_NOTIFY':
      return {
        ...state, comsFromUser: action.comsFromUser
      }
    default:
      return state
  }
}

export default Notification
