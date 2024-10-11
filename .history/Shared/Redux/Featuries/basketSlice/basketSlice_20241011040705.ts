// src/Redux/Features/basketSlice/basketSlice.ts

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  AddToBasketPayload,
  DeleteFromBasketPayload,
  DeleteAllBasketPayload,
  BasketPostDataType
} from '../../../Types/ ';

// API URL'inizi tanımlayın
const API_URL = 'https://your-api-url.com/api/basket';

// Async Thunk'lar

export const addToBasket = createAsyncThunk(
  'basket/addToBasket',
  async (payload: AddToBasketPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/add`, payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteFromBasket = createAsyncThunk(
  'basket/deleteFromBasket',
  async (payload: DeleteFromBasketPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/delete`, payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteAllBasket = createAsyncThunk(
  'basket/deleteAllBasket',
  async (payload: DeleteAllBasketPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/deleteAll`, payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Diğer async thunks (fetchBasket vb.) burada tanımlanabilir

interface BasketState {
  data: {
    id: string;
    total_count: number;
    total_amount: number;
    items: BasketPostDataType[];
  };
  loading: boolean;
  error: string | null;
}

const initialState: BasketState = {
  data: {
    id: '',
    total_count: 0,
    total_amount: 0,
    items: [],
  },
  loading: false,
  error: null,
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    // Synchronous reducer'lar burada tanımlanabilir
  },
  extraReducers: (builder) => {
    // addToBasket
    builder.addCase(addToBasket.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addToBasket.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      // Gerekirse state'i güncelleyin
      // Örneğin, fetchBasket tetiklenebilir
    });
    builder.addCase(addToBasket.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // deleteFromBasket
    builder.addCase(deleteFromBasket.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteFromBasket.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      // Gerekirse state'i güncelleyin
    });
    builder.addCase(deleteFromBasket.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // deleteAllBasket
    builder.addCase(deleteAllBasket.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteAllBasket.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      // Gerekirse state'i güncelleyin
    });
    builder.addCase(deleteAllBasket.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Diğer async thunks (fetchBasket vb.) burada eklenebilir
  },
});

export default basketSlice.reducer;
