import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  getActiveCategory,
  getPageToken,
  getPopularVideos,
  getVideoCategories,
  getYoutubeVideos,
} from "../../Features/YoutubeSlice";
import Categories from "../Categories/Categories";
import VideoItem from "../VideoItem/VideoItem";
import "./Body.css";

const Body = () => {
  const dispatch = useDispatch();
  const items = useSelector(getYoutubeVideos);
  const pageToken = useSelector(getPageToken);
  const activeElement = useSelector(getActiveCategory);
  useEffect(() => {
    dispatch(getVideoCategories());
    dispatch(getPopularVideos());
  }, [dispatch]);
  const fetchData = () => {
    if (pageToken) {
      dispatch(getPopularVideos());
    }
  };
  return (
    <div className="body container-lg-fluid ">
      <Categories />
      <InfiniteScroll
        dataLength={items.length}
        next={fetchData}
        hasMore={true}
        loader={<h2>Loading....</h2>}
        className="row gx-0 gx-lg-2 gy-lg-5 mx-lg-2"
        style={{ backgroundColor: "whitesmoke" }}
      >
        {items ? (
          items.map((item) => {
            return (
              <div className="col-12 col-lg-3" key={item.thumbnail}>
                <VideoItem item={item} />
              </div>
            );
          })
        ) : (
          <>Loading...</>
        )}
      </InfiniteScroll>
    </div>
  );
};

export default Body;
