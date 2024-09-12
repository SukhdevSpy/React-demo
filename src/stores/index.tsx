import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import productReducer from "../modules/product/productSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    product: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
