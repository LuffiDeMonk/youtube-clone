import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_KEY, getVideos } from "../Components/Api/Api";
import Axios from "axios";

export const getRelatedVideos = createAsyncThunk(
  "youtube/getRelatedVideos",
  async (term) => {
    const response = await getVideos.get(
      `search?part=snippet&relatedToVideoId=${term}&type=video`
    );
    return response.data;
  }
);

export const getVideoComments = createAsyncThunk(
  "youtube/getVideoComments",
  async (id, { getState }) => {
    const response = await getVideos.get(
      `/commentThreads?part=snippet%2Creplies&videoId=${id}&pageToken=${
        getState().youtube.commentsNextPageToken
      }`
    );
    return response.data;
  }
);

export const getVideoCategories = createAsyncThunk(
  "youtube/getVideoCategories",
  async () => {
    const response = await getVideos.get(
      `/videoCategories?part=snippet&regionCode=US`
    );
    return response.data.items;
  }
);
export const getPopularVideos = createAsyncThunk(
  "youtube/getPopularVideos",
  async (_, { dispatch, getState }) => {
    const response = await getVideos.get(
      `/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&pageToken=${
        getState().youtube.nextPageToken
      }`
    );
    return response.data;
  }
);

export const getVideosByCategory = createAsyncThunk(
  "youtube/getVideosByCategory",
  async (term) => {
    const response = await getVideos.get(`/search?part=snippet&q=${term}`);
    return response.data;
  }
);

export const getSelectedVideo = createAsyncThunk(
  "youtube/getSelectedVideo",
  async (id) => {
    const response = await getVideos.get(
      `/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}`
    );
    return response.data.items[0];
  }
);

export const searchVideos = createAsyncThunk(
  "youtube/searchVideos",
  async (term, { dispatch, getState }) => {
    const response = await getVideos.get(
      `/search?part=snippet&q=${term}&type=video&pageToken=${
        getState().youtube.nextPageToken
      }`
    );
    return response.data;
  }
);

const initialState = {
  videos: [],
  selectedVideo: [],
  categories: [],
  searchVideos: [],
  comments: [],
  channelDetails: [],
  relatedVideos: [],
  relatedVideosNextPageToken: "",
  commentsNextPageToken: "",
  nextPageToken: "",
  activeCategory: "",
  searchTerm: "",
};

const youtubeSlice = createSlice({
  name: "youtube",
  initialState,
  reducers: {
    setActiveCategory: (state, { payload }) => {
      state.activeCategory = payload;
    },
    setSearchTerm: (state, { payload }) => {
      state.searchTerm = payload;
    },
  },
  extraReducers: {
    [getRelatedVideos.fulfilled]: (state, { payload }) => {
      let related = payload.items.map((i) => {
        return {
          id: i.id.videoId,
          channelId: i.snippet.channelId,
          channelTitle: i.snippet.channelTitle,
          publishedAt: i.snippet.publishedAt,
          thumbnail: i.snippet.thumbnails.medium.url,
          title: i.snippet.title,
        };
      });
      return { ...state, relatedVideos: related };
    },
    [getRelatedVideos.pending]: (state, { payload }) => {
      console.log("pending");
    },
    [getVideoComments.fulfilled]: (state, { payload }) => {
      let container = payload.items.map((item) => {
        return {
          id: item.id,
          comment: item.snippet.topLevelComment.snippet.textOriginal,
          user: item.snippet.topLevelComment.snippet.authorDisplayName,
          userImage: item.snippet.topLevelComment.snippet.authorProfileImageUrl,
          publishedAt: item.snippet.topLevelComment.snippet.publishedAt,
        };
      });
      let nextPageToken = payload.nextPageToken;
      return {
        ...state,
        comments: [...state.comments, ...container],
        commentsNextPageToken: nextPageToken,
      };
    },
    [getSelectedVideo.fulfilled]: (state, { payload }) => {
      return { ...state, selectedVideo: payload };
    },

    [getSelectedVideo.rejected]: (state) => {
      console.log("Failed");
    },
    [getVideoCategories.fulfilled]: (state, { payload }) => {
      const container = payload.map((item) => {
        return {
          id: item.etag,
          category: item.snippet.title,
        };
      });
      return { ...state, categories: container };
    },
    [getPopularVideos.fulfilled]: (state, { payload }) => {
      console.log("popular videos fetched");
      const items = payload.items.map((item) => {
        return {
          id: item.id,
          channelId: item.snippet.channelId,
          channelName: item.snippet.channelTitle,
          thumbnail: item.snippet.thumbnails.medium.url,

          publishedAt: item.snippet.publishedAt,
          title: item.snippet.title,
        };
      });

      return {
        ...state,
        videos: [...state.videos, ...items],
        nextPageToken: payload.nextPageToken,
      };
    },
    [getVideosByCategory.fulfilled]: (state, { payload }) => {
      const items = payload.items.map((item) => {
        return {
          id: item.id.videoId,
          channelId: item.snippet.channelId,
          channelName: item.snippet.channelTitle,
          thumbnail: item.snippet.thumbnails.medium.url,

          publishedAt: item.snippet.publishedAt,
          title: item.snippet.title,
        };
      });
      const pageToken = payload.nextPageToken;
      return {
        ...state,
        videos: [...state.videos, ...items],
        nextPageToken: pageToken,
      };
    },

    [searchVideos.fulfilled]: (state, { payload }) => {
      let items = payload.items.map((item) => {
        return {
          id: item.id.videoId,
          channelId: item.snippet.channelId,
          channelTitle: item.snippet.channelTitle,
          publishedAt: item.snippet.publishedAt,
          thumbnail: item.snippet.thumbnails.medium.url,
          title: item.snippet.title,
          description: item.snippet.description,
        };
      });
      let pageToken = payload.nextPageToken;
      return {
        ...state,
        searchVideos: [...state.searchVideos, ...items],
        nextPageToken: pageToken,
      };
    },
  },
});

export default youtubeSlice.reducer;
export const { setActiveCategory, setSearchTerm } = youtubeSlice.actions;
export const getCategories = (state) => state.youtube.categories;
export const getYoutubeVideos = (state) => state.youtube.videos;
export const getSearchVideos = (state) => state.youtube.searchVideos;
export const getSearchTerm = (state) => state.youtube.searchTerm;
export const getPageToken = (state) => state.youtube.nextPageToken;
export const getActiveCategory = (state) => state.youtube.activeCategory;
export const selectedVideoInfo = (state) => state.youtube.selectedVideo;
export const getComments = (state) => state.youtube.comments;
export const relatedVideos = (state) => state.youtube.relatedVideos;
