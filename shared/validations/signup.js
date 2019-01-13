import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

/**
* validateInput to tcheck from sign up
* @param {Object} data
* @return {Object or Boolean} errors or isValid
*/
export default function validateInput(data) {
  const errors = {}
  const regexValidation = /[a-zA-Z0-9]{8,}/

  if (Validator.isNull(data.username)) {
    errors.username = 'Ce champ est obligatoire'
  }

  if (Validator.isNull(data.email)) {
    errors.email = 'Ce champ est obligatoire'
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Le mot de passe nest pas valide'
  }

  if (!regexValidation.test(data.password)) {
    errors.password = 'Le mot de passe doit contenir des lettres min 8 lettres dont majuscule, minuscule et nombre'
  }

  if (Validator.isNull(data.password)) {
    errors.password = 'Ce champ est obligatoire'
  }

  if (Validator.isNull(data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Ce champ est obligatoire'
  }

  if (!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Les mdp doivent etre identiques'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
