import React, { useEffect } from "react";
import moment from "moment";
import Axios from "axios";
import { useState } from "react";
import { API_KEY } from "../Api/Api";
import numeral from "numeral";
import { Link } from "react-router-dom";

const RelatedVideo = ({ item }) => {
  const [channelIcon, setChannelIcon] = useState("");
  const [views, setViews] = useState("");
  const { id, channelId } = item;
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
    };
    getVideoStatistics();
  }, [id]);
  return (
    <Link to={`/search/${id}`} className="text-decoration-none">
      <div className="px-3 text-decoration-none text-dark">
        <div className="d-flex my-2 overflow-hidden text-decoration-none">
          <img
            src={item.thumbnail}
            alt=""
            style={{ width: "40%", height: "7rem", marginRight: "5px" }}
          />
          <div className="d-flex flex-column text-decoration-none">
            <div className="h5 text-decoration-none text-dark">
              {item.title}
            </div>
            <div className="p text-decoration-none text-dark">
              {item.channelTitle}
            </div>
            <div className="d-flex">
              {channelIcon && views ? (
                <>
                  {/* <img
                    src={channelIcon}
                    alt=""
                    className="d-lg-none"
                    style={{
                      width: "30px",
                      height: "30px",
                      marginRight: "5px",
                      borderRadius: "50%",
                    }}
                  /> */}

                  <div className="p text-decoration-none text-dark">
                    {moment(item.publishedAt).fromNow()}
                  </div>
                  <div className="mx-1">•</div>
                  <div className="p text-decoration-none text-dark">
                    {numeral(views).format("0.a").toUpperCase()} views
                  </div>
                </>
              ) : (
                <>Loading...</>
              )}
            </div>
          </div>
        </div>
        <hr />
      </div>
    </Link>
  );
};

export default RelatedVideo;
