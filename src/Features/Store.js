import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./AuthSlice";
import youtubeReducer from "./YoutubeSlice";

const reducer = combineReducers({
  auth: authReducer,
  youtube: youtubeReducer,
});
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["youtube"],
};
const persistedReducer = persistReducer(persistConfig, reducer);
export const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);
