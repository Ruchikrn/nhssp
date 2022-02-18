import { createSelector } from 'redux-starter-kit'
import _ from 'lodash'

export const getSelectedDate = createSelector(['selectedDate.date'], (date) => date)

export const getProvinces = createSelector(
  ['autocomplete.provinces.options'], (options) => options
)
export const getDistricts = createSelector(
  ['autocomplete.district.options'], (options) => options
)

export const getLocalBodies = createSelector(
  ['autocomplete.localBody.options'], (options) => options
)

export const getSelectedProvinces = (state, provinces) => {
  return provinces;
}

export const getSelectedDistricts = (state, districts) => {
  return districts;
}


export const getFilteredDistricts = createSelector(
  ['autocomplete.district.options', getSelectedProvinces],
  (options, selectedProvinces) => {
    return _.filter(options, (option) => _.includes(_.map(selectedProvinces, 'id'), option.province_id))
  }
)

export const getFilteredLocalBodies = createSelector(
  ['autocomplete.localBody.options', getSelectedDistricts],
  (options, selectedDistricts) => {
    return _.filter(options, (option) => _.includes(_.map(selectedDistricts, 'id'), option.district_id))
  }
)


export const getAuthState = createSelector(
  ['auth'],
  (auth) => auth
)

export const getAuthToken = createSelector(
  [getAuthState],
  auth => auth.token
)

export const isAuthenticated = createSelector(
  [getAuthState],
  auth => auth.authenticated
)

export const getSearchState = createSelector(
  ['search'],
  (search) => search
)

export const getSearchResults = createSelector(
  ['search'],
  (search) => search.results
)


export const getSearchPaginationState = createSelector(
  [getSearchState],
  (search) => ({pages: search.pages, page: search.page})
)


export const getSearchParamsRaw = createSelector({
  page: 'search.page',
  page_size: 'search.pageSize',
  q: 'search.q',
  date: 'selectedDate.date',
  province: 'autocomplete.province.selected',
  district: 'autocomplete.district.selected',
  localbody: 'autocomplete.localBody.selected',
  program: 'autocomplete.program.selected',
  source_type: 'autocomplete.sourceType.selected',
})


export const getSearchParams = createSelector([getSearchParamsRaw], (params) => {
  return {
    ...params,
    date: params.date ? params.date : null,
    province: _.map(params.province, province => province.id),
    district: _.map(params.district, district => district.id),
    localbody: _.map(params.localbody, localbody => localbody.id),
    program: _.map(params.program, program => program.id),
    source_type: _.map(params.source_type, source_type => source_type.id),
  }
})