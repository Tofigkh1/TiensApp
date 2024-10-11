// basketSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AddBasket, GetBasket, deleteBasket, clearBasket } from '../../../../Services/index';

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

export type BasketPostDataType = {
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

// Yeni payload türleri
type DeleteFromBasketPayload = {
    user_id: string | number | undefined;
    product_id: string;
};

type DeleteAllBasketPayload = {
    user_id: string | number | undefined;
    basket_id: string;
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

// deleteAllBasket thunk'unu güncelledik
export const deleteAllBasket = createAsyncThunk(
    'basket/deleteAllBasket',
    async (payload: DeleteAllBasketPayload, { rejectWithValue }) => {
        try {
            await clearBasket(payload.user_id, payload.basket_id); // clearBasket fonksiyonunu güncelledik
            return payload.basket_id;
        } catch (error) {
            return rejectWithValue('Failed to delete all products from the basket');
        }
    }
);

// deleteFromBasket thunk'unu güncelledik
export const deleteFromBasket = createAsyncThunk(
    'basket/deleteFromBasket',
    async (payload: DeleteFromBasketPayload, { rejectWithValue }) => {
        try {
            await deleteBasket(payload.user_id, payload.product_id); // deleteBasket fonksiyonunu güncelledik
            return payload.product_id;
        } catch (error) {
            return rejectWithValue('Failed to delete product from the basket');
        }
    }
);

// Başlangıç durumu (initial state)
interface BasketState {
    data: Basket;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: BasketState = {
    data: {
        id: '',
        created: 0,
        total_item: 0,
        total_amount: 0,
        total_count: 0,
        items: [],
    },
    status: 'idle',
    error: null,
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
                state.data.total_count += action.payload.count;
                state.data.total_amount += action.payload.amount;
            })
            .addCase(addToBasket.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(deleteFromBasket.fulfilled, (state, action) => {
                const removedItem = state.data.items.find(item => item.id === action.payload);
                if (removedItem) {
                    state.data.total_count -= removedItem.count;
                    state.data.total_amount -= removedItem.amount;
                }
                state.data.items = state.data.items.filter(item => item.id !== action.payload);
            })
            .addCase(deleteFromBasket.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(deleteAllBasket.fulfilled, (state) => {
                state.data.items = [];
                state.data.total_count = 0;
                state.data.total_amount = 0;
            })
            .addCase(deleteAllBasket.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export default basketSlice.reducer;
