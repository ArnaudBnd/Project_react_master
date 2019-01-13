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
const userState = {
  deletePost: null,
  deleteCom: null,
  getPostFoot: null,
  getAllPosts: null,
  getAllComments: null,
  postComment: null,
  updatePost: null,
  updateCom: null
}

/**
  * Modifie le state global de l'application
  * en fonction de l'action passé/déclanché
  * @param {Object, Object} state initial, action
  */
const Foot = (state = userState, action) => {
  switch (action.type) {
    case 'POST_TRAINING_FOOT':
      return {
        ...state, postFoot: action.postFoot
      }
    case 'POST_TRAINING_FOOT_COMMENT':
      return {
        ...state, postComment: action.postComment
      }
    case 'GET_ALL_COMMENTS':
      return {
        ...state, getAllComments: action.getAllComments
      }
    case 'GET_ALL_POSTS':
      return {
        ...state, getAllPosts: action.getAllPosts
      }
    case 'DELETE_POST_TRAINING':
      return {
        ...state, deletePost: action.deletePost
      }
    case 'DELETE_COM_TRAINING':
      return {
        ...state, deleteCom: action.deleteCom
      }
    case 'UPDATE_POST_TRAINING':
      return {
        ...state, updatePost: action.updatePost
      }
    case 'UPDATE_COM_TRAINING':
      return {
        ...state, updateCom: action.updateCom
      }
    default:
      return state
  }
}

export default Foot
