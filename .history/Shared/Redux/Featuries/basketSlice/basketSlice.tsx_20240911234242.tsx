import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AddBasket, GetBasket, deleteBasket } from '../../../../Services/index';

// Sadece response.data.result.data döndüren yeni async thunk
export const fetchBasket = createAsyncThunk('basket/fetchBasket', async () => {
    const response = await GetBasket();
    console.log("responseBasket", response);
    
    return response.data.result.data;  // Burada sadece response.data.result.data döndürülüyor
});

export const addToBasket = createAsyncThunk(
    'basket/addToBasket',
    async (basketProduct, { rejectWithValue }) => {
        try {
            await AddBasket(basketProduct);
            return basketProduct;
        } catch (error) {
            return rejectWithValue('Failed to add product to the basket');
        }
    }
);

export const deleteAllBasket = createAsyncThunk

export const deleteFromBasket = createAsyncThunk(
    'basket/deleteFromBasket',
    async (productId, { rejectWithValue }) => {
        try {
            await deleteBasket(productId);
            return productId;
        } catch (error) {
            return rejectWithValue('Failed to delete product from the basket');
        }
    }
);

const basketSlice = createSlice({
    name: 'basket',
    initialState: {
        data: {},  // items yerine response.data.result.data'yi tutmak için 'data' kullanıyoruz
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBasket.fulfilled, (state, action) => {
                state.data = action.payload;  // Veriyi sadece 'data' ile güncelliyoruz
                state.status = 'succeeded';
            })
            .addCase(fetchBasket.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBasket.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(addToBasket.fulfilled, (state, action) => {
                state.data.items.push(action.payload);
            })
            .addCase(addToBasket.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(deleteFromBasket.fulfilled, (state, action) => {
                state.data.items = state.data.items.filter(item => item.id !== action.payload);
            })
            .addCase(deleteFromBasket.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export default basketSlice.reducer;
