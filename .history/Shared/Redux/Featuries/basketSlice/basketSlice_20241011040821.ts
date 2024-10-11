import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AddBasket, GetBasket, deleteBasket, clearBasket } from '../../../../Services/index';
import {
    AddToBasketPayload,
    DeleteFromBasketPayload,
    DeleteAllBasketPayload,
    BasketPostDataType
  } from '../../../Types/types';
  

// Basket ve BasketItem tipi
export type BasketItem = {
    cover_url: string;
    amount: number;
    created: number;
    count: number;
    description: string;
    rest_id: string;
    category_id: string;
    img_url: string;
    price: number;
    ageSize: string;
    name: string;
    allDescription: string;
    id: number | string;
};

type Basket = {
    id: string;
    created: number;
    total_item: number;
    total_amount: number;
    total_count: number;
    items: BasketItem[];
};

type BasketPostDataTypee = {
    user_id: string;
    cover_url: string;
    amount: number;
    created: number;
    count: number;
    description: string;
    rest_id: string;
    category_id: string;
    img_url: string;
    price: number;
    ageSize: string;
    name: string;
    allDescription: string;
    id: string;
    product_id?: string;
};

// Async thunk fonksiyonları
export const fetchBasket = createAsyncThunk('basket/fetchBasket', async () => {
    const response = await GetBasket();
    console.log("responseBasket", response);
    return response.data.result.data;  
});

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
  ); }
);


// Başlangıç durumu (initial state)
const initialState = {
    data: {
        id: '',
        created: 0,
        total_item: 0,
        total_amount: 0,
        total_count: 0,
        items: [] as BasketItem[],
    },
    status: 'idle',
    error: null as string | null,
};

// Basket slice
const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBasket.fulfilled, (state, action) => {
                state.data = action.payload;  
                state.status = 'succeeded';
            })
            .addCase(fetchBasket.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBasket.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? null;
            })
            
            .addCase(addToBasket.fulfilled, (state, action) => {
                state.data.items.push(action.payload);
            })
            .addCase(addToBasket.rejected, (state, action) => {
                state.error = action.payload as string;
            })

            .addCase(deleteFromBasket.fulfilled, (state, action) => {
                state.data.items = state.data.items.filter(item => item.id !== action.payload);
            })
            .addCase(deleteFromBasket.rejected, (state, action) => {
                state.error = action.payload as string;
            })

            .addCase(deleteAllBasket.fulfilled, (state) => {
                state.data.items = [];
            })
            .addCase(deleteAllBasket.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export default basketSlice.reducer;
