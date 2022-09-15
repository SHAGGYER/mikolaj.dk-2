import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/Auth";
import commonReducer from "./reducers/Common";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    common: commonReducer,
  },
});
