import axios from 'axios';

import apiConfig from '../config';

export const INIT_MAP = 'INIT_MAP';
export const LOAD_API_INFO = 'LOAD_API_INFO';
export const LOAD_TOILETS_DATA = 'LOAD_TOILETS_DATA';
export const FILTER_CLOSED_TOILETS = 'FILTER_CLOSED_TOILETS';

export const initMap = () => (dispatch) => {
  dispatch({
    type: INIT_MAP,
  });
};

export const loadApiInfo = (payload) => (dispatch) => {
  dispatch({ type: LOAD_API_INFO, payload });
};

export const loadToiletsInfo = (payload) => (dispatch) => {
  dispatch({ type: LOAD_TOILETS_DATA, payload });
};

export const filterClosedToilets = () => (dispatch) => {
  dispatch({ type: FILTER_CLOSED_TOILETS });
};

export const getApiInfo = () => (dispatch) => {
  axios.get(apiConfig.apiInfo, {
    params: {
      api_key: process.env.REACT_APP_MOS_RU,
    },
  })
    .then((response) => {
      dispatch(loadApiInfo(response.data));
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getToiletsInfo = () => (dispatch) => {
  axios.get(apiConfig.features, {
    params: {
      api_key: process.env.REACT_APP_MOS_RU,
    },
  })
    .then((response) => {
      const { features } = response.data;
      dispatch(loadToiletsInfo(features));
    })
    .catch((error) => {
      console.error(error);
    });
};
