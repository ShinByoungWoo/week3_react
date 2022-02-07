import React from "react";
import { Grid, Text, Button, Image, Input } from "../elements";
import UpLoad from "../shared/UpLoad";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/Post";
import { actionCreators as imageActions } from "../redux/modules/image";

const PostWrite = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const preview = useSelector((state) => state.image.preview);
  const post_list = useSelector((state) => state.post.list);
  const { history } = props;

  const post_id = props.match.params.id;
  const is_edit = post_id ? true : false;

  let _post = is_edit ? post_list.find((post) => post.id === post_id) : null;

  const [contents, setContents] = React.useState(_post ? _post.contents : "");

  const changeContents = (e) => {
    setContents(e.target.value);
  };

  React.useEffect(() => {
    if (is_edit && !_post) {
      console.log("포스트정보 없음");
      history.goBack();
      return;
    }

    if (is_edit) {
      dispatch(imageActions.setPreview(_post.image_url));
    }
  }, []);

 
  const addPost = () => {
    dispatch(postActions.addPostFB(contents));
  };

  const editPost = () => {
    dispatch(postActions.editPostFB(post_id, {contents: contents}))
  }


  if (!is_login) {
    return (
      <Grid margin="100px 0px" padding="16px" center>
        <Text size="24px" bold>
          로그인 되지 않았습니다.
        </Text>
        <Text size="24px" bold>
          로그인 후 다시 시도해주십시오.
        </Text>
        <Button
          _onClick={() => {
            history.replace("/login");
          }}
        >
          로그인 하러가기
        </Button>
      </Grid>
    );
  }
  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text margin="0px" size="36px" bold>
          {is_edit ? "게시글 수정" : "게시글 작성"}
        </Text>
        <UpLoad />
      </Grid>

      <Grid padding="16px">
        <Grid>
          <Text margin="0px" size="24px" bold>
            미리보기
          </Text>
        </Grid>
        <Image
          shape="rectangle"
          src={preview ? preview : "http://via.placeholder.com/400x300"}
        />
      </Grid>
      <Grid padding="16px">
        <Input
          value={contents}
          _onChange={changeContents}
          label="게시글내용"
          placeholder="게시글 작성"
          multiLine
        />
      </Grid>
      <Grid padding="16px">
        {is_edit ? <Button _onClick={editPost}>게시글 수정</Button> : <Button _onClick={addPost}>게시글 작성</Button>}
      </Grid>
    </React.Fragment>
  );
};

export default PostWrite;
