import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const INITIAL_STATE = {
  isLoggedIn: false,
  token: "",
};

export const LoginReducer = persistReducer(
  { storage, key: "login", whitelist: ["isLoggedIn", "token"] },
  (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case "USER_LOGIN":
        return Object.assign({}, state, {
          token: action.data,
          isLoggedIn: true,
        });

      case "USER_LOGOUT":
        return INITIAL_STATE;

      default:
        return state;
    }
  }
);
export default LoginReducer;
