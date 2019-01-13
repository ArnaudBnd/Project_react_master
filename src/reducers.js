import { combineReducers } from 'redux'

import user from './components/signup/reducer'
import auth from './components/login/reducer'
import foot from './components/pages/foot/reducer'
import profilUser from './components/pages/profil/reducer'
import mesComments from './components/pages/mesMessages/mesCommentaires/reducer'
import MesPosts from './components/pages/mesMessages/mesPosts/reducer'

export default combineReducers({
  user,
  auth,
  foot,
  profilUser,
  mesComments,
  MesPosts
})
