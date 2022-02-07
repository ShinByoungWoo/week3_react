import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const { text, _onClick, is_float, children, margin, width, padding} = props;

  if (is_float) {
    return (
      <React.Fragment>
        <FloatButton onClick={_onClick}>{text? text:children}</FloatButton>
      </React.Fragment>
    );
  }

  const styles = {
    margin: margin,
    width: width,
    padding: padding,
  };

  return (
    <React.Fragment>
      <EleButton {...styles} onClick={_onClick}>{text? text:children}</EleButton>
    </React.Fragment>
  );
};

Button.defaultProps = {
  text: false,
  children: null,
  _onClick: () => {},
  is_float: false,
  margin: false,
  width: '100%',
  padding: "12px 0px",
};

const EleButton = styled.button`
  width: ${(props) => props.width};
  ${(props) => (props.margin? `margin: ${props.margin};` : "")}
  background-color: #212121;
  color: #ffffff;
  padding: ${(props) => props.padding};
  box-sizing: border-box;
  border: none;
  cursor: pointer;
`;

const FloatButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: #212121;
  color: #fff;
  box-sizing: border-box;
  font-size: 36px;
  font-weight: 800;
  position: fixed;
  text-align: center;
  vertical-align: middle;
  bottom: 50px;
  right: 16px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
`;

export default Button;
