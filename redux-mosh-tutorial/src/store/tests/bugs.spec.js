import { addBug } from '../bugs';
import configureAppStore from './../configureStore';

describe('bugsSlice', () => {
  it('should handle addBug action', async () => {
    const store = configureAppStore();
    await store.dispatch(addBug());
    expect(store.getState().entities.bugs.list).toHaveLength(1);
  });
});
