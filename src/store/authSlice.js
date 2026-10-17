import { createSlice } from '@reduxjs/toolkit';

function loadFromStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (error) {
    return fallback;
  }
}

const initialState = {
  users: loadFromStorage('users', []),
  currentUser: loadFromStorage('currentUser', null),
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    register: function (state, action) {
      const { name, email, password } = action.payload;
      const exists = state.users.find(function (user) {
        return user.email === email;
      });
      if (exists) {
        state.error = 'An account with this email already exists';
        return;
      }
      const newUser = { id: Date.now(), name: name, email: email, password: password };
      state.users.push(newUser);
      state.currentUser = { id: newUser.id, name: name, email: email };
      state.error = null;
    },
    login: function (state, action) {
      const { email, password } = action.payload;
      const found = state.users.find(function (user) {
        return user.email === email && user.password === password;
      });
      if (!found) {
        state.error = 'Invalid email or password';
        return;
      }
      state.currentUser = { id: found.id, name: found.name, email: found.email };
      state.error = null;
    },
    logout: function (state) {
      state.currentUser = null;
      state.error = null;
    },
    clearError: function (state) {
      state.error = null;
    },
  },
});

export const { register, login, logout, clearError } = authSlice.actions;
export default authSlice.reducer;