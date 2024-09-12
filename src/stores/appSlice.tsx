import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDashboard, getProfile, signin } from "./appAPI";
import Cookies from "js-cookie";

const initialIsAuthenticated = Boolean(Cookies.get('authToken'));

export interface AppStateInterface {
  isAuthenticated: boolean;
  signin: any;
  profile: any;
  dashboard: any;
  status: "idle" | "loading" | "failed";
}

const initialState: AppStateInterface = {
  isAuthenticated: initialIsAuthenticated,
  signin: {},
  profile: {},
  dashboard: {},
  status: "idle",
};

export const signinAsync = createAsyncThunk("Signin", async (data: any) => {
  const response = await signin(data);
  return response;
});

export const getProfileAsync = createAsyncThunk("Profile", async () => {
  const response = await getProfile();
  return response;
});

export const getDashboardAsync = createAsyncThunk("Dashboard", async () => {
  const response = await getDashboard();
  return response.data;
});

export const appSlice = createSlice({
  name: "app",
  initialState,

  reducers: {
    setProfile: (state: any, action: PayloadAction<[]>) => {
      state.profile = action.payload;
    }
  },

  extraReducers: (builder: any) => {
    builder

      // Signin
      .addCase(signinAsync.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(signinAsync.fulfilled, (state: any, action: any) => {
        state.status = "idle";
        state.signin = action.payload;
        if (action.payload?.status == 200) {
          state.isAuthenticated = true;
          state.profile = action.payload;
          Cookies.set('authToken', action.payload?.data?.token, { expires: 1 / 48, secure: true, path: '/' });
        }
      })
      .addCase(signinAsync.rejected, (state: any) => {
        state.status = "failed";
      })

      // get profile
      .addCase(getProfileAsync.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(getProfileAsync.fulfilled, (state: any, action: any) => {
        state.status = "idle";
        state.profile = action.payload;
      })
      .addCase(getProfileAsync.rejected, (state: any) => {
        state.status = "failed";
      })

      // get Dashboard
      .addCase(getDashboardAsync.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(getDashboardAsync.fulfilled, (state: any, action: any) => {
        state.status = "idle";
        state.dashboard = action.payload.data;
      })
      .addCase(getDashboardAsync.rejected, (state: any) => {
        state.status = "failed";
      });
  },
});

export const { setProfile } = appSlice.actions;
export const appState = (state: any) => state.app;
export default appSlice.reducer;
