import {configureStore} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import user from './user';
import appSettings from './appSettings';
import favorites from './favorites';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
};

const rootReducer = combineReducers({user, appSettings, favorites});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});
