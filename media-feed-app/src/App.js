import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { Navbar } from "./app/Navbar";
import { AddPostForm } from "./features/posts/AddPostForm";
import { PostList } from "./features/posts/PostList";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <>
                <AddPostForm />
                <PostList />
              </>
            )}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
