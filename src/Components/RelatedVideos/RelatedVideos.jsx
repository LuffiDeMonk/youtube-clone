import moment from "moment/moment";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { relatedVideos } from "../../Features/YoutubeSlice";
import { getVideos } from "../Api/Api";
import RelatedVideo from "../RelatedVideo/RelatedVideo";
import "./RelatedVideos.css";

const RelatedVideos = () => {
  const data = useSelector(relatedVideos);
  return (
    <>
      {data ? (
        data.map((item) => {
          return <RelatedVideo key={item.id} item={item} />;
        })
      ) : (
        <>Loading...</>
      )}
    </>
  );
};

export default RelatedVideos;
