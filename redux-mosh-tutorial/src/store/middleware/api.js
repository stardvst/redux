import axios from 'axios';
import * as actions from '../api';

const api =
  ({ dispatch }) =>
  next =>
  async action => {
    if (action.type !== actions.apiCallBegan.type) {
      return next(action);
    }

    next(action); // to dispatch this ("api call began") action

    const { url, method, data, onSuccess, onError } = action.payload;

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
      dispatch(actions.apiCallFailure(error)); // general
      if (onError) {
        dispatch({ type: onError, payload: error }); // specific
      }
    }
  };

export default api;
