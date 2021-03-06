import {
  FILTER_CLOSED_TOILETS,
  INIT_MAP,
  LOAD_API_INFO,
  LOAD_TOILETS_DATA,
  SET_REQUEST_ERROR,
} from '../actions';

const initialState = {
  error: false,
  mapInitalized: false,
  apiInfo: null,
  toilets: null,
  initialToilets: null,
  isFiltered: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case INIT_MAP:
    return {
      ...state,
      mapInitalized: true,
    };
  case LOAD_API_INFO:
    return {
      ...state,
      apiInfo: action.payload,
    };
  case LOAD_TOILETS_DATA:
    return {
      ...state,
      toilets: action.payload,
      initialToilets: action.payload,
    };
  case FILTER_CLOSED_TOILETS:
    const filteredList = state.toilets.filter(
      (item) => item.properties.Attributes.CloseFlag !== 'закрыт',
    );
    const result = state.isFiltered ? state.initialToilets : filteredList;
    return {
      ...state,
      toilets: result,
      isFiltered: !state.isFiltered,
    };
  case SET_REQUEST_ERROR:
    return {
      ...state,
      error: true,
      errorMessage: action.payload,
    };
  default:
    return state;
  }
};
