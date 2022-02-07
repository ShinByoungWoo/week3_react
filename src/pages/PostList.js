import React from "react";
import Post from "../components/Post";
import { useSelector, useDispatch } from "react-redux";
import { Grid } from "../elements";
import { actionCreators as postActions } from "../redux/modules/Post";

const PostList = (props) => {
  const post_list = useSelector((state) => state.post.list);
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.user);

  const { history } = props;

  React.useEffect(() => {
    if (post_list.length === 0) {
      dispatch(postActions.getPostFB());
    }
  }, []);

  return (
    <React.Fragment>
      <Grid backgroundcolor={"#EFF6FF"} padding="20px 0px">
        <Grid padding="16px">
          {post_list.map((post, index) => {
            if (post.user_info.user_id === user_info?.uid) {
              return (
                <Grid
                  backgroundcolor={"#fff"}
                  key={post.id}
                  _onClick={() => {
                    history.push(`/post/${post.id}`);
                  }}
                >
                  <Post {...post} is_me />
                </Grid>
              );
            } else {
              return (
                <Grid
                  backgroundcolor={"#fff"}
                  key={post.id}
                  _onClick={() => {
                    history.push(`/post/${post.id}`);
                  }}
                >
                  <Post {...post} />
                </Grid>
              );
            }
          })}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default PostList;
