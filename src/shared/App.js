import "./App.css";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import PostList from "../pages/PostList";
import Login from "../pages/Login";
import Header from "../components/Header";
import SignUp from "../pages/SignUp";
import { Grid } from "../elements";

function App() {
  return (
    <React.Fragment>
      {/* <BrowserRouter>
        <Route path="/" exact component={PostList} />
      </BrowserRouter> */}


      <Grid>
        <Header></Header>
        <ConnectedRouter history={history}>
          <Route path="/" exact component={PostList} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={SignUp} />
        </ConnectedRouter>
      </Grid>
    </React.Fragment>
  );
}

export default App;
