import { createReducer } from 'redux-starter-kit'
import { toggleAboutModal, setHelpTour } from '../actions/modalActions';

const initialState = {
  'about': false,
  'helpTour': localStorage.getItem('helpTour') ? false: true
}


export default createReducer(initialState, {
  [toggleAboutModal]: (state, action) => {
    state.about = !state.about
  },
  [setHelpTour]: (state, action) => {
    state.helpTour = action.payload
    if(action.payload === true) {
      localStorage.removeItem('helpTour')
    }
    else {
      localStorage.setItem('helpTour', true)
    }
  },
})
