import React from "react";
import Post from "../components/Post";
import CommentWrite from "../components/CommentList";
import CommentList from "../components/CommentWrite";
import { Button } from "../elements";
import { actionCreators as postActions } from "../redux/modules/Post";
import { useDispatch, useSelector } from "react-redux";
import { firestore } from "../shared/firebase";
import { history } from "../redux/configureStore";

const PostDetail = (props) => {
  // 삭제기능은 상세페이지 만들어 지면 하자
  const dispatch = useDispatch();
  //   const params = useParams();
  //   const post_id = params.id;
  //   console.log(params.index)
  // const { history } = props;
  const id = props.match.params.id;
  // const delete_list = useSelector((state) => state.post.delete_list);
  console.log(id);
  // console.log(post_id);
  const deletePost = () => {
    dispatch(postActions.deletePostFB(id));
  };

  

  const user_info = useSelector((state) => state.user.user);
  const post_list = useSelector((store) => store.post.list);
  const post_idx = post_list.findIndex((p) => p.id === id);
  const post = post_list[post_idx];

    // React.useEffect = (() => {
    //   const postDB = firestore.collection("post")
    //   postDB.doc(id).get().then(doc => {
    //   })
    // }, [])

  return (
    <React.Fragment>
      <Post {...post} is_me={post.user_info.user_id === user_info?.uid}></Post>
      <Button _onClick={deletePost}>게시글 삭제</Button>
      <CommentWrite />
      <CommentList />
    </React.Fragment>
  );
};

export default PostDetail;
