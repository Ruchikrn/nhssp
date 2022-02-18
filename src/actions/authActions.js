import {createAction} from 'redux-starter-kit'
import axios from 'axios';
import {toast} from 'react-toastify'
import { getAuthToken } from '../selectors';
export const loginSuccess = createAction('auth/login')
export const loginInProgress = createAction('auth/inProgress')
export const loginFailed = createAction('auth/failed')
export const logoutSuccess = createAction('auth/logout')


export const login = (username, password, {setSubmitting}) => {
  return (dispatch, getState) => {
    setSubmitting(true)
    dispatch(loginInProgress(true))
    axios.post('/api/auth/login/', {username, password})
      .then(res => {
        dispatch(loginSuccess(res.data.key))
        setSubmitting(false)
        toast.success('Login successful')
      })
      .catch(res => {
        dispatch(loginFailed())
        toast.error('Login failed. Please check your credentials')
        setSubmitting(false)
      })
  }
}


export const logout = () => {
  return (dispatch, getState) => {
    // a failed logout can be considered a logout
    // most of the times, it is due to expired token 
    // used to logout. So, make logout optimistic
    dispatch(logoutSuccess())
    toast.success('Logged out')
    const authToken = getAuthToken(getState());
    axios.post('/api/auth/logout/', {headers:{'Authorization': `Token ${authToken}`}})        
  }
}