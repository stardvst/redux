import configureAppStore from './store/configureStore';
import {
  bugAdded,
  bugAssigned,
  bugRemoved,
  bugResolved,
  getAssignedBugs,
  getUnresolvedBugs,
} from './store/bugs';
import { projectAdded } from './store/projects';
import { userAdded } from './store/user';

const store = configureAppStore();

const unsubscribe = store.subscribe(() => {
  console.log('State changed!', store.getState());
});

store.dispatch(projectAdded({ name: 'Project1' }));

store.dispatch(userAdded({ name: 'User1' }));
store.dispatch(userAdded({ name: 'User2' }));

store.dispatch(bugAdded({ description: 'Bug1' }));
store.dispatch(bugAdded({ description: 'Bug2' }));
store.dispatch(bugAdded({ description: 'Bug3' }));
// unsubscribe();
store.dispatch(bugResolved({ id: 1 }));
// store.dispatch(bugRemoved({ id: 1 }));

store.dispatch(bugAssigned({ bugId: 1, userId: 1 }));
store.dispatch(bugAssigned({ bugId: 3, userId: 2 }));

const x = getUnresolvedBugs(store.getState());
const y = getUnresolvedBugs(store.getState());
console.log(x === y);

const assignedBugs = getAssignedBugs(1)(store.getState(), 1);
console.log(assignedBugs);
