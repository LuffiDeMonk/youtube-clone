import Axios from "axios";
export const API_KEY = "AIzaSyDnbEAcVyuHbIA_60iPunUxNVjcKtqSV2c";
const accessToken = sessionStorage.getItem("accessToken");

export const getVideos = Axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3",
  params: {
    key: API_KEY,
    maxResults: 8,
    regionCode: "US",
  },
});
