import React from "react";
import { Input, Text, Grid, Button } from "../elements";
import { getCookie, setCookie, deleteCookie } from "../shared/Cookie";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/User";

const Login = (props) => {

  const dispatch = useDispatch();
  const login = () => {
    dispatch(userActions.loginAction({ user_name : "로그인버튼클릭"}));

    // setCookie("user_id", "bborl", 3);
    // setCookie("user_pwd", "hagin", 3);
  };
  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text size="32px" bold>
          로그인
        </Text>
        <Grid padding="16px 0px">
          <Input
            label="아이디"
            placeholder="아이디를 입력해주세요"
            _onChange={() => {
              console.log("아이디");
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
        <Button
          text="로그인하기"
          _onClick={() => {
            login();
            console.log("로그인 됨");
          }}
        ></Button>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
