import { configureStore } from '@reduxjs/toolkit';
import { characterReducer } from './characters/characterSlice'
import { locationReducer } from './locations/locationSlice';
import { episodeReducer } from './episodes/episodeSlice';

export default function () {
  return configureStore({
    reducer: {
        characters: characterReducer,
        locations: locationReducer,
        episodes: episodeReducer,
    },
  });
}
