import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import LoginReducer from "./loginReducer";
import ProfileReducer from "./profileReducer";

const appReducer = combineReducers({
  login: LoginReducer,
  profile: ProfileReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT_REQUEST") {
    Object.keys(state).forEach((key) => {
      storage.removeItem(`persist:${key}`);
      localStorage.clear();
    });
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
