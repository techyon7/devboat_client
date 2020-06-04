import React, { Fragment } from "react";
import Post from "../user-profile/Post";

export default function Posts(props) {
  return (
    <Fragment>
      {props.posts.map(item => (
        <Post
          key={item.id}
          id={item.id}
          content={item.content}
          date={item.created_on}
          userFirstName={props.userFirstName}
          userLastName={props.userLastName}
          userPicture={props.userPicture}
          userCrop={props.userCrop}
          loadPosts={props.loadPosts}
        />
      ))}
    </Fragment>
  );
}
