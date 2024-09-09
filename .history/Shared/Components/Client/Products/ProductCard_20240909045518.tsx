import styles from './products.module.css';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../Redux/Store/store';
import { fetchBasket, addToBasket, deleteFromBasket } from '../../../Redux/Featuries/basketSlice/basketSlice.tsx';
import PlusSvg from "../../../../public/plus.png";
import DeleteSvg from '../../../../public/delete.png';
import { useToast } from "@chakra-ui/react";
import Image from 'next/image';
import { resetButtonVisibility } from '../../../Redux/Featuries/ageSize/ageSize';

type ProductState = {
    id: string;
    description?: string;
    img_url: string;
    name: string;
    price: number;
};

export default function ProductsCard(product: ProductState) {
    let { id, description, img_url, name, price } = product;
    const dispatch = useDispatch<AppDispatch>();
    const [buttonClicked, setButtonClicked] = useState(false);
    const user = useSelector((state: RootState) => state.user);
    const basket = useSelector((state: RootState) => state.basket);
    console.log("basket2", basket);
    
    const products = useSelector((state: RootState) => state.products);
    const { isRectVisible, isRectVisible2 } = useSelector((state: RootState) => state.buttonVisibility);
    const toast = useToast();

    // Sepeti fetch ediyoruz
    useEffect(() => {
        dispatch(fetchBasket());
    }, [dispatch]);

    // Sepette ürün olup olmadığını kontrol ediyoruz
    useEffect(() => {
        if (basket?.length > 0) { // basket.items yerine doğrudan basket
            const isInBasket = basket?.some((basketProduct: any) => basketProduct?.product_id === id);
            setButtonClicked(isInBasket);
        }
    }, [basket, id]); // .items yerine doğrudan basket

    // Sepete ürün ekleme fonksiyonu
    const handleAddToBasket = () => {
        if (!user) {
            toast({
                title: "Lütfen sepete ürün eklemek için giriş yapın",
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
            ageSize: isRectVisible ? "1" : isRectVisible2 ? "2" : null,
        };

        if (!isRectVisible && !isRectVisible2) {
            toast({
                title: "Lütfen bir beden seçin",
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top-right',
                variant: 'subtle'
            });
            return;
        }

        setButtonClicked(true);
        dispatch(addToBasket(basketProduct)).then((action) => {
            if (action.type === addToBasket.rejected.type) {
                setButtonClicked(false);
                toast({
                    title: "Ürün sepete eklenemedi",
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                    position: 'top-right',
                    variant: 'subtle'
                });
            } else {
                dispatch(fetchBasket());
                toast({
                    title: "Ürün başarıyla sepete eklendi!",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    position: 'top-right',
                    variant: 'subtle'
                });
            }
        });
    };

    // Sepetten ürün silme fonksiyonu
    const handleDeleteFromBasket = () => {
        if (!user) {
            toast({
                title: "Lütfen sepetten ürün silmek için giriş yapın",
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
            ageSize: isRectVisible ? "1" : isRectVisible2 ? "2" : null,
        };

        if (!isRectVisible && !isRectVisible2) {
            toast({
                title: "Lütfen bir beden seçin",
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top-right',
                variant: 'subtle'
            });
            return;
        }

        dispatch(deleteFromBasket(basketProduct)).then((action) => {
            if (action.type === deleteFromBasket.rejected.type) {
                toast({
                    title: "Ürün sepetten silinemedi",
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                    position: 'top-right',
                    variant: 'subtle'
                });
            } else {
                dispatch(fetchBasket());
                setButtonClicked(false);
        
                toast({
                    title: "Ürün başarıyla sepetten silindi!",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    position: 'top-right',
                    variant: 'subtle'
                });
            }
        });
    };

    const productInBasket = basket?.find((basketProduct: any) => basketProduct?.id === id); // .items kalktı
    const productCount = productInBasket ? productInBasket.count : 0;

    return (
        <div className={`flex justify-between sm:flex-nowrap flex-wrap gap-[12px] ${styles.product_box}`}>
            <div className={`flex justify-end items-center md:gap-[30px] gap-2 ${styles.product_right}`}>
                <button onClick={handleAddToBasket} className={buttonClicked ? styles.active : ''}>
                    <Image src={PlusSvg} alt="Sepete ekle" />
                </button>
                <h1 className=' text-clientButtonGreen text-2xl'>{productCount > 0 ? `${productCount}` : 0}</h1>
                <button onClick={handleDeleteFromBasket}>
                    <Image src={DeleteSvg} alt="Sepetten çıkar" />
                </button>
            </div>
        </div>
    );
}
