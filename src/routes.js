import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import AccueilUser from './components/pages/accueilUser/index.js'
import Foot from './components/pages/foot'
import Login from './components/login/loginPage'
import NavBar from './components/navbar/index.js'
import Profil from './components/pages/profil/index.js'
import SignUp from './components/signup/signup'
import ForgotPassword from './components/pages/forgotPassword/index.js'
import MesMessages from './components/pages/mesMessages/index.js'
import NousContacter from './components/pages/nousContacter/index.js'
import ResetPassword from './components/pages/resetPassword/index.js'
import DisplayPostFromAccueil from './components/pages/displayPostFromAccueil/index.js'
import Accueil from './components/pages/accueil'
import requireAuth from './utils/requireAuth'

const Router = () => (
  <div>
    <NavBar />
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Accueil} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/forgotPassword" component={ForgotPassword} />
        <Route path="/foot" component={requireAuth(Foot)} />
        <Route path="/profil" component={requireAuth(Profil)} />
        <Route path="/mesMessages" component={requireAuth(MesMessages)} />
        <Route path="/accueilUser" component={requireAuth(AccueilUser)} />
        <Route path="/nousContacter" component={requireAuth(NousContacter)} />
        <Route path="/displayPostFromAccueil/:idPost" component={requireAuth(DisplayPostFromAccueil)} />
        <Route path="/reset/:token" component={ResetPassword} />
      </Switch>
    </BrowserRouter>
  </div>
)

export default Router
