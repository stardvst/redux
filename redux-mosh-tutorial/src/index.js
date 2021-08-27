import configureAppStore from './store/configureStore';
import { bugAdded, bugRemoved, bugResolved } from './store/bugs';

const store = configureAppStore();

const unsubscribe = store.subscribe(() => {
  console.log('State changed!', store.getState());
});

store.dispatch(bugAdded({ description: 'Bug1' }));
store.dispatch(bugAdded({ description: 'Bug2' }));
store.dispatch(bugAdded({ description: 'Bug3' }));
// unsubscribe();
store.dispatch(bugResolved({ id: 1 }));
store.dispatch(bugRemoved({ id: 1 }));
console.log(store.getState());
