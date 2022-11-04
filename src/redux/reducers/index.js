import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

import auth from "./auth";
import kelas from "./kelas";
import siswa from "./siswa";

const persistAuth = {
  storage,
  key: "auth",
};

const reducer = combineReducers({
  auth: persistReducer(persistAuth, auth),
  kelas,
  siswa,
});

export default reducer;
