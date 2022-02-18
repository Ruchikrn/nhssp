const initState = {
  date:"",
}

function selectedDateReducer(state = initState, action) {
  switch (action.type) {
    case 'SET_SELECTED_DATE':
      return Object.assign({}, state, {date: action.newDate});
    default:
      return state;
  }
}
export default selectedDateReducer;
