import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../Firebase";

export const getUserInfo = createAsyncThunk("", async () => {
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl");
  const response = await signInWithPopup(auth, provider);
  return response;
  console.log(response.payload);
});
const initialState = {
  name: "",
  accessToken: "",
  imageURL: "",
  loggedIn: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogOut: (state) => {
      return {
        ...state,
        accessToken: "",
        loggedIn: false,
        name: "",
        imageURL: "",
      };
    },
  },
  extraReducers: {
    [getUserInfo.rejected]: (state) => {
      console.log("Request Failed");
    },
    [getUserInfo.fulfilled]: (state, { payload }) => {
      const result = payload.user;

      console.log(result);
      return {
        ...state,
        name: result.displayName,
        accessToken: result.accessToken,
        imageURL: result.photoURL,
        loggedIn: true,
      };
    },
  },
});

export default authSlice.reducer;
export const { userLogOut } = authSlice.actions;
export const getAccessToken = (state) => state.auth.accessToken;
export const getImageURL = (state) => state.auth.imageURL;
