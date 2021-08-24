/* Example 2 for combineReducers */
function example2() {
  const count = function (state, action) {
    if (action.type === 'INCREMENT') {
      return state ? state + 1 : 1;
    }
  };

  /*
    The following should be equal to doing:
    ------------------------------
    const reducer = function(state, action) {
      return {
        count: count(state.count, action)
      };
    };
    */

  const reducer = combineReducers({
    count: count,
  });

  const store = createStore(reducer);

  document
    .querySelector('#example-2 button')
    .addEventListener('click', function () {
      store.dispatch({ type: 'INCREMENT' });
    });

  store.subscribe(function () {
    const state = store.getState();
    document.querySelector('#example-2 .count').innerHTML = state.count;
  });
}
example2();
