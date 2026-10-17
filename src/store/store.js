import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

store.subscribe(function () {
  const state = store.getState();
  localStorage.setItem('users', JSON.stringify(state.auth.users));
  localStorage.setItem('currentUser', JSON.stringify(state.auth.currentUser));
});

export default store;