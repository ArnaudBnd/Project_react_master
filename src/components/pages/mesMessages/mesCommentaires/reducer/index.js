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
const commentsState = {
  comments: null
}

/**
  * Modifie le state global de l'application
  * en fonction de l'action passé/déclanché
  * @param {Object, Object} state initial, action
  */
const MesComments = (state = commentsState, action) => {
  switch (action.type) {
    case 'GET_ALL_COMM_FROM_USER':
      return {
        ...state, comments: action.comments
      }
    default:
      return state
  }
}

export default MesComments
