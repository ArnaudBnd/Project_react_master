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
  allLikes: null
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
    case 'POST_LIKE':
      return {
        ...state, like: action.like
      }
    default:
      return state
  }
}

export default Coms
