import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import HttpClient from "../../utilities/HttpClient";

const initialState = {
  authUser: null,
  settings: null,
  initialized: false,
};

export const signIn = createAsyncThunk("auth/signin", async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await HttpClient().post("/api/auth/admin/login", body);
      localStorage.setItem("token", data.token);
      window.location.reload();
    } catch (e) {
      reject(e.response.data);
    }
  });
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
      state.initialized = true;
    },
    setSettings(state, action) {
      state.settings = action.payload;
    },
    logout(state) {
      state.authUser = null;
      localStorage.removeItem("token");
      window.location.reload();
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuthUser, setSettings, logout } = authSlice.actions;

export default authSlice.reducer;
