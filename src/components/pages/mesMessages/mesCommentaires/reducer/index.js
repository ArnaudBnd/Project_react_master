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
  deleteComment: null
}

/**
  * Modifie le state global de l'application
  * en fonction de l'action passé/déclanché
  * @param {Object, Object} state initial, action
  */
const MesComments = (state = commentsState, action) => {
  switch (action.type) {
    case 'DELETE_COM_BY_ID':
      return {
        ...state, deleteComment: action.deleteComment
      }
    default:
      return state
  }
}

export default MesComments
