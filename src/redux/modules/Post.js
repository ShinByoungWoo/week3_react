import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore, storage } from "../../shared/firebase";
import moment from "moment";
import { actionCreators as imageActions } from "./image";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";

//액션 생성자
const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));
const deletePost = createAction(DELETE_POST, (post_id, post) => ({
  post_id,
  post,
}));

//이니셜 스테이츠
const initialState = {
  list: [],
};

const initialPost = {
  // id: 0,
  // user_info: {
  //   user_name: "병우",
  //   user_profile:
  //     "https://media.vlpt.us/images/tkejt1343/post/c3ffac0c-3c7b-4076-b4e3-027578aeac06/%EB%BD%80%EB%A6%AC2.jpg",
  // },
  image_url:
    "https://media.vlpt.us/images/tkejt1343/post/c3ffac0c-3c7b-4076-b4e3-027578aeac06/%EB%BD%80%EB%A6%AC2.jpg",
  contents: "",
  comment_count: 10,
  // insert_dt: "2022-02-04 10:00:00",
  insert_dt: moment().format("YYYY-MM-dd hh:mm:ss"),
};

//미들웨어 - 목록 삭제하기(delete)
const deletePostFB = (post_id, post = {}) => {
  console.log('처음포스트아아디', post_id)
  return function (dispatch, getState, { history }) {
   
    const _delete_list = getState().post.list;
    const delete_idx = _delete_list.findIndex((p) => p.id === post_id);
    // console.log(delete_idx)
    const postDB = firestore.collection("post");
    postDB
      .doc(delete_idx)
      .delete()
      .then((doc) => {
        dispatch(deletePost(delete_idx, _delete_list));
        history.replace("/");
      })
      .catch((err) => {
        window.alert("이미지 업로드 오류");
        console.log("이미지 업로드 실패!", err);
      });
  };
};

//미들웨어 - 목록 수정하기(update)
const editPostFB = (post_id = null, post = {}) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      console.log("게시물 정보가 없습니다.");
      return;
    }
    const _image = getState().image.preview;

    const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);
    console.log(_post_idx)
    const _post = getState().post.list[_post_idx];

    console.log(_image, _post);
    const postDB = firestore.collection("post");

    if (_image === _post.image_url) {
      postDB
        .doc(post_id)
        .update(post)
        .then((doc) => {
          dispatch(editPost(post_id, { ...post }));
          history.replace("/");
        });
      return;
    } else {
      const user_id = getState().user.user.uid;
      const _upload = storage
        .ref(`images/${user_id}_${new Date().getTime()}`)
        .putString(_image, "data_url");

      _upload.then((snapshot) => {
        snapshot.ref
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            return url;
          })
          .then((url) => {
            postDB
              .doc(post_id)
              .update({ ...post, image_url: url })
              .then((doc) => {
                dispatch(editPost(post_id, { ...post, image_url: url }));
                history.replace("/");
              });
          })
          .catch((err) => {
            window.alert("이미지 업로드 오류");
            console.log("이미지 업로드 실패!", err);
          });
      });
    }
  };
};

//미들웨어 - 목록 추가하기(create)
const addPostFB = (contents = "") => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");

    const _user = getState().user.user;
    const user_info = {
      user_name: _user.user_name,
      user_id: _user.uid,
      user_profile: _user.user_profile,
    };

    const _post = {
      ...initialPost,
      contents: contents,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    };
    const _image = getState().image.preview;

    const _upload = storage
      .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
      .putString(_image, "data_url");

    _upload.then((snapshot) => {
      snapshot.ref
        .getDownloadURL()
        .then((url) => {
          console.log(url);
          return url;
        })
        .then((url) => {
          postDB
            .add({ ...user_info, ..._post, image_url: url })
            .then((doc) => {
              let post = { user_info, ..._post, id: doc.id, image_url: url };
              dispatch(addPost(post));
              history.replace("/");
              console.log(post);
              dispatch(imageActions.setPreview(null));
            })
            .catch((err) => {
              window.alert("포스트 작성 오류");
              console.log("post 작성 실패!", err);
            });
        })
        .catch((err) => {
          window.alert("이미지 업로드 오류");
          console.log("이미지 업로드 실패!", err);
        });
    });
  };
};

//미들웨어 - 목록 불러오기(Read)
const getPostFB = () => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");

    postDB.get().then((docs) => {
      let post_list = [];
      docs.forEach((doc) => {
        let _post = doc.data();
        let post = Object.keys(_post).reduce(
          (acc, cur) => {
            if (cur.indexOf("user_") !== -1) {
              return {
                ...acc,
                user_info: { ...acc.user_info, [cur]: _post[cur] },
              };
            }
            return { ...acc, [cur]: _post[cur] };
          },
          { id: doc.id, user_info: {} }
        );
        post_list.push(post);
      });

      dispatch(setPost(post_list));
    });
  };
};

//리듀서
export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
      }),
    [DELETE_POST]: (state, action) => produce(state, (draft) => {
      draft.list.filter((list, index) => {
        return parseInt(action.delete_idx) !== index;
      })
    })
  },
  initialState
);

const actionCreators = {
  setPost,
  addPost,
  getPostFB,
  addPostFB,
  editPostFB,
  deletePostFB,
};

export { actionCreators };
