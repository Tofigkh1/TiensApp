import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AddBasket, GetBasket, deleteBasket, clearBasket } from '../../../../Services/index';

// Basket ve BasketItem tipi
type BasketItem = {
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
    id: string | number;
};

type Basket = {
    id: string;
    created: number;
    total_item: number;
    total_amount: number;
    total_count: number;
    items: BasketItem[];
};

type BasketPostDataType = {
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
};

// Async thunk fonksiyonları
export const fetchBasket = createAsyncThunk('basket/fetchBasket', async () => {
    const response = await GetBasket();
    console.log("responseBasket", response);
    return response.data.result.data;  
});

export const addToBasket = createAsyncThunk(
    'basket/addToBasket',
    async (basketProduct: BasketPostDataType, { rejectWithValue }) => {
        try {
            await AddBasket(basketProduct);
            return basketProduct;
        } catch (error) {
            return rejectWithValue('Failed to add product to the basket');
        }
    }
);

export const deleteAllBasket = createAsyncThunk(
    'basket/deleteAllBasket',
    async (basketId: string, { rejectWithValue }) => {
        try {
            await clearBasket(basketId); // Assuming clearBasket is the API call to clear the basket
            return basketId;
        } catch (error) {
            return rejectWithValue('Failed to delete all products from the basket');
        }
    }
);

export const deleteFromBasket = createAsyncThunk(
    'basket/deleteFromBasket',
    async (productId: string, { rejectWithValue }) => {
        try {
            await deleteBasket(productId);
            return productId;
        } catch (error) {
            return rejectWithValue('Failed to delete product from the basket');
        }
    }
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
                state.error = action.error.message;
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
