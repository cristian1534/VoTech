import { configureStore } from "@reduxjs/toolkit";
import registerUser from "./slices/user.slice";

export const store = configureStore({
  reducer: {
    register: registerUser,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;