import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
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
  compareCharactersIds: [],
  compareCharacters: [],
};

export const getCharacterPage = createAsyncThunk(
  "characters/getCharacterPage",
  async (url) => {
    const response = await axios.get(url);
    return response.data;
  }
);

export const getCharactersToCompare = createAsyncThunk(
  "characters/getCharactersToCompare",
  async (ids) => {   
    if(ids.length === 0) return [];

    let str = String(ids);
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/${str}`
    );

    return ids.length === 1 ? [response.data] : response.data;    
  }
);

const slice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    addCompareCharacter: (state, action) => {
      const hasItem = state.compareCharactersIds.find(
        (i) => i === action.payload.id
      );
      hasItem === undefined &&
        state.compareCharactersIds.length < 3 &&
        state.compareCharactersIds.push(action.payload.id);
    },
    removeCompareCharacter: (state, action) => {
      state.compareCharactersIds = state.compareCharactersIds.filter((i) => i !== action.payload.id);
    },
  },
  extraReducers: {
    [getCharacterPage.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [getCharacterPage.fulfilled]: (state, action) => {
      const { payload } = action;
      state.isLoading = false;
      state.info = payload.info;
      state.results = payload.results;
    },
    [getCharacterPage.rejected]: (state, action) => {
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
    [getCharactersToCompare.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [getCharactersToCompare.fulfilled]: (state, action) => {
      const { payload } = action;
      state.isLoading = false;
      state.compareCharacters = payload;
    }
  }, //ad
});

export const { actions: characterActions, reducer: characterReducer } = slice;
