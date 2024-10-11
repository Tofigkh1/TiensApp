export interface PostDataType {
    id: number | string;
    name: string;
    description?: string;
    price: number;
    img_url: string;
    rest_id: string;
}

export interface ProductSingleApiResponse {
    result: {
        data: {
            id: string; // id kesinlikle string döndürüyor
            name: string; // name her zaman döndürülen bir string olmalı
            category_id: string; // category_id her zaman döndürülüyor
            img_url: string | null; // img_url null olabilir, bu yüzden bu seçenek korunuyor
            cover_url: string | null; // cover_url de null olabilir
            description: string; // description alanı her zaman mevcut
            created: number; // created bir timestamp, number olarak bırakıyoruz
            price: number; // price kesinlikle bir number olmalı
        };
    };
    status: number;
    message: string;
}

export interface BasketPostDataType {
    id?: string | number | any;
    basket_id?: string | number;
    user_id: string | number|undefined;
    product_id?: string | number;
    img_url?: string | null;
    price?: number;
    name?: string;
    count?: number;
    amount?: number;
    total_count?: number;
    total_item?: number;
    total_amount?: number;
}


export interface OrderPostDataType{
    id: string | number;
    date: string | number;
    user_id: string | undefined;
    delivery_address: string | number;
    amount: number;
    created: string | number;
    contact: string | number;
    fullname: string;
    count?: number;
    payment_method: number | string;
    total_count?: number;
    total_item?: number;
    total_amount?: number;
    email: string;
    price: number;
    basket_id: string | number;
}

export interface CategoryApiResponse {
    result: {
        data: CategoryPostDataType[];
    };
    status: number;
    message: string;
}

export interface CategoryPostDataType {
    id: number | string | any;
    name: string;
    img_url: File | string | null;
    category: string
}

export interface ApiResponse {
    result: {
        data: PostDataType[];
    };
    status: number;
    message: string;
}





export interface ProductPostDataType{
    id?: string | number | any;
    cover_url: string | number | any
    img_url?:string|null;
    price?: number;
    name?: string;
    description?: string;
    created: string
    rest_id?: string;
    category_id: string;
    allDescription: string
}


export interface ProductApiResponse {
    result: {
        data: ProductPostDataType[];
    };
    status: number;
    message: string;
}

export interface BasketPostDataType {
    id?: string | number | any;
    basket_id?: string | number;
    user_id: string | number|undefined;
    product_id?: string | number;
    img_url?: string | null;
    price?: number;
    name?: string;
    count?: number;
    amount?: number;
    total_count?: number;
    total_item?: number;
    total_amount?: number;
}

export interface InitialProductState
    extends Omit<ProductPostDataType, "id"> {}