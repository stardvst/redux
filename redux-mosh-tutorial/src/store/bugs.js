import { createAction, createReducer } from '@reduxjs/toolkit';

export const bugAdded = createAction('bugAdded');
export const bugRemoved = createAction('bugRemoved');
export const bugResolved = createAction('bugResolved');
export const bugUpdated = createAction('bugUpdated');

let lastId = 0;

export default createReducer([], {
  [bugAdded.type]: (bugs, action) => {
    bugs.push({
      id: ++lastId,
      description: action.payload.description,
      resolved: false,
    });
  },

  [bugResolved.type]: (bugs, action) => {
    const index = bugs.findIndex(bug => bug.id === action.payload.id);
    bugs[index].resolved = true;
  },

  [bugRemoved.type]: (bugs, action) => {
    return bugs.filter(bug => bug.id !== action.payload.id);
  },
});
