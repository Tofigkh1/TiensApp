import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from './medicines.module.css';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Shared/Redux/Store/store";
import { fetchProductsById } from "../../Shared/Redux/Featuries/products/productSlice";
import Image from "next/image";
import ProductsCard from "../../Shared/Components/Client/Products/ProductCard";
import { DotLoader } from "react-spinners";
import NavMedicine from "../../Shared/Components/Client/NavMedicine";
import Auth from "../../Shared/Components/Client/Auth/Auth";
import { setUser } from "../../Shared/Redux/Featuries/User/userSlice";

export default function ProductsDetail() {
    const router = useRouter();
    const { id } = router.query;

    const dispatch = useDispatch();
    const { products, status } = useSelector((state: RootState) => state.products);
    const productList = products ? [products] : [];
    const [isLoading, setIsLoading] = useState(true);
    const [isRectVisible, setIsRectVisible] = useState(false);
    const [isRectVisible2, setIsRectVisible2] = useState(false);

    useEffect(() => {
     
        let user = localStorage.getItem("user_info");
        if (user) {
            user = JSON.parse(user);
            if (user) dispatch(setUser(user));
        }

        if (id) {
            setIsLoading(true); 
            dispatch(fetchProductsById(id as string)).then(() => {
                setIsLoading(false); 
            }).catch(() => {
                setIsLoading(false);
            });
        }
    }, [id, dispatch]);

    const coverImage = products?.cover_url;

    const handleToggle = () => {
        setIsRectVisible2(true);
        setIsRectVisible(false);
    };

    const handleToggle2 = () => {
        setIsRectVisible(true);
        setIsRectVisible2(false);
    };

    return (
        <div className="relative h-auto w-auto">
            {isLoading ? ( 
               <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh'
              }}>
                <DotLoader color="#28e4c5" speedMultiplier={1.6} size={90} />
              </div>
            ) : (
                <>
                    {coverImage && (
                        <Image
                            src={coverImage}
                            alt="Background"
                            layout="fill"
                            objectFit="cover"
                            quality={100}
                            priority={true}
                            className="-z-50"
                        />
                    )}

                    <div className="absolute top-0 left-0 right-0 flex justify-around items-center mt-7">
                        <div className="mr-60">
                            <img
                                onClick={() => router.push('/')}
                                style={{ width: '90px', height: '90px' }}
                                className={styles.logo}
                                src="/Logo.png"
                                alt="Logo"
                            />
                        </div>

                        <div>
                            <NavMedicine />
                        </div>

                        <div className="ml-60">
                            <Auth />
                        </div>
                    </div>

                    <div className="pt-44 flex justify-around items-center w-full">
                        <div className="text-medicineFont font-semibold text-2xl left-14">
                            {products?.description?.split('.').map((sentence, index) => (
                                <p key={index} className="mb-2">{sentence.trim()}.</p>
                            ))}
                        </div>

                        <div className="mr-32">
                            <Image
                                src={products?.img_url}
                                width={470}
                                height={470}
                                className="rounded-3xl"
                                objectFit="cover"
                                quality={100}
                                priority={true}
                            />
                        </div>
                        <div className="flex gap-5">
                            <button onClick={handleToggle} className={`rounded-full w-8 h-8 ${isRectVisible2 ? 'bg-textColorGreen' : ''}`}>30</button>
                            <button onClick={handleToggle2} className={`rounded-full w-8 h-8 ${isRectVisible ? 'bg-textColorGreen' : ''}`}>60</button>
                        </div>
                    </div>

                    <div className="flex justify-around">
                        <h1 className="mt-2">kvsdgnsdk</h1>
                        <h1 className="ml-60 pt-2 text-4xl text-medicineFont font-medium">
                            ${products?.price}
                        </h1>
                        <div className="flex gap-10">
                            <ul className="mt-2">
                                {productList.map((product) => (
                                    <li key={product.id}>
                                        <ProductsCard {...isRectVisible} {...isRectVisible2} {...product} id={String(product.id)} />
                                    </li>
                                ))}
                            </ul>
                            <button onClick={() => router.push("/user/checkout")} className={styles.buyButton}>Buy Now</button>
                        </div>
                    </div>

                    <div className="text-white mt-28 font-bold text-2xl">
                        <p>{products?.allDescription}</p>
                    </div>
                </>
            )}
        </div>
    );
}
