import { configureStore } from '@reduxjs/toolkit';
// import messagesReducer from "./services/messagesSlice";
import usersReducer from './services/usersSlice';
import { logger } from 'redux-logger';

export const store = configureStore({
  reducer: {
    // messages: messagesReducer,
    users: usersReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({}).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
