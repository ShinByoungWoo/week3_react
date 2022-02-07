import "./App.css";
import React from "react";

import { BrowserRouter, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

import PostList from "../pages/PostList";
import Login from "../pages/Login";
import Header from "../components/Header";
import SignUp from "../pages/SignUp";

import Permit from "./Permit";
import { Button, Grid } from "../elements";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/User";
import { apiKey } from "./firebase";
import PostWrite from "../pages/PostWrite";
import PostDetail from "../pages/PostDetail";

function App() {
  const dispatch = useDispatch();
  //헤더는 중간컴포넌트고 앱이 시작점이니 여기서 한다..라고함
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  React.useEffect(() => {
    if (is_session) {
      dispatch(userActions.loginCheckFB());
    }
  }, []);

  return (
    <React.Fragment>
      <Grid>
        <Header></Header>
        <ConnectedRouter history={history}>
          <Route path="/" exact component={PostList} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/write" exact component={PostWrite} />
          <Route path="/post/:id" exact component={PostDetail} />
        </ConnectedRouter>
      </Grid>
      <Permit>
        <Button is_float text="+" _onClick={() => {
          {history.push('/write')}
        }}></Button>
      </Permit>
    </React.Fragment>
  );
}

export default App;
