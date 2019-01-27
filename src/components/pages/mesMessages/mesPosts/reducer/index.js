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
const postsState = {
  getPosts: null,
  getComments: null,
  deletePC: null
}

/**
  * Modifie le state global de l'application
  * en fonction de l'action passé/déclanché
  * @param {Object, Object} state initial, action
  */
const MesPosts = (state = postsState, action) => {
  switch (action.type) {
    case 'GET_ALL_POST_FROM_USER':
      return {
        ...state, getPosts: action.getPosts
      }
    case 'GET_ALL_COMM_FROM_USER':
      return {
        ...state, getComments: action.getComments
      }
    case 'DELETE_POST_COM_BY_ID':
      return {
        ...state, deletePC: action.deletePC
      }
    default:
      return state
  }
}

export default MesPosts
