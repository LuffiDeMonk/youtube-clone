import React from "react";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import "../Components/Body/Body.css";
import SearchItem from "../Components/SearchItem/SearchItem";
import {
  getSearchTerm,
  getSearchVideos,
  searchVideos,
} from "../Features/YoutubeSlice";

const Search = () => {
  const items = useSelector(getSearchVideos);
  const searchTerm = useSelector(getSearchTerm);
  const dispatch = useDispatch();
  const fetchSearch = () => {
    if (searchTerm) {
      dispatch(searchVideos(searchTerm));
    }
  };
  return (
    <div className="body p-1 border border-secondary">
      <InfiniteScroll
        dataLength={items.length}
        hasMore={true}
        next={fetchSearch}
        loader={<>Loading...</>}
      >
        {items ? (
          items.map((item) => {
            return (
              <div key={item.id}>
                <SearchItem items={item} />
              </div>
            );
          })
        ) : (
          <h2>Loading...</h2>
        )}
      </InfiniteScroll>
    </div>
  );
};

export default Search;
