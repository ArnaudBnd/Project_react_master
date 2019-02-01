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
const email = {
  emailSent: null
}

/**
  * Modifie le state global de l'application
  * en fonction de l'action passé/déclanché
  * @param {Object, Object} state initial, action
  */
const NousContacter = (state = email, action) => {
  switch (action.type) {
    case 'SEND_EMAIL':
      return {
        ...state, emailSent: action.emailSent
      }
    default:
      return state
  }
}

export default NousContacter
