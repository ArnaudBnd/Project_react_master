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
const displayPost = {
  getPostToDisplay: null,
  getComToDisplay: null,
  postComToDisplay: null,
  deleteCom: null,
  deleteP: null,
  dispatchAllComs: null
}

/**
  * Modifie le state global de l'application
  * en fonction de l'action passé/déclanché
  * @param {Object, Object} state initial, action
  */
const Foot = (state = displayPost, action) => {
  switch (action.type) {
    case 'GET_POST_FROM_ID':
      return {
        ...state, getPostToDisplay: action.getPostToDisplay
      }
    case 'GET_COM_FROM_ID':
      return {
        ...state, getComToDisplay: action.getComToDisplay
      }
    case 'POST_COM':
      return {
        ...state, postComToDisplay: action.postComToDisplay
      }
    case 'DELETE_COM':
      return {
        ...state, deleteCom: action.deleteCom
      }
    case 'DELETE_POST':
      return {
        ...state, deleteP: action.deleteP
      }
    case 'DISPATCH_ALL_COMS':
      return {
        ...state, dispatchAllComs: action.dispatchAllComs
      }
    default:
      return state
  }
}

export default Foot
