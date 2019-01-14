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
const allPosts = {
  posts: null
}

/**
  * Modifie le state global de l'application
  * en fonction de l'action passé/déclanché
  * @param {Object, Object} state initial, action
  */
const Posts = (state = allPosts, action) => {
  switch (action.type) {
    case 'GET_ALL_POST':
      return {
        ...state, posts: action.posts
      }
    default:
      return state
  }
}

export default Posts
