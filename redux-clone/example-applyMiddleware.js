/* Example 4 for applyMiddleware */
function example4() {
  const count = function (state, action) {
    if (action.type === 'INCREMENT') {
      return state ? state + 1 : 1;
    }
  };

  const reducer = combineReducers({
    count: count,
  });

  function async(store) {
    return function (next) {
      return function (action) {
        const result = next(action);
        if (action.type === 'INCREMENT') {
          alert('Incremented!');
        }
        return result;
      };
    };
  }

  const store = applyMiddleware(async)(createStore)(reducer);

  document
    .querySelector('#example-4 button')
    .addEventListener('click', function () {
      store.dispatch({ type: 'INCREMENT' });
    });

  store.subscribe(function () {
    const state = store.getState();
    document.querySelector('#example-4 .count').innerHTML = state.count;
  });
}
example4();
