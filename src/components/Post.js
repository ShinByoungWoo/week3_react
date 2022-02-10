import React from "react";
import { Grid, Image, Text, Button } from "../elements";
import { history } from "../redux/configureStore";

const Post = (props) => {
  
  const { value, id, contents, image_url } = props;

  return (
    <React.Fragment>
      <Grid>
        {/* 상세페이지 유저 프로필, 시간 수정버튼 */}
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

        {value === "left" && (
          <Grid padding="16px">
            <Grid
              is_flex
              margin="20px 0px"
              _onClick={() => {
                history.push(`/post/${id}`);
              }}
            >
              <Image
                shape="rectangle"
                src={image_url}
              />
              <Text size="32px" bold margin="0px 0px 0px 30px">
                {contents}
              </Text>
            </Grid>
          </Grid>
        )}

        {value === "right" && (
          <Grid padding="16px">
            <Grid
              is_flex
              margin="20px 0px"
              _onClick={() => {
                history.push(`/post/${id}`);
              }}
            >
              <Text size="32px" bold margin="0px 30px 0px 0px">
                {contents}
              </Text>
              <Image
                // size={500}
                shape="rectangle"
                src={image_url}
              />
            </Grid>
          </Grid>
        )}

        {value === "top" && (
          <Grid padding="16px">
            <Grid
              margin="20px 0px"
              _onClick={() => {
                history.push(`/post/${id}`);
              }}
            >
              <Image
                shape="rectangle"
                src={image_url}
              />
              <Text size="32px" bold margin="0px">
                {contents}
              </Text>
            </Grid>
          </Grid>
        )}

       

        <Grid>
          <Text margin="10px" bold>댓글 {props.comment_count}개</Text>
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
