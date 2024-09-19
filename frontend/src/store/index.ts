import { configureStore } from '@reduxjs/toolkit';
import authSlice from "@/store/slices/authSlice";
import workspaceSlice from "@/store/slices/workspaceSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
      workspace: workspaceSlice
    },
    devTools: process.env.NODE_ENV !== 'production'
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
