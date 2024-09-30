import { AxiosPromise } from "axios"
import { instanceAxios } from "../Shared/Helpers/instanceAxios"
import {
    CategoryApiResponse,
    ApiResponse,
    ProductSingleApiResponse,
    BasketPostDataType,
    OrderPostDataType
} from "../Shared/Interface";

export const PutAuthUser = (body: object) => {


    return instanceAxios({
        method: "GET",
        url: "auth/user",
        data: body,
     
    })
}


export const getProductsById = (
    productsID: string | number
): AxiosPromise<ProductSingleApiResponse> =>
    instanceAxios({
        method: "GET",
        url: `products/${productsID}`,
    });

    

export const postSignUp = (body:object) => {

    
    return instanceAxios({
        method: "POST",
        url: "auth/signup",
        data: body
    })
}



export const PutAuthUserr = (body: object): AxiosPromise => {
    const accessToken = localStorage.getItem("access_token");
    return instanceAxios({
        method: "PUT",
        url: "auth/user",
        data: body,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};



export const AddBasket: (basketProduct: BasketPostDataType) => AxiosPromise<BasketPostDataType> = (basketProduct) => {
    const accessToken = localStorage.getItem("access_token");
    return instanceAxios({
        method: "POST",
        url: `basket/add`,
        data: basketProduct,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};



export const deleteBasket: (
    basketProduct: BasketPostDataType
) => AxiosPromise<BasketPostDataType> = (basketProduct) => {
    const accessToken = localStorage.getItem("access_token");
    return instanceAxios({
        method: "DELETE",
        url: `basket/delete`,
        data: basketProduct,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

export const clearBasket: (
    basketId: BasketPostDataType
) => AxiosPromise<BasketPostDataType> = (basketId) => {
    const accessToken = localStorage.getItem("access_token");
    return instanceAxios({
        method: "DELETE",
        url: `basket/clear`,
        data: basketId,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};


export const GetBasket = (): AxiosPromise => {
    const accessToken = localStorage.getItem("access_token");
    return instanceAxios({
        method: "GET",
        url: "basket",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};


export async function GetOrder() {

    try {
        const accessToken = localStorage.getItem("access_token");

        const response = await instanceAxios.get(`/order`,{
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            })
            return response;
    }catch (error){
        console.log("orders error", error)
    }

};


export const AddOrder: (orderBasket:OrderPostDataType) => AxiosPromise<OrderPostDataType> = (orderBasket) =>{
    const accessToken = localStorage.getItem("access_token");

    return instanceAxios ({
        method: "POST",
        url:`order`,
        data: orderBasket,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};


export const GetOrderHistory = () => {
    const accessToken = localStorage.getItem("access_token");

    return instanceAxios ({
        method: "GET",
        url: "order/history",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })
}

export async function GetOrderByUser() {
    try{
        const accessToken = localStorage("access_token");

        const response = await instanceAxios.get(`order/history`,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        });
        return response
    } catch (error){
        console.log(error)
    }
}

export async function deleteOrder(id: string | number) {
    try {
        const accessToken = localStorage.getItem("access_token")

        const response = await  instanceAxios.delete(`/order`, {
            data: {
                "order_id":id
            },
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });
        return response
    } catch (error){
        console.log(error)
    }
}



export const getCategories = (): AxiosPromise<CategoryApiResponse> =>
    instanceAxios({method: "GET", url: "category"});

export const GetProducts = (): AxiosPromise<ApiResponse> =>
    instanceAxios({method: "GET", url: 'products'});