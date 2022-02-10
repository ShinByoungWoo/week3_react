// 댓글리스트와 댓글 컴포넌트

import React from "react";
import { Grid, Image, Text } from "../elements";

const CommentList = (props) => {

    return (
        <React.Fragment>
            <Grid padding="16px">
                <CommentItem/>
                <CommentItem/>
                <CommentItem/>
                <CommentItem/>
                <CommentItem/>
            </Grid>
        </React.Fragment>
    )
}

export default CommentList;


//같은 페이지라서 Export 안해도 됨
const CommentItem = (props) => {
    const {user_id, user_name, user_profile, post_id, insert_dt,contents} = props;
    return(
       
            <Grid is_flex>
                <Grid is_flex width="auto" margin='0px 4px'>
                    <Image shape="circle"/>
                    <Text  bold>{user_name}</Text>
                </Grid>
                <Grid is_flex>
                    <Text margin='0px'>{contents}</Text>
                    <Text margin='0px'>{insert_dt}</Text>
                   
                </Grid>
            </Grid>
        
    )
}

CommentItem.defaultProps = {
    user_profile: "",
    user_name: "병우",
    user_id: "",
    post_id: 1,
    contents: "개뽀리 멍충",
    insert_dt: "2022-02-06 04:23:37"
}

