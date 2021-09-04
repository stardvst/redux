import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { addBug, getUnresolvedBugs, loadBugs, resolveBug } from '../bugs';
import configureAppStore from './../configureStore';

describe('bugsSlice', () => {
  let fakeAxios;
  let store;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureAppStore();
  });

  const bugsSlice = () => {
    return store.getState().entities.bugs;
  };

  const createState = () => ({
    entities: {
      bugs: {
        list: [],
      },
    },
  });

  it("should add the bug to the store if it's saved to the server", async () => {
    // arrange
    const bug = { description: 'a' };
    const savedBug = { ...bug, id: 1 };
    fakeAxios.onPost('/bugs').reply(200, savedBug);

    // act
    await store.dispatch(addBug(bug));

    // assert
    expect(bugsSlice().list).toContainEqual(savedBug);
  });

  it("should not add the bug to the store if it's not saved to the server", async () => {
    const bug = { description: 'a' };
    fakeAxios.onPost('/bugs').reply(500);

    await store.dispatch(addBug(bug));

    expect(bugsSlice().list).toHaveLength(0);
  });

  it("should resolve the bug in the store if it's resolved in the server", async () => {
    fakeAxios.onPost('/bugs').reply(200, { id: 1 });
    fakeAxios.onPatch('/bugs/1').reply(200, { id: 1, resolved: true });

    await store.dispatch(addBug({}));
    await store.dispatch(resolveBug(1));

    expect(bugsSlice().list[0].resolved).toBe(true);
  });

  it("should not resolve the bug in the store if it's resolved in the server", async () => {
    fakeAxios.onPost('/bugs').reply(200, { id: 1 });
    fakeAxios.onPatch('/bugs/1').reply(500);

    await store.dispatch(addBug({}));
    await store.dispatch(resolveBug(1));

    expect(bugsSlice().list.resolved).not.toBe(true);
  });

  describe('unresolved bugs', () => {
    it('should return unresolved bugs', () => {
      const state = createState();
      state.entities.bugs.list = [
        { id: 1, resolved: true },
        { id: 2 },
        { id: 3 },
      ];

      const result = getUnresolvedBugs(state);

      expect(result).toHaveLength(2);
    });
  });

  describe('loading bugs', () => {
    describe('if bugs exist in cache', () => {
      it('they should not be fetched from server', async () => {
        fakeAxios.onGet('/bugs').reply(200, [{ id: 1 }]);

        await store.dispatch(loadBugs());
        await store.dispatch(loadBugs());

        expect(fakeAxios.history.get.length).toBe(1);
      });
    });

    describe("if bugs don't exist in cache", () => {
      it('they should not be fetched from server', async () => {
        fakeAxios.onGet('/bugs').reply(200, [{ id: 1 }]);
        await store.dispatch(loadBugs());
        expect(bugsSlice().list).toHaveLength(1);
      });

      describe('loading indicator', () => {
        it('should be true while fetching the bugs', () => {
          fakeAxios.onGet('/bugs').reply(() => {
            expect(bugsSlice().loading).toBe(true);
            return [200, [{ id: 1 }]];
          });
          store.dispatch(loadBugs());
        });

        it('should be false after fetching the bugs', async () => {
          fakeAxios.onGet('/bugs').reply(200, [{ id: 1 }]);
          await store.dispatch(loadBugs());
          expect(bugsSlice().loading).toBe(false);
        });

        it('should be false if server returns error', async () => {
          fakeAxios.onGet('/bugs').reply(500);
          await store.dispatch(loadBugs());
          expect(bugsSlice().loading).toBe(false);
        });
      });
    });
  });
});
