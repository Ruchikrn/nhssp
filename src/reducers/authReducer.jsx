import { createReducer } from 'redux-starter-kit';
import {loginSuccess, loginInProgress, loginFailed, logoutSuccess} from '../actions/authActions'

const initialState = {
  authenticated: localStorage.getItem('token') ? true: false,
  token: localStorage.getItem('token') || null,
  inProgress: false,
  failed: false
}

const authReducer = createReducer(initialState, {
  [loginSuccess]: (state, action) => {
    state.authenticated = true
    state.token = action.payload
    state.inProgress = false
    state.failed = false
    localStorage.setItem('token', state.token)
  },
  [loginInProgress]: (state, action) => {
    state.authenticated = false
    state.token = null
    state.inProgress = true
    state.failed = false
  },
  [loginFailed]: (state, action) => {
    state.authenticated = false
    state.token = null
    state.inProgress = false
    state.failed = true
  },
  [logoutSuccess]: (state, action) => {
    state.authenticated = false
    state.token = null
    state.inProgress = false
    state.failed = false
    localStorage.removeItem('token')
  }
})

export default authReducer;