import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import io from 'socket.io-client'
import jwt from 'jsonwebtoken'
import Router from './routes.js'
import store from './store'
import setAuthorizationToken from './utils/setAuthorizationToken'
import setSocketConnection from './utils/connectionSocket'
import userAuth from './components/login/actions/index'

window.io = io
window.socket = null

// Garder le token pour le dispatcher
if (localStorage.jwtToken) {
  // check si le token a expiré
  jwt.verify(localStorage.jwtToken, 'somesecretkeyforjsonwebtokenattentionlesyeux', (err) => {
    if (err) {
      console.log(('err from index.js: ', err))
    } else {
      setAuthorizationToken(localStorage.jwtToken)
      // lorsqu'on re-actualise la page
      // on renvoie le token au server pour recupérer les infos du user connecté
      setSocketConnection(localStorage.jwtToken)
      // dispatch du token user
      store.dispatch(userAuth(jwt.decode(localStorage.jwtToken)))
    }
  })
}

const App = () => (
  <div>
    <Provider store={store}>
      <Router />
    </Provider>
  </div>
)

ReactDOM.render(<App />, document.getElementById('app'))
