import {createAction} from 'redux-starter-kit';
import axios from 'axios'
import queryString from 'query-string';
import { getSearchState, getAuthToken, getSearchParams } from '../selectors';

export const setPage = createAction('search/setPage')
export const setPages = createAction('search/setPages')
export const setPageSize = createAction('search/pageSize')
export const setResults = createAction('search/setResults')
export const setLoading = createAction('search/setLoading')
export const setQ = createAction('search/setQ')
export const setReadingMode = createAction('search/setReadingMode')


export const loadResults = () => {
  return (dispatch, getState) => {
    var headers = {}
    var authToken = getAuthToken(getState());
    var searchParams = getSearchParams(getState());
    console.log(searchParams);
    var query = queryString.stringify(searchParams);
    dispatch(setLoading(true))
    axios.get(`/api/practices/?${query}`)
      .then(res => {
        dispatch(setResults(res.data.results))
        dispatch(setPages(Math.ceil(res.data.count / searchParams.page_size)))
        dispatch(setLoading(false))
      })
  }
}