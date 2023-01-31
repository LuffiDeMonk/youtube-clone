import React, { useState } from "react";
import "./SearchItem.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import moment from "moment";
import numeral from "numeral";
import { API_KEY } from "../Api/Api";

const SearchItem = ({ items }) => {
  const [channelIcon, setChannelIcon] = useState("");
  const [views, setViews] = useState("");
  const [duration, setDuration] = useState("");
  const {
    id,
    channelId,
    channelTitle,
    publishedAt,
    thumbnail,
    title,
    description,
  } = items;

  let time = moment.duration(duration).asSeconds();
  time = moment.utc(time * 1000).format("mm:ss");
  useEffect(() => {
    const getChannelIcon = async () => {
      const response = await Axios.get(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${API_KEY}`
      );
      setChannelIcon(response.data.items[0].snippet.thumbnails.default.url);
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
    <div>
      {channelIcon ? (
        <Link to={`/search/${id}`} className="text-decoration-none text-dark">
          <div className="search-container d-flex flex-column flex-lg-row">
            <div className="search-img">
              <img src={thumbnail} alt="" />
              <div className="search-timestamp">{time}</div>
            </div>
            <div className="search-info-container d-flex">
              <div className="search-icon m-2">
                <img src={channelIcon} alt="" />
              </div>
              <div className="search-details">
                <div className="search-title">{title}</div>
                <div className="search-channel-details d-flex flex-lg-column">
                  <div className="d-lg-flex order-lg-3 align-items-lg-center icon-adjust">
                    <img src={channelIcon} alt="" />
                    <div className="search-video-details">{channelTitle}</div>
                  </div>
                  <div className="d-flex flex-row d-lg-flex">
                    <div className="search-video-details order-lg-1">
                      {numeral(views).format("0.a").toUpperCase()} views
                    </div>
                    <div className="search-video-details order-lg-2">
                      {moment(publishedAt).fromNow()}
                    </div>
                  </div>
                </div>
                <div className="description">{description}</div>
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <>Loading....</>
      )}
    </div>
  );
};

export default SearchItem;
