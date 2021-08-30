import { createSelector, createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';

let lastId = 0;

const slice = createSlice({
  name: 'bugs',
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    bugAdded: (bugs, action) => {
      bugs.list.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
    },

    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex(bug => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },

    bugRemoved: (bugs, action) => {
      return bugs.list.filter(bug => bug.id !== action.payload.id);
    },

    bugAssigned: (bugs, action) => {
      const { bugId, userId } = action.payload;
      const index = bugs.list.findIndex(bug => bug.id === bugId);
      bugs.list[index].assignee = userId;
    },

    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
    },
  },
});

export default slice.reducer;
export const { bugAdded, bugResolved, bugRemoved, bugAssigned, bugsReceived } =
  slice.actions;

// action creators
const url = '/bugs';
export const loadBugs = () =>
  apiCallBegan({
    url,
    method: 'get',
    data: {},
    onSuccess: bugsReceived.type,
  });

export const getUnresolvedBugs = createSelector(
  state => state.entities.bugs,
  bugs => bugs.list.filter(bug => !bug.resolved)
);

export const getAssignedBugs = userId =>
  createSelector(
    state => state.entities.bugs,
    bugs => bugs.list.filter(bug => bug.assignee === userId)
  );
