import moment from "moment";
import React from "react";
import "./Comment.css";

const Comment = ({ item }) => {
  const { comment, user, userImage, publishedAt } = item;
  return (
    <>
      <div className="d-flex my-2">
        <img
          src={userImage}
          alt=""
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            marginRight: "5px",
          }}
        />
        <div className="user-comments-meta">
          <div className="h5">{user}</div>
          <div className="user-comment">{comment}</div>
        </div>
      </div>
      <hr className="horizontal-line" />
    </>
  );
};

export default Comment;
