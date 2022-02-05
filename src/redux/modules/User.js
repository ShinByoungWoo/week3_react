import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";
import { auth } from "../../shared/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

//actions
// const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

//actio creators !
// const logIn = createAction(LOG_IN, (user) => ({ user })); // (타입, 리턴값 )
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));

//initialstate
const initialstate = {
  user: null,
  is_login: false,
};

// const user_initial = {
//   user_name : 'tkejt1343',
// }

// middleware actions
const loginAction = (user) => {
  return function (dispatch, getState, { history }) {
    console.log(history, "히스토링ㅇㅇㅇ");
    dispatch(setUser(user));
    history.push("/");
  };
};

const signupFB = (id, pwd, name) => {
  return function (dispatch, getstate, history) {


  };
};

//reducer + handleAction
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        setCookie("is_login", "success");
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("is_login");
        draft.user = null;
        draft.is_login = false;
      }),
    [GET_USER]: (state, action) => produce(state, () => {}),
  },
  initialstate
);

//action create export
const actionCreators = {
  // logIn,
  logOut,
  getUser,
  loginAction,
};

export { actionCreators };
