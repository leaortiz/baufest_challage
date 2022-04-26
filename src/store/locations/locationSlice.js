import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
  info: {
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  },
  results: null,
  error: null
};


export const getLocationPage = createAsyncThunk(
  "locations/getLocationPage",
  async (url) => {
    const response =  await axios.get(url)
    return response.data;
  }
);

const slice = createSlice({
  name: "locations",
  initialState,
  extraReducers: {
    [getLocationPage.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [getLocationPage.fulfilled]: (state, action) => {
      const { payload } = action;
      state.isLoading = false;
      state.info = payload.info;
      state.results = payload.results;
    },
    [getLocationPage.rejected]: (state, action) => {
      state.isLoading = false;
      state.info = {
        count: 0,
        pages: 0,
        next: null,
        prev: null,
      };
      state.pages = 0;
      state.next = null;
      state.prev = null;
      state.results = [];
      state.error = action.payload;
    },
  },
});

export const { actions: locationActions, reducer: locationReducer } = slice;