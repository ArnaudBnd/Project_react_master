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
  postComToDisplay: null
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
    default:
      return state
  }
}

export default Foot
