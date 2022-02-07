import React from "react";
import Post from "../components/Post";
import CommentWrite from "../components/CommentList";
import CommentList from "../components/CommentWrite";

const PostDetail = (props) => {

    return (
        <React.Fragment>
            <Post/>
            <CommentWrite/>
            <CommentList/>
        </React.Fragment>
    )
}

export default PostDetail;