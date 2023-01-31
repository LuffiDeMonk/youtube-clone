import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import "../Body/Body.css";
import "./VideoPlayer.css";

import VideoMeta from "../VideoMeta/VideoMeta";
import VideoComments from "../VideoComments/VideoComments";
import RelatedVideos from "../RelatedVideos/RelatedVideos";
import { useEffect } from "react";
import {
  getRelatedVideos,
  getSelectedVideo,
  getVideoComments,
} from "../../Features/YoutubeSlice";

const VideoPlayer = () => {
  const params = useParams();
  const { searchID } = params;

  const dispatch = useDispatch();

  console.log(searchID);
  useEffect(() => {
    if (searchID) {
      dispatch(getSelectedVideo(searchID));
      dispatch(getVideoComments(searchID));
      dispatch(getRelatedVideos(searchID));
    }
  }, [searchID]);

  return (
    <div className="body">
      <div className="row">
        <div className="col-lg-8">
          <div className="media-player">
            <iframe
              src={`https://www.youtube.com/embed/${searchID}?autoplay=1&mute=1`}
              width="100%"
              height="100%"
            ></iframe>
          </div>
          <VideoMeta />
          <VideoComments searchID={searchID} />
        </div>
        <div className="col-lg-4 p-0">
          <RelatedVideos />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
