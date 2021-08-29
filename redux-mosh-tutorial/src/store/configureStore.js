import { configureStore } from '@reduxjs/toolkit';
import logger from './middleware/logger';
import errorHandler from './middleware/errorHandler';
// import func from './middleware/func';
import reducer from './reducer';
import api from './middleware/api';

export default function configureAppStore() {
  return configureStore({
    reducer, // root reducer
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
        .concat(logger('console'))
        .concat(errorHandler)
        .concat(api),
  });
}
