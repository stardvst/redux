import configureAppStore from './store/configureStore';
import { assignBugToUser, loadBugs, resolveBug } from './store/bugs';

const store = configureAppStore();

store.dispatch(loadBugs());
store.dispatch(assignBugToUser(3, 11));
setTimeout(() => store.dispatch(resolveBug(2)), 2000);
