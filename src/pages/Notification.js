import React from "react";
import Card from "../components/Card";
import { Grid, Text, Image } from "../elements";

//알림
const Notification = (porps) => {
  let noti = [
    {
      user_name: "qqqq",
      post_id: "post1",
      image_url: "",
    },
    {
      user_name: "qqqq",
      post_id: "post1",
      image_url: "",
    },
    {
      user_name: "qqqq",
      post_id: "post1",
      image_url: "",
    },
    {
      user_name: "qqqq",
      post_id: "post1",
      image_url: "",
    },
    {
        user_name: "qqqq",
        post_id: "post1",
        image_url: "",
      },
  ];
  return (
    <React.Fragment>
      <Grid padding="16px" backgroundcolor="#EFF6FF">
        {noti.map((n) => {
          return (
            <Card key={n.post_id} {...n}></Card>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};

export default Notification;
