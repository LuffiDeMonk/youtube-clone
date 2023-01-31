import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import moment from "moment";
import numeral from "numeral";
import { API_KEY } from "../Api/Api";
import ShowMoreText from "react-show-more-text";
import { selectedVideoInfo } from "../../Features/YoutubeSlice";
import "./VideoMeta.css";

const VideoMeta = () => {
  const [value, setValue] = useState("");
  const [channelViews, setChannelViews] = useState("");
  const [icon, setIcon] = useState("");

  let data = useSelector(selectedVideoInfo);

  if (data) {
    useEffect(() => {
      const getChannelIcon = async () => {
        const response = await Axios.get(
          `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics&id=${data.snippet.channelId}&key=${API_KEY}`
        );
        setIcon(response.data.items[0].snippet.thumbnails.default.url);
        setChannelViews(response.data.items[0].statistics.subscriberCount);
      };
      getChannelIcon();
    }, [data]);
  }
  return (
    <>
      {data && icon && channelViews ? (
        <>
          <div className="video-title">{data.snippet.title}</div>
          <div className="d-flex">
            <div className="video-views">
              {numeral(data.statistics.viewCount).format("0.a").toUpperCase()}
              &nbsp;views
            </div>
            <div className="mx-1">•</div>
            <div className="video-timestamp">
              {moment(data.snippet.publishedAt).fromNow()}
            </div>
          </div>
          <div className="video-channel-data">
            <div className="d-flex">
              <img
                src={icon}
                alt=""
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  marginRight: "5px",
                }}
              />
              <div className="d-flex flex-column">
                <div className="h4">{data.snippet.channelTitle}</div>
                <p>
                  {numeral(channelViews).format("0.a").toUpperCase()}{" "}
                  Subscribers
                </p>
              </div>
            </div>
            <div className="btn btn-danger">Subscribe</div>
          </div>
          <ShowMoreText
            lines={1}
            more="Show More"
            less="Show Less"
            expanded={false}
            className="video-description"
          >
            {data.snippet.description}
          </ShowMoreText>
        </>
      ) : (
        <>Loading...</>
      )}
    </>
  );
};

export default VideoMeta;
