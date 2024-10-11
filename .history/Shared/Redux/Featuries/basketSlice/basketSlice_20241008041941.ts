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

type BasketPostDataType = {
    user_id?: string; // Kullanıcı ID'si
    cover_url: string; // Ürün resmi URL'si
    product_id?: string; // Ürün ID'si
    amount: number; // Ürün fiyatı
    created: string; // Ürün oluşturulma tarihi
    count: number; // Ürün adedi
    description: string; // Ürün açıklaması
    rest_id: string; // Restoran/mağaza ID'si
    category_id: string; // Kategori ID'si
    img_url: string; // Ürün resim URL'si
    price: number; // Ürün fiyatı
    ageSize: string | number | null; // Yaş boyutu
    name: string; // Ürün adı
    allDescription: string; // Tüm açıklama
    id: string; // Ürün ID'si
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
            return basketProduct; // Başarılı olursa geri döndür
        } catch (error) {
            return rejectWithValue('Failed to add product to the basket'); // Hata durumunda
        }
    }
);

export const deleteAllBasket = createAsyncThunk(
    'basket/deleteAllBasket',
    async (basketId: string, { rejectWithValue }) => {
        try {
            await clearBasket(basketId); // Tüm sepeti temizle
            return basketId; // Başarılı olursa geri döndür
        } catch (error) {
            return rejectWithValue('Failed to delete all products from the basket'); // Hata durumunda
        }
    }
);

export const deleteFromBasket = createAsyncThunk(
    'basket/deleteFromBasket',
    async (productId: string, { rejectWithValue }) => {
        try {
            await deleteBasket(productId);
            return productId; // Başarılı olursa geri döndür
        } catch (error) {
            return rejectWithValue('Failed to delete product from the basket'); // Hata durumunda
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
                state.error = action.error.message || 'Error fetching basket'; // Hata mesajı
            })

            .addCase(addToBasket.fulfilled, (state, action) => {
                state.data.items.push(action.payload); // Sepete ekle
            })
            .addCase(addToBasket.rejected, (state, action) => {
                state.error = action.payload as string; // Hata mesajı
            })

            .addCase(deleteFromBasket.fulfilled, (state, action) => {
                state.data.items = state.data.items.filter(item => item.id !== action.payload); // Ürünü sil
            })
            .addCase(deleteFromBasket.rejected, (state, action) => {
                state.error = action.payload as string; // Hata mesajı
            })
            .addCase(deleteAllBasket.fulfilled, (state) => {
                state.data.items = []; // Sepeti temizle
            })
            .addCase(deleteAllBasket.rejected, (state, action) => {
                state.error = action.payload as string; // Hata mesajı
            });
    },
});

export default basketSlice.reducer;
