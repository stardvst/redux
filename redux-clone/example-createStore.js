/* Example 1 for createStore */
function example1() {
  const reducer = (state, action) => {
    if (action.type === 'INCREMENT') {
      return state ? state + 1 : 1;
    }
  };

  const store = createStore(reducer);

  document
    .querySelector('#example-1 button')
    .addEventListener('click', function () {
      store.dispatch({ type: 'INCREMENT' });
    });

  store.subscribe(function () {
    const state = store.getState();
    document.querySelector('#example-1 .count').innerHTML = state;
  });
}

example1();

/***
 To make this work with React (or really any virtual-dom system),
 all you would do is:
    const el = document.getElementById('app');
    store.subscribe(function() {
        render(<App {...store.getState()} />, el);
    });
 ***/
