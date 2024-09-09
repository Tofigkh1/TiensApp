import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../Redux/Store/store';
import { fetchBasket, addToBasket, deleteFromBasket } from '../../../Redux/Featuries/basketSlice/basketSlice.tsx';
import PlusSvg from "../../../../public/plus.png";
import DeleteSvg from '../../../../public/delete.png';
import { useToast } from "@chakra-ui/react";
import Image from 'next/image';

type ProductState = {
    id: string;
    description?: string;
    img_url: string;
    name: string;
    price: number;
    isRectVisible: boolean;  // New prop to track selected state
    isRectVisible2: boolean;  // New prop to track selected state
};

export default function ProductsCard(product: ProductState) {
    const { id, description, img_url, name, price, isRectVisible, isRectVisible2 } = product;
    const dispatch = useDispatch<AppDispatch>();
    const [buttonClicked, setButtonClicked] = useState(false);
    const user = useSelector((state: RootState) => state.user);
    const basket = useSelector((state: RootState) => state.basket);
    const toast = useToast();

    useEffect(() => {
        dispatch(fetchBasket());
    }, [dispatch]);

    useEffect(() => {
        if (basket?.items?.length > 0) {
            const isInBasket = basket?.items?.some((basketProduct: any) => basketProduct?.product_id === id);
            setButtonClicked(isInBasket);
        }
    }, [basket?.items, id]);

    const handleAddToBasket = () => {
        if (!user) {
            toast({
                title: "Please log in to add products to the basket",
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top-right',
                variant: 'subtle'
            });
            return;
        }

        // Determine the ageSize based on which button is clicked
        const ageSize = isRectVisible ? "1" : isRectVisible2 ? "2" : null;

        if (!ageSize) {
            toast({
                title: "Please select a size",
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top-right',
                variant: 'subtle'
            });
            return;
        }

        const basketProduct = {
            user_id: user?.id,
            product_id: id,
            ageSize: ageSize  // Add ageSize to the basket
        };

        setButtonClicked(true);
        dispatch(addToBasket(basketProduct)).then((action) => {
            if (action.type === addToBasket.rejected.type) {
                setButtonClicked(false);
                toast({
                    title: "Failed to add product to the basket",
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                    position: 'top-right',
                    variant: 'subtle'
                });
            } else {
                dispatch(fetchBasket());
                toast({
                    title: "Product added to the basket successfully!",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    position: 'top-right',
                    variant: 'subtle'
                });
            }
        });
    };

    const handleDeleteFromBasket = () => {
        if (!user) {
            toast({
                title: "Please log in to remove products from the basket",
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top-right',
                variant: 'subtle'
            });
            return;
        }

        const basketProduct = {
            user_id: user?.id,
            product_id: id,
        };

        dispatch(deleteFromBasket(basketProduct)).then((action) => {
            if (action.type === deleteFromBasket.rejected.type) {
                toast({
                    title: "Failed to remove product from the basket",
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                    position: 'top-right',
                    variant: 'subtle'
                });
            } else {
                dispatch(fetchBasket());
                toast({
                    title: "Product removed from the basket successfully!",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    position: 'top-right',
                    variant: 'subtle'
                });
            }
        });
    };

    return (
        <div className="w-64 p-4 bg-white rounded-lg shadow-lg">
            <Image src={img_url} alt={name} width={150} height={150} className="rounded-lg" />
            <div className="mt-4">
                <h3 className="text-lg font-medium">{name}</h3>
                <p className="text-gray-500 mt-1">{description}</p>
                <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold">${price}</span>
                    {!buttonClicked ? (
                        <button onClick={handleAddToBasket}>
                            <Image src={PlusSvg} alt="Add to basket" width={24} height={24} />
                        </button>
                    ) : (
                        <button onClick={handleDeleteFromBasket}>
                            <Image src={DeleteSvg} alt="Remove from basket" width={24} height={24} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
