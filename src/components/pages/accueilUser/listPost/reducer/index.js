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
const allComs = {
  coms: null,
  like: null,
  disLike: null,
  allLikes: null,
  allDisLikes: null,
  deletedLike: null,
  deletedDisLike: null
}

/**
  * Modifie le state global de l'application
  * en fonction de l'action passé/déclanché
  * @param {Object, Object} state initial, action
  */
const Coms = (state = allComs, action) => {
  switch (action.type) {
    case 'GET_ALL_NBR_COMS':
      return {
        ...state, coms: action.coms
      }
    case 'GET_ALL_LIKES':
      return {
        ...state, allLikes: action.allLikes
      }
    case 'GET_ALL_DISLIKES':
      return {
        ...state, allDisLikes: action.allDisLikes
      }
    case 'POST_LIKE':
      return {
        ...state, like: action.like
      }
    case 'POST_DISLIKE':
      return {
        ...state, disLike: action.disLike
      }
    case 'DELETE_LIKE':
      return {
        ...state, deletedLike: action.deletedLike
      }
    case 'DELETE_DISLIKE':
      return {
        ...state, deletedDisLike: action.deletedDisLike
      }
    default:
      return state
  }
}

export default Coms
