// 게시글 상세 페이지 컴포넌트

import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Post from "../components/Post";
import CommentWrite from "../components/CommentList";
import CommentList from "../components/CommentWrite";
import { Button } from "../elements";
import { actionCreators as postActions } from "../redux/modules/Post";



const PostDetail = (props) => {
  const dispatch = useDispatch();
  const id = props.match.params.id;

  const deletePost = () => {
    dispatch(postActions.deletePostFB(id));
  };

  const user_info = useSelector((state) => state.user.user);
  const post_list = useSelector((store) => store.post.list);
  const post_idx = post_list.findIndex((p) => p.id === id);
  const post = post_list[post_idx];

  const onReload = () => {
    deletePost();
  };

  return (
    <React.Fragment>
      <Post {...post} is_me={post.user_info.user_id === user_info?.uid}></Post>
      <Button _onClick={onReload}>게시글 삭제</Button>
      <CommentWrite />
      <CommentList />
    </React.Fragment>
  );
};

export default PostDetail;
