import React, { useState } from "react";
import "./VideoItem.css";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_KEY } from "../Api/Api";
import Axios from "axios";
import { getSelectedVideo } from "../../Features/YoutubeSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";

const VideoItem = ({ item }) => {
  const [icon, setIcon] = useState("");
  const [duration, setDuration] = useState("");
  const [views, setViews] = useState("");
  const dispatch = useDispatch();
  const { id, channelId, channelName, thumbnail, publishedAt, title } = item;
  let time = moment.duration(duration).asSeconds();
  time = moment.utc(time * 1000).format("mm:ss");

  useEffect(() => {
    const getChannelIcon = async () => {
      const response = await Axios.get(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${API_KEY}`
      );
      setIcon(response.data.items[0].snippet.thumbnails.default.url);
    };
    getChannelIcon();
  }, [channelId]);

  useEffect(() => {
    const getVideoStatistics = async () => {
      const response = await Axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=statistics%2CcontentDetails&id=${id}&key=${API_KEY}`
      );

      setViews(response.data.items[0].statistics.viewCount);
      setDuration(response.data.items[0].contentDetails.duration);
    };
    getVideoStatistics();
  }, [id]);
  return (
    <Link
      to={`/search/${id}`}
      className="thumbnail-container text-decoration-none text-dark"
    >
      {icon ? (
        <>
          <div className="thumbnail-image-container">
            <img src={thumbnail} alt="" />
            <div className="timestamp">{time}</div>
          </div>
          <div className="thumbnail-title-container">
            <div className="channel-icon">
              <img src={icon} alt="" />
            </div>
            <div className="thumbnail-title">
              <p>{title}</p>
              <div className="statistics">
                <div className="channel-name">{channelName}</div>
                <div className="d-flex">
                  <div className="views">
                    {numeral(views).format("0.a").toUpperCase()} views
                  </div>
                  <div className="upload-time">
                    {moment(publishedAt).fromNow()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </Link>
  );
};

export default VideoItem;
