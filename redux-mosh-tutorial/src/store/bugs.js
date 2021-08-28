import { createSelector, createSlice } from '@reduxjs/toolkit';

let lastId = 0;

const slice = createSlice({
  name: 'bugs',
  initialState: [],
  reducers: {
    bugAdded: (bugs, action) => {
      bugs.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
    },
    bugResolved: (bugs, action) => {
      const index = bugs.findIndex(bug => bug.id === action.payload.id);
      bugs[index].resolved = true;
    },

    bugRemoved: (bugs, action) => {
      return bugs.filter(bug => bug.id !== action.payload.id);
    },

    bugAssigned: (bugs, action) => {
      const { bugId, userId } = action.payload;
      const index = bugs.findIndex(bug => bug.id === bugId);
      bugs[index].assignee = userId;
    },
  },
});

export default slice.reducer;
export const { bugAdded, bugResolved, bugRemoved, bugAssigned } = slice.actions;

export const getUnresolvedBugs = createSelector(
  state => state.entities.bugs,
  bugs => bugs.filter(bug => !bug.resolved)
);

export const getAssignedBugs = userId =>
  createSelector(
    state => state.entities.bugs,
    bugs => bugs.filter(bug => bug.assignee === userId)
  );
