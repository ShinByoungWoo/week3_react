import React from "react";
import Post from "../components/Post";
import CommentWrite from "../components/CommentList";
import CommentList from "../components/CommentWrite";
import { Button } from "../elements";
import { actionCreators as postActions } from "../redux/modules/Post";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const PostDetail = (props) => {
  // 삭제기능은 상세페이지 만들어 지면하자
  // const dispatch = useDispatch();
  // const params = useParams();
  // const post_id = params.index;
  // console.log(params.index)
  // // const { history } = props;
  // // const post_id = props.match.params.id;
  // const delete_list = useSelector((state) => state.post.delete_list);

  // // console.log(post_id);
  // const deletePost = () => {
  //   dispatch(postActions.deletePostFB(post_id, delete_list));
  // };

  const id = props.match.params.id;

  return (
    <React.Fragment>
      <Post />
      <CommentWrite />
      <CommentList />
      <Button
        padding="5px"
        width="auto"
        margin="5px"
        // _onClick={deletePost}
      >
        삭제
      </Button>
    </React.Fragment>
  );
};

export default PostDetail;
