import { configureStore } from '@reduxjs/toolkit';
import logger from './middleware/logger';
import reducer from './reducer';

export default function configureAppStore() {
  return configureStore({
    reducer, // root reducer
    middleware: [logger],
  });
}
