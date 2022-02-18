import {createAction} from 'redux-starter-kit';
import axios from 'axios';

export const setAutoCompleteOptions = createAction('autocomplete/setOptions')
export const setAutoCompleteLoading = createAction('autocomplete/setLoading')
export const setAutoCompleteSelected = createAction('autocomplete/setSelected')



function createAutoCompleteAction(field, action) {
  var wrapped = function(payload) {
    return action({
      payload: payload,
      name: field
    })
  }
  wrapped.prototype.toString = function() { return action.toString()}
  return wrapped;
}

function createAutoCompleteRefreshAction(field, apiSuffix) {
  // TODO: use lastLoaded
  return () => (dispatch, getState) => {
    // if(getState().autocomplete[field].lastLoaded !== null) {
    //   return;
    // }
    dispatch(setAutoCompleteLoading({name: field}))
    return axios.get(`/api/${apiSuffix}/?page_size=1000`).then((res) => {
      dispatch(
        setAutoCompleteOptions({
          name: field,
          payload: res.data.results,
        })
      );
    });
  }
}




export const setProvinceOptions = createAutoCompleteAction('province', setAutoCompleteOptions)
export const setProvinceSelected = createAutoCompleteAction('province', setAutoCompleteSelected)
export const setProvinceLoading = createAutoCompleteAction('province', setAutoCompleteLoading)
export const refreshProvinceOptions = createAutoCompleteRefreshAction('province', 'provinces')

export function setProvinceAndDependants(provinces) {
  return (dispatch) => {
    dispatch(setProvinceSelected(provinces))
    dispatch(setDistrictSelected([]))
    dispatch(setLocalBodySelected([]))
  }
}

export const setDistrictOptions = createAutoCompleteAction('district', setAutoCompleteOptions)
export const setDistrictLoading = createAutoCompleteAction('district', setAutoCompleteLoading)
export const setDistrictSelected = createAutoCompleteAction('district', setAutoCompleteSelected)
export const refreshDistrictOptions = createAutoCompleteRefreshAction('district', 'districts')

export function setDistrictAndDependants(districts) {
  return (dispatch) => {
    dispatch(setDistrictSelected(districts))
    dispatch(setLocalBodySelected([]))
  }
}


export const setLocalBodyOptions = createAutoCompleteAction('localBody', setAutoCompleteOptions)
export const setLocalBodyLoading = createAutoCompleteAction('localBody', setAutoCompleteLoading)
export const setLocalBodySelected = createAutoCompleteAction('localBody', setAutoCompleteSelected)
export const refreshLocalBodyOptions = createAutoCompleteRefreshAction('localBody', 'localbodies')



export const setProgramOptions = createAutoCompleteAction('program', setAutoCompleteOptions)
export const setProgramLoading = createAutoCompleteAction('program', setAutoCompleteLoading)
export const setProgramSelected = createAutoCompleteAction('program', setAutoCompleteSelected)
export const refreshProgramOptions = createAutoCompleteRefreshAction('program', 'programs')

export const setSourceTypeOptions = createAutoCompleteAction('sourceType', setAutoCompleteOptions)
export const setSourceTypeLoading = createAutoCompleteAction('sourceType', setAutoCompleteLoading)
export const setSourceTypeSelected = createAutoCompleteAction('sourceType', setAutoCompleteSelected)
export const refreshSourceTypeOptions = createAutoCompleteRefreshAction('sourceType', 'sourcetypes')