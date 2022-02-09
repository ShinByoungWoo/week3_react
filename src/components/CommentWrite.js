// 댓글 입력 인풋 정보 컴포넌트

import React from "react";
import { Grid, Input, Button } from "../elements";

const CommentWrite = (props) => {
  return (
    <React.Fragment>
      <Grid is_flex padding="16px">
        <Input placeholder="댓글 내용을 입력해주세요" />
        <Button width="50px" >작성</Button>
      </Grid>
    </React.Fragment>
  );
};

export default CommentWrite;
