import React from "react";
import Post from "../components/Post";
import { useSelector, useDispatch } from "react-redux";
import { Grid } from "../elements";
import { actionCreators as postActions } from "../redux/modules/Post";
import produce from "immer";

const PostList = (props) => {
  const post_list = useSelector((state) => state.post.list);
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.user);

  React.useEffect(() => {
    if (post_list.length === 0) {
      dispatch(postActions.getPostFB());
    }
  }, []);
  return (
    <React.Fragment>
      <Grid padding="16px">
        {post_list.map((post, index) => {
          if (post.user_info.user_id === user_info?.uid) {
            return <Post key={post.id} {...post} is_me />;
          } else {
            return <Post key={post.id} {...post} />;
          }
        })}
      </Grid>
    </React.Fragment>
  );
};

export default PostList;
