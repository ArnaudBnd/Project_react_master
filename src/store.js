/**
  *
  * STORE
  *
  * Possède et gère la state globale
  *
  *
  */
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import reducers from './reducers'

const productMode = () => (
  createStore(
    reducers,
    compose(applyMiddleware(thunk))
  )
)

export default productMode(process.env.NODE_ENV)
