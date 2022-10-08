import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  logedUser: null,
};

const user = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLogedUserAction: (state, {payload}) => {
      state.logedUser = payload;
    },
    logOutAction: state => {
      state.logedUser = null;
    },
  },
});

export const {setLogedUserAction, logOutAction} = user.actions;
export default user.reducer;
