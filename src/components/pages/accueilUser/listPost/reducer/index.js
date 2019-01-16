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
  coms: null
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
    default:
      return state
  }
}

export default Coms
