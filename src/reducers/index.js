import {combineReducers} from 'redux-starter-kit'
import autoCompleteReducer from './autoCompleteReducer'
import modalReducer from './modalReducer'
import searchReducer from './searchReducer';
import authReducer from './authReducer';
import dateReducer from './selectedDateReducer';

export default combineReducers({
  autocomplete: autoCompleteReducer,
  modal: modalReducer,
  search: searchReducer,
  auth: authReducer,
  selectedDate: dateReducer,
})