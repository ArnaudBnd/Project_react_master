import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

/**
* validateInput to tcheck from sign up
* @param {Object} data
* @return {Object or Boolean} errors or isValid
*/
export default function validatePassword(data) {
  const errors = {}
  const regexValidation = /[a-zA-Z0-9]{8,}/

  if (!regexValidation.test(data.password)) {
    errors.password = 'Le mot de passe doit contenir des lettres min 8 lettres dont majuscule, minuscule et nombre'
  }

  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = 'Passwords must match '
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
