import axios from 'axios';
import * as actions from '../api';

const api =
  ({ dispatch }) =>
  next =>
  async action => {
    if (action.type !== actions.apiCallBegan.type) {
      return next(action);
    }

    const { url, method, data, onStart, onSuccess, onError } = action.payload;

    if (onStart) {
      dispatch({ type: onStart });
    }

    next(action); // to dispatch this ("api call began") action

    try {
      const response = await axios.request({
        baseURL: 'http://localhost:9001/api',
        url,
        method,
        data,
      });

      dispatch(actions.apiCallSuccess(response.data)); // general
      if (onSuccess) {
        dispatch({ type: onSuccess, payload: response.data }); // specific
      }
    } catch (error) {
      dispatch(actions.apiCallFailure(error.message)); // general
      if (onError) {
        dispatch({ type: onError, payload: error.message }); // specific
      }
    }
  };

export default api;
