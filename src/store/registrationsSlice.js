import { createSlice } from '@reduxjs/toolkit';

function loadRegistrations() {
  try {
    const saved = localStorage.getItem('registrations');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    return [];
  }
}

const registrationsSlice = createSlice({
  name: 'registrations',
  initialState: { items: loadRegistrations() },
  reducers: {
    registerForEvent: function (state, action) {
      const { userId, event } = action.payload;
      const alreadyRegistered = state.items.some(function (item) {
        return item.userId === userId && item.eventId === event.eventId;
      });
      if (alreadyRegistered) {
        return;
      }
      state.items.push({
        ...event,
        userId: userId,
        registeredAt: new Date().toISOString(),
      });
    },
    cancelRegistration: function (state, action) {
      const { userId, eventId } = action.payload;
      state.items = state.items.filter(function (item) {
        return !(item.userId === userId && item.eventId === eventId);
      });
    },
  },
});

export const { registerForEvent, cancelRegistration } =
  registrationsSlice.actions;
export default registrationsSlice.reducer;