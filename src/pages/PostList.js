import React from "react";
import Post from "../components/Post";
import { useSelector, useDispatch } from "react-redux";
import { Grid } from "../elements";
import { actionCreators as postActions } from "../redux/modules/Post";


const PostList = (props) => {
  const post_list = useSelector((state) => state.post.list);
  const dispatch = useDispatch();

 
  React.useEffect(() => {
    if(post_list.length === 0){
      dispatch(postActions.getPostFB());
    }
    
  }, [])
  return (
    <React.Fragment>
      <Grid padding='16px'>
        {post_list.map((post, index) => {
          return<Post key={post.id} {...post}/>
        })}
      </Grid>
    </React.Fragment>
  );
};

export default PostList;
