import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  pageTitle: "",
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPageTitle: (state, action) => {
      state.pageTitle = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoading, setPageTitle } = commonSlice.actions;

export default commonSlice.reducer;
