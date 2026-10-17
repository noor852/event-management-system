import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import eventsReducer from './eventsSlice';
import registrationsReducer from './registrationsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventsReducer,
    registrations: registrationsReducer,
  },
});

store.subscribe(function () {
  const state = store.getState();
  localStorage.setItem('users', JSON.stringify(state.auth.users));
  localStorage.setItem('currentUser', JSON.stringify(state.auth.currentUser));
  localStorage.setItem(
    'registrations',
    JSON.stringify(state.registrations.items)
  );
});

export default store;