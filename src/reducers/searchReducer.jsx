import { createReducer } from 'redux-starter-kit'
import { setPage, setPageSize, setPages, setResults, setLoading, setQ, setReadingMode } from '../actions/searchActions';

const initialState = {
  page: 1,
  pageSize: 10,
  pages: 1,
  results: [],
  loading: false,
  q: '',
  readingMode: false
}


export default createReducer(initialState, {
  [setQ]: (state, action) => {
    state.q = action.payload
  },
  [setPage]: (state, action) => {
    state.page = action.payload
  },
  [setPageSize]: (state, action) => {
    state.pageSize = action.payload
  },
  [setPages]: (state, action) => {
    state.pages = action.payload
  },
  [setResults]: (state, action) => {
    state.results = action.payload
  },
  [setLoading]: (state, action) => {
    state.loading = action.payload
  },
  [setReadingMode]: (state, action) => {
    state.readingMode = action.payload
  },
})
