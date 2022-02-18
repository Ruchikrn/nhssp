import { createReducer, combineReducers } from 'redux-starter-kit';
import {
  setAutoCompleteOptions,
  setAutoCompleteLoading,
  setAutoCompleteSelected,
} from '../actions/autoCompleteOptions';

const initialState = {
  options: [],
  loading: false,
  lastLoaded: null,
  selected: [],
};

const autoCompleteBaseReducer = createReducer(initialState, {
  [setAutoCompleteOptions]: (state, action) => {
    state.loading = false;
    state.lastLoaded = Date.now();
    state.options = action.payload.payload;
  },

  [setAutoCompleteLoading]: (state, action) => {
    state.loading = true;
  },

  [setAutoCompleteSelected]: (state, action) => {
    state.selected = action.payload.payload;
  },
});

function createAutoCompleteReducer(reducerName) {
  return (state, action) => {
    // payload is one level nested to detect reducer path
    const isInitializationCall = state === undefined;
    const name = action.payload ? action.payload.name : '';  
    if (name !== reducerName && !isInitializationCall) return state;
    return autoCompleteBaseReducer(state, action);
  };
}
/**
 * Example usage:
 * {name: 'province', payload: ["option1", ...]}>}s
 */

export default combineReducers({
  province: createAutoCompleteReducer('province'),
  district: createAutoCompleteReducer('district'),
  localBody: createAutoCompleteReducer('localBody'),
  program: createAutoCompleteReducer('program'),
  sourceType: createAutoCompleteReducer('sourceType'),
});
