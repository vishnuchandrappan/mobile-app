import { createStore } from "redux";
import { persistStore } from "redux-persist";
import rootReducer from "./reducers";

const store = createStore(
  rootReducer,
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
);

export const persistor = persistStore(store);
export default store;
