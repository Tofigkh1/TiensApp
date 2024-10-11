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
            id: number | string;
            name: string | undefined;
            category_id: string | undefined;
            img_url: string | null | undefined;
            cover_url: string | null | undefined;
            description: string | undefined;
            created: number | undefined;
            price: number | undefined;
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


export interface 


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