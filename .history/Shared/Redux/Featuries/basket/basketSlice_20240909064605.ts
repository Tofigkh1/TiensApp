import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GetBasket } from '../../../../Services/index';

// Yeni slice için async thunk: Sadece response.data.result.data döner
export const fetchSimpleBasket = createAsyncThunk('simpleBasket/fetchSimpleBasket', async () => {
    const response = await GetBasket();
    console.log("responseSimpleBasket", response);

    return response.data.result.data;  // Burada sadece response.data.result.data döndürülüyor
});

const simpleBasketSlice = createSlice({
    name: 'simpleBasket',
    initialState: {
        data: {},
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSimpleBasket.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchSimpleBasket.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSimpleBasket.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default simpleBasketSlice.reducer;
