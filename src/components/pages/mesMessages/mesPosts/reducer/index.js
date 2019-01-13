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
  posts: null
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
        ...state, posts: action.posts
      }
    default:
      return state
  }
}

export default MesPosts
