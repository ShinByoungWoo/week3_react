import React from "react";
import { Grid, Text, Input, Button } from "../elements";

const SignUp = (props) => {
  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text size="32px" bold>
          회원가입
        </Text>

        <Grid padding="16px 0px">
          <Input
            label="아이디"
            placeholder="아이디를 입력해주세요"
            _onChange={() => {
              console.log("회원가입 아이디");
            }}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="닉네임"
            placeholder="닉네임을 입력해주세요"
            _onChange={() => {
              console.log("회원가입 닉네임");
            }}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            _onChange={() => {
              console.log("비번");
            }}
          />
        </Grid>
        <Grid padding="16px 0px">
          <Input
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력해주세요"
            _onChange={() => {
              console.log("비번확인");
            }}
          />
        </Grid>
        <Grid padding="16px 0px">
          <Button _onClick={() => {
            console.log('회원가입 버튼')
          }} text="회원가입 하기"></Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default SignUp;
