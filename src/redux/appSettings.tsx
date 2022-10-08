import {createSlice} from '@reduxjs/toolkit';
import {_getAppLanguages, _getAppThemes} from '../utils/appDB';

const initialState = {
  activeTheme: _getAppThemes()[0],
  activeLanguage: _getAppLanguages()[0],
};

const appSettings = createSlice({
  name: 'appSettings',
  initialState,
  reducers: {
    changeThemeAction: (state, {payload}) => {
      state.activeTheme = payload;
    },
    changeLanguageAction: (state, {payload}) => {
      state.activeLanguage = payload;
    },
  },
});

export const {changeThemeAction, changeLanguageAction} = appSettings.actions;
export default appSettings.reducer;
