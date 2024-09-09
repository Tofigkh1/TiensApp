import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AddBasket, GetBasket, deleteBasket } from '../../../../Services/index';

// Sepeti fetch eden fonksiyon
export const fetchBasket = createAsyncThunk('basket/fetchBasket', async () => {
    const response = await GetBasket();
    console.log("responseBasket", response);
    
    return response.data.result.data; // Sadece data dönüyor
});

// Sepete ürün ekleyen fonksiyon
export const addToBasket = createAsyncThunk(
    'basket/addToBasket',
    async (basketProduct, { rejectWithValue }) => {
        try {
            await AddBasket(basketProduct);
            return basketProduct;
        } catch (error) {
            return rejectWithValue('Ürünü sepete ekleme başarısız oldu');
        }
    }
);

// Sepetten ürün silen fonksiyon
export const deleteFromBasket = createAsyncThunk(
    'basket/deleteFromBasket',
    async (productId, { rejectWithValue }) => {
        try {
            await deleteBasket(productId);
            return productId;
        } catch (error) {
            return rejectWithValue('Ürünü sepetten silme başarısız oldu');
        }
    }
);

// Redux slice tanımı
const basketSlice = createSlice({
    name: 'basket',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetchBasket sonuçları
            .addCase(fetchBasket.fulfilled, (state, action) => {
                state.items = action.payload; // Güncellenen data yapısı
                state.status = 'succeeded';
            })
            .addCase(fetchBasket.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBasket.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // addToBasket sonuçları
            .addCase(addToBasket.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(addToBasket.rejected, (state, action) => {
                state.error = action.payload;
            })

            // deleteFromBasket sonuçları
            .addCase(deleteFromBasket.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload);
            })
            .addCase(deleteFromBasket.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export default basketSlice.reducer;
