/**
  *
  * ACTION
  *
  * Fluc d'information que l'ont veut envoyer
  * à notre State globale
  *
  */
import axios from 'axios'
import store from '../../../../../store'
import { apiPath } from '../../../../../utils/urlAPI'

/**
  * Disptach post register
  * @param {Object} coms
  */
const getAllComs = coms => ({
  type: 'GET_ALL_NBR_COMS',
  coms
})

/**
  * Récupérer tout les commentaires pour compter
  *
  * @return {Object} Promise response
  */
export function getAllComToDisplay() {
  return new Promise((resolve) => {
    axios.get(`${apiPath}/api/comments`).then((res) => {
      store.dispatch(getAllComs(res.data.comments))
      resolve(res.data.comments)
    })
  })
}

/**
  * Disptach like register
  * @param {Object} coms
  */
const postLike = like => ({
  type: 'POST_LIKE',
  like
})

/**
  * Post un like
  * @params idElementLiked, user
  * @return {Object} Promise response
  */
export function postliked(idElementLiked, user) {
  return new Promise((resolve) => {
    axios.post(`${apiPath}/api/likes`, {
      idElementLiked,
      user
    }).then((res) => {
      resolve(res.data)
      store.dispatch(postLike(res.data))
    })
  })
}

/**
  * Disptach dislike register
  * @param {Object} disLike
  */
const disLik = disLike => ({
  type: 'POST_DISLIKE',
  disLike
})

/**
  * Get all Dislike
  * @params idElementDisliked, user
  * @return {Object} Promise response
  */
export function postDisliked(idElementDisliked, user) {
  return new Promise((resolve) => {
    axios.post(`${apiPath}/api/disLikes`, {
      idElementDisliked,
      user
    }).then((res) => {
      resolve(res.data)
      store.dispatch(disLik(res.data))
    })
  })
}

/**
  * Disptach like register
  * @param {Object} coms
  */
const getAllLikes = allLikes => ({
  type: 'GET_ALL_LIKES',
  allLikes
})

/**
  * Get all like
  */
export function getLikes() {
  return new Promise((resolve) => {
    axios.get(`${apiPath}/api/likes`).then((res) => {
      resolve(res.data.likes)
      store.dispatch(getAllLikes(res.data.likes))
    })
  })
}

/**
  * Disptach dislike register
  * @param {Object} allDisLikes
  */
const getAllDisLikes = allDisLikes => ({
  type: 'GET_ALL_DISLIKES',
  allDisLikes
})

/**
  * Get all like
  */
export function getDisLikes() {
  return new Promise((resolve) => {
    axios.get(`${apiPath}/api/disLikes`).then((res) => {
      resolve(res.data.disLikes)
      store.dispatch(getAllDisLikes(res.data.disLikes))
    })
  })
}

/**
  * Disptach like register
  * @param {Object} deletedLike
  */
const deleteLikecliked = deletedLike => ({
  type: 'DELETE_LIKE',
  deletedLike
})

/**
* Permet de supprimer un like
* En base
* @param {Object} idElementLiked, user
* @return {Object} Promise response
*/
export function deleteLikes(idElementLiked, user) {
  return new Promise((resolve) => {
    axios.delete(`${apiPath}/api/likes/deleted`, {
      params: {
        idElementLiked,
        user
      }
    }).then((res) => {
      resolve(res)
      store.dispatch(deleteLikecliked(res))
    })
  })
}

/**
  * Disptach dislike register
  * @param {Object} deletedDisLike
  */
const deleteDisLikecliked = deletedDisLike => ({
  type: 'DELETE_DISLIKE',
  deletedDisLike
})

/**
* Permet de supprimer un dislike
* En base
* @param {Object} idElementDisliked, user
* @return {Object} Promise response
*/
export function deleteDisLikes(idElementDisliked, user) {
  return new Promise((resolve) => {
    axios.delete(`${apiPath}/api/disLikes/deleted`, {
      params: {
        idElementDisliked,
        user
      }
    }).then((res) => {
      resolve(res)
      store.dispatch(deleteDisLikecliked(res))
    })
  })
}
