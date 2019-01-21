/**
  *
  * ACTION
  *
  * Fluc d'information que l'ont veut envoyer
  * à notre State globale
  *
  */
import axios from 'axios'
import store from '../../../../store'
import { apiPath } from '../../../../utils/urlAPI'

/**
  * emailExists
  * Dispatch méthode to reducer
  * @param {Object} isEmailExist
  */
const getPost = post => ({
  type: 'GET_POST_FROM_ID',
  post
})

/**
  * Action de recupérer le post par id
  * isExist alors on envoie un mail pour reset le mdp
  * @param {Object} email
  * @return {Object} Promise response
  */
export function getPostWithId(idPost) {
  return new Promise((resolve) => {
    axios.get(`${apiPath}/api/posts/display/${idPost}`)
      .then((response) => {
        // dispatch méthode
        store.dispatch(getPost(response.data.posts))
        resolve(response.data.posts)
      })
  })
}

/**
  * emailExists
  * Dispatch méthode to reducer
  * @param {Object} isEmailExist
  */
const getCom = com => ({
  type: 'GET_COM_FROM_ID',
  com
})

/**
  * Action de recupérer le post par id
  * isExist alors on envoie un mail pour reset le mdp
  * @param {Object} email
  * @return {Object} Promise response
  */
export function getComWithIdPost(idPost) {
  return new Promise((resolve) => {
    axios.get(`${apiPath}/api/comments/display/${idPost}`)
      .then((response) => {
        // dispatch méthode
        store.dispatch(getCom(response.data.comments))
        resolve(response.data.comments)
      })
  })
}
