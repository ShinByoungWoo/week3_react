import React from "react";
import { Grid, Button, Text, Image } from "../elements";

const Test = (props) => {
  return (
    <React.Fragment>
      <Grid>
        <label>
          <Grid is_flex margin="20px 0px">
            <Image size={500} shape="squear" />
            <div>
              <input type="radio" name="image" value="left_img" />
              <Text size="32px" bold>
                왼쪽 그림 , 오른쪽 글자
              </Text>
            </div>
          </Grid>

          <Grid is_flex margin="20px 0px">
            <div>
              <input type="radio" name="image" value="right_img" />
              <Text size="32px" bold>
                오른쪽 그림 , 왼쪽 글자
              </Text>
            </div>
            <Image size={500} shape="squear" />
          </Grid>

          <Grid margin="auto">
            <Image size={500} shape="squear" />
            <input type="radio" name="image" value="top_img" />
            <Text size="32px" bold>
              {" "}
              하단 글짜
            </Text>
          </Grid>
        </label>
      </Grid>
    </React.Fragment>
  );
};

export default Test;
