import { combineReducers } from 'redux';

const SET_DATA_FILTER = 'SET_DATA_FILTER';
const SET_SORT_FILTER = 'SET_SORT_FILTER';

const initalState = {
  inputFilter: null,
  sortFilter: null,
}

function SetDataFilter(value) {
  return {
    type: SET_DATA_FILTER,
    value,
  }
}

function SetSortFilter(value) {
  return {
    type: SET_SORT_FILTER,
    value,
  }
}

function filters(state=initalState, action) {
  switch(action.type) {
    case SET_DATA_FILTER:
      return {
        ...state,
        inputFilter: action.value,
      }
    case SET_SORT_FILTER:
      return {
        ...state,
        sortFilter: action.value,
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  filters,
});

export {
  SetDataFilter,
  SetSortFilter,
};

export default filters;
