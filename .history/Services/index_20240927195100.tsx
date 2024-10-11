import { AxiosPromise } from "axios";
import { instanceAxios } from "../Shared/Helpers/instanceAxios";
import {
    CategoryApiResponse,
    ApiResponse,
    ProductSingleApiResponse,
    BasketPostDataType,
    OrderPostDataType
} from "../Shared/Interface";

// Auth kullanıcı bilgilerini getiren fonksiyon
export const PutAuthUser = (body: object) =>
    instanceAxios({
        method: "PUT",
        url: "auth/user",
        data: body,
    });

// Ürünü ID ile getiren fonksiyon
export const getProductsById = (
    productsID: string | number
): AxiosPromise<ProductSingleApiResponse> =>
    instanceAxios({
        method: "GET",
        url: `products/${productsID}`,
    });

// Kullanıcı kayıt fonksiyonu
export const postSignUp = (body: object) =>
    instanceAxios({
        method: "POST",
        url: "auth/signup",
        data: body,
    });

// Sepete ürün ekleyen fonksiyon
export const AddBasket = (
    basketProduct: BasketPostDataType
): AxiosPromise<BasketPostDataType> =>
    instanceAxios({
        method: "POST",
        url: "basket/add",
        data: basketProduct,
    });

// Sepetten ürün silen fonksiyon
export const deleteBasket = (
    basketProduct: BasketPostDataType
): AxiosPromise<BasketPostDataType> =>
    instanceAxios({
        method: "DELETE",
        url: "basket/delete",
        data: basketProduct,
    });

// Sepeti tamamen temizleyen fonksiyon
export const clearBasket = (
    basketId: BasketPostDataType
): AxiosPromise<BasketPostDataType> =>
    instanceAxios({
        method: "DELETE",
        url: "basket/clear",
        data: basketId,
    });

// Sepeti getiren fonksiyon
export const GetBasket = (): AxiosPromise =>
    instanceAxios({
        method: "GET",
        url: "basket",
    });

// Sipariş getiren fonksiyon
export async function GetOrder() {
    try {
        const response = await instanceAxios.get(`/order`);
        return response;
    } catch (error) {
        console.log("orders error", error);
        throw error;
    }
}

// Sipariş ekleyen fonksiyon
export const AddOrder = (
    orderBasket: OrderPostDataType
): AxiosPromise<OrderPostDataType> =>
    instanceAxios({
        method: "POST",
        url: "order",
        data: orderBasket,
    });

// Sipariş geçmişini getiren fonksiyon
export const GetOrderHistory = (): AxiosPromise =>
    instanceAxios({
        method: "GET",
        url: "order/history",
    });

// Belirli bir kullanıcının sipariş geçmişini getiren fonksiyon
export async function GetOrderByUser() {
    try {
        const response = await instanceAxios.get(`order/history`);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Sipariş silen fonksiyon
export async function deleteOrder(id: string | number) {
    try {
        const response = await instanceAxios.delete(`/order`, {
            data: {
                order_id: id,
            },
        });
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Kategorileri getiren fonksiyon
export const getCategories = (): AxiosPromise<CategoryApiResponse> =>
    instanceAxios({
        method: "GET",
        url: "category",
    });

// Ürünleri getiren fonksiyon
export const GetProducts = (): AxiosPromise<ApiResponse> =>
    instanceAxios({
        method: "GET",
        url: "products",
    });
