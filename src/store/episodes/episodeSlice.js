import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  info: {
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  },
  results: null,
  error: null,
  charactersEpisode: []
};

export const getEpisodePage = createAsyncThunk(
  "episode/getEpisodePage",
  async (url) => {
    const response = await axios.get(url);
    return response.data;
  }
);

export const getEpisodeCharacters = createAsyncThunk(
  "locations/getEpisodeCharacters",
  async (ids) => {
    
    if (ids.length === 0) return [];

    let str = String(ids);
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/${str}`
    );
    return response.data;
  }
);

const slice = createSlice({
  name: "episodes",
  initialState,
  extraReducers: {
    [getEpisodePage.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [getEpisodePage.fulfilled]: (state, action) => {
      const { payload } = action;
      state.isLoading = false;
      state.info = payload.info;
      state.results = payload.results;
    },
    [getEpisodePage.rejected]: (state, action) => {
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
    [getEpisodeCharacters.fulfilled]: (state, action) => {
      const { payload } = action;
      state.isLoading = false;
      state.charactersEpisode = payload;
    }
  },
});

export const { actions: episodeActions, reducer: episodeReducer } = slice;
