import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchEvents, fetchEventById } from '../services/ticketmaster';

export const loadEvents = createAsyncThunk(
  'events/loadEvents',
  async function (params, thunkAPI) {
    try {
      return await fetchEvents(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loadEventDetails = createAsyncThunk(
  'events/loadEventDetails',
  async function (id, thunkAPI) {
    try {
      return await fetchEventById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    list: [],
    totalPages: 0,
    selected: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: function (builder) {
    builder
      .addCase(loadEvents.pending, function (state) {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadEvents.fulfilled, function (state, action) {
        state.loading = false;
        state.list = action.payload.events;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(loadEvents.rejected, function (state, action) {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      })
      .addCase(loadEventDetails.pending, function (state) {
        state.loading = true;
        state.error = null;
        state.selected = null;
      })
      .addCase(loadEventDetails.fulfilled, function (state, action) {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(loadEventDetails.rejected, function (state, action) {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export default eventsSlice.reducer;