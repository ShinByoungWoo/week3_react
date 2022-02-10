// 게시글 작성(등록 삭제 가능) 컴포넌트

import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Grid, Text, Button, Image, Input } from "../elements";
import UpLoad from "../shared/UpLoad";
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

  const [value, setValue] = React.useState(null);

  const changeContents = (e) => {
    setContents(e.target.value);
  };

  const changeValue = (e) => {
    setValue(e.target.value);
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
    dispatch(postActions.addPostFB(contents, value));
  };

  const editPost = () => {
    dispatch(postActions.editPostFB(post_id, { contents: contents }));
  };

  //로그인 안됐을 때
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

  //로그인 됐을 때
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
            레이아웃 고르기
          </Text>
        </Grid>
      </Grid>

      {/* 왼쪽 그림 배치 */}
      <Grid padding="16px">
        <Grid is_flex margin="20px 0px">
          <Image
            size={500}
            shape="squear"
            src={preview ? preview : "http://via.placeholder.com/400x300"}
          />
          <label>
            <input
              type="radio"
              name="image"
              value="left"
              onChange={changeValue}
            />
            <Text size="32px" bold margin="0px">
              왼쪽 그림 , 오른쪽 글자
            </Text>
          </label>
        </Grid>

        {/* 오른쪽 그림 배치 */}
        <Grid is_flex margin="20px 0px">
          <label>
            <input
              type="radio"
              name="image"
              value="right"
              onChange={changeValue}
            />
            <Text size="32px" bold margin="0px">
              오른쪽 그림 , 왼쪽 글자
            </Text>
          </label>
          <Image
            size={500}
            shape="squear"
            src={preview ? preview : "http://via.placeholder.com/400x300"}
          />
        </Grid>

        {/* 상단 그림 배치 */}
        <Grid margin="20px 0px">
          <Image
            size={500}
            shape="squear"
            src={preview ? preview : "http://via.placeholder.com/400x300"}
          />
          <label>
            <input
              type="radio"
              name="image"
              value="top"
              onChange={changeValue}
            />
            <Text size="32px" bold margin="0px">
              상단 그림, 하단 글자
            </Text>
          </label>
        </Grid>
      </Grid>

      {/* 게시글 작성 및 수정 */}
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
        {is_edit ? (
          <Button
            _onClick={editPost}
            _disabled={contents === "" || value === "" ? true : false}
          >
            게시글 수정
          </Button>
        ) : (
          <Button
            _onClick={addPost}
            _disabled={contents === "" || value === "" ? true : false}
          >
            게시글 작성
          </Button>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default PostWrite;
