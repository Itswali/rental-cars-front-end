import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'http://localhost:3001/api/v1';
// const carsToken = localStorage.getItem('carsToken');

const initialState = {
  isLoading: false,
  error: undefined,
  cars: [],
  reservations: [],
};

export const fetchCars = createAsyncThunk('car/getUCars', async () => {
  try {
    const response = await axios.get(`${URL}/items`, {
      headers: {
        withCredentials: true,
      },
    });

    // The serialized response has a 'data' array attribute
    return response.data.data;
  } catch (err) {
    return err.message;
  }
});

export const addReservation = createAsyncThunk('car/reserveCar', async (payload) => {
  try {
    const response = await axios.post(`${URL}/reservations`, payload, {
      headers: {
        withCredentials: true,
      },
    });
    return response.data;
  } catch (err) {
    return err.message;
  }
});

export const getReservations = createAsyncThunk('car/getReservation', async () => {
  try {
    const response = await axios.get(`${URL}/reservations`, {
      headers: {
        withCredentials: true,
      },
    });
    return response.data;
  } catch (err) {
    return err.message;
  }
});

export const carSlice = createSlice({
  name: 'car',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCars.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchCars.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cars = action.payload;
    });

    builder.addCase(fetchCars.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(addReservation.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(addReservation.fulfilled, (state) => {
      state.isLoading = false;
    });

    builder.addCase(addReservation.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(getReservations.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getReservations.fulfilled, (state, action) => {
      state.isLoading = false;
      state.reservations = action.payload;
    });

    builder.addCase(getReservations.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default carSlice.reducer;
