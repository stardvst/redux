/* Example 3 for bindActionCreators */
function example3() {
  const count = function (state, action) {
    if (action.type === 'INCREMENT') {
      return state ? state + 1 : 1;
    }
  };

  const reducer = combineReducers({
    count: count,
  });

  const store = createStore(reducer);

  const actionCreators = {
    incrementCount: function () {
      return { type: 'INCREMENT' };
    },
  };

  const bounded = bindActionCreators(actionCreators, store.dispatch);

  /*
    Now, bounded.incrementCount should be equal to:
    -----------------------------------------------
    store.dispatch(actionCreators.incrementCount());
    */

  document
    .querySelector('#example-3 button')
    .addEventListener('click', function () {
      bounded.incrementCount();
    });

  store.subscribe(function () {
    const state = store.getState();
    document.querySelector('#example-3 .count').innerHTML = state.count;
  });
}
example3();
