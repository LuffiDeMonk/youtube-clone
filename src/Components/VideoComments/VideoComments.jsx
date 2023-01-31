import React from "react";
import { BiSend } from "react-icons/bi";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { getComments, getVideoComments } from "../../Features/YoutubeSlice";
import Comment from "../Comment/Comment";
import "./VideoComments.css";

const VideoComments = ({ searchID }) => {
  const dispatch = useDispatch();
  const data = useSelector(getComments);

  const fetchComments = () => {
    dispatch(getVideoComments(searchID));
  };
  return (
    <div>
      <hr />
      <div className="h4">239 Comments</div>
      <form style={{ borderBottom: "5px", border: "none" }}>
        <input type="text" placeholder="Add a comment..." />
        <button style={{ backgroundColor: "red" }}>
          <BiSend />
        </button>
      </form>
      <hr />
      <InfiniteScroll
        dataLength={data.length}
        next={fetchComments}
        hasMore={true}
        loader={<h2>Loading...</h2>}
      >
        {data ? (
          data.map((item) => {
            return <Comment key={item.id} item={item} />;
          })
        ) : (
          <>Loading...</>
        )}
      </InfiniteScroll>
    </div>
  );
};

export default VideoComments;
