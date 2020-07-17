import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const INITIAL_STATE = {
  id: null,
  name: "",
  email: "",
  phone: null,
  isVerified: false,
};

export const ProfileReducer = persistReducer(
  {
    storage,
    key: "user",
    whitelist: ["id", "name", "email", "phone"],
  },
  (state = INITIAL_STATE, { type, data }) => {
    switch (type) {
      case "FETCH_USER_DATA":
        return Object.assign({}, state, {
          ...state,
          id: data.id,
          name: data.name,
          email: data.email,
          phone: data.phone_number,
          isVerified: data.phone_verified_at ? true : false,
        });

      case "SET_USER_DATA":
        return Object.assign({}, state, {
          ...state,
          id: data.id,
          name: data.name,
          email: data.email,
          phone: data.phone,
        });

      case "CLEAR_USER":
        return INITIAL_STATE;

      default:
        return state;
    }
  }
);

export default ProfileReducer;
