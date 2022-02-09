import React from "react";
import { Grid, Image, Text, Button } from "../elements";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/Post";

const Post = (props) => {
  const post_id = props.id;
  const post_list = useSelector((store) => store.post.list);
  const preview = useSelector((state) => state.image.preview);
  const _post_idx = post_list.findIndex((p) => p.id === post_id);
  console.log(post_list);
  console.log(_post_idx);
  // const post_idx = post_list[_post_idx];
  const dispatch = useDispatch();
  console.log(post_list);
  const deletePost = () => {
    dispatch(postActions.deletePostFB(_post_idx));
    // console.log('삭제')
  };
  const [value, setValue] = React.useState(null);
   
  const changeValue = (e) => {
    setValue(e.target.value);
  };

  const value_check = (e) => {
    if (e.target.checked) {
      setValue(e.target.value);
    }
  }


    return (
      <React.Fragment>
        <Grid>
          <Grid is_flex padding="16px">
            <Grid is_flex width="auto">
              <Image shape="circle" src={props.src} />
              <Text bold>{props.user_info.user_name}</Text>
            </Grid>
            <Grid is_flex width="auto">
              <Text>{props.insert_dt}</Text>
              {props.is_me && (
                <Button
                  padding="5px"
                  width="auto"
                  margin="5px"
                  _onClick={() => {
                    history.push(`/write/${props.id}`);
                  }}
                >
                  수정
                </Button>
              )}
            </Grid>
          </Grid>


   <Grid padding="16px">
     <label>
       <Grid is_flex margin="20px 0px">
         <Image
           size={500}
           shape="squear"
           src={preview ? preview : "http://via.placeholder.com/400x300"}
         />
         <div>
           <input type="radio" name="image" value="left" onChange={changeValue}/>
           <Text size="32px" bold margin="0px">
             왼쪽 그림 , 오른쪽 글자
           </Text>
         </div>
       </Grid>

    
      
          <Grid is_flex margin="20px 0px">
            <div>
              <input type="radio" name="image" value="right" onChange={changeValue}/>
              <Text size="32px" bold margin="0px">
                오른쪽 그림 , 왼쪽 글자
              </Text>
            </div>
            <Image
              size={500}
              shape="squear"
              src={preview ? preview : "http://via.placeholder.com/400x300"}
            />
          </Grid>

          <Grid margin="auto">
            <Image
              size={500}
              shape="squear"
              src={preview ? preview : "http://via.placeholder.com/400x300"}
            />
            <input type="radio" name="image" value="top" onChange={changeValue}/>
            <Text size="32px" bold margin="0px">
              하단 글짜
            </Text>
          </Grid>
        </label>
      </Grid>


        
        <Grid padding="16px">
          <Text>{props.contents}</Text>
        </Grid>
        <Grid>
          <Image shape="rectangle" src={props.image_url}></Image>
        </Grid>
        <Grid>
          <Text bold>댓글 {props.comment_count}개</Text>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Post.defaultProps = {
  user_info: {
    user_name: "병우",
    user_profile:
      "https://media.vlpt.us/images/tkejt1343/post/c3ffac0c-3c7b-4076-b4e3-027578aeac06/%EB%BD%80%EB%A6%AC2.jpg",
  },
  image_url:
    "https://media.vlpt.us/images/tkejt1343/post/c3ffac0c-3c7b-4076-b4e3-027578aeac06/%EB%BD%80%EB%A6%AC2.jpg",
  contents: "귀엽지",
  comment_count: 10,
  insert_dt: "2022-02-04 10:00:00",
  is_me: false,
};

export default Post;
