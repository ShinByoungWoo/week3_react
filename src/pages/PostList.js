// 메인화면, 전체 게시글을 보여주며 무한스크롤 가능

import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Post from "../components/Post";
import { Grid } from "../elements";
import { actionCreators as postActions } from "../redux/modules/Post";
import InfinityScroll from "../shared/InfinityScroll";

const PostList = (props) => {
  const post_list = useSelector((state) => state.post.list);
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.user);
  const is_loading = useSelector((state) => state.post.is_loading);
  const paging = useSelector((state) => state.post.paging);

  const { history } = props;

  React.useEffect(() => {
    if (post_list.length === 0) {
      dispatch(postActions.getPostFB());
    }
  }, []);

  return (
    <React.Fragment>
      <InfinityScroll
        callNext={() => {
          dispatch(postActions.getPostFB(paging.next));
        }}
        is_next={paging.next ? true : false}
        loading={is_loading}
      >
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
      </InfinityScroll>
    </React.Fragment>
  );
};

export default PostList;
