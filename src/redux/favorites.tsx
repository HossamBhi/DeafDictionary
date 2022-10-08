import {createSlice} from '@reduxjs/toolkit';
import {WordProps} from '../utils/types';

type FavItemsProps = {
  favItems: {[key: string]: WordProps};
};
const initialState: FavItemsProps = {
  favItems: {},
};

const favorites = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    saveFavAction: (state, {payload}) => {
      state.favItems = {[payload.db_id]: payload, ...state.favItems};
    },
    removeFavAction: (state, {payload}: {payload: string}) => {
      if (Object.keys(state.favItems).length > 1) {
        delete state.favItems[payload];
      }
    },
  },
});

export const {saveFavAction, removeFavAction} = favorites.actions;
export default favorites.reducer;
