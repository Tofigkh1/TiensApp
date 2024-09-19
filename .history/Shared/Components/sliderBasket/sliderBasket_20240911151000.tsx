import { useEffect, useRef, useState } from 'react';
import styles from './Slider.module.css';
import Image from 'next/image';
import shoppingBag from '../../../public/shopping-bag.png';
import emptyBag from '../../../public/Emptybasket (1).png';
import closedBag from '../../../public/left-chevron.png';
import plus from '../../../public/plus (3).png';
import minus from '../../../public/minus-circle.png';
import miniBasket from '../../../public/cart.png';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Redux/Store/store';
import { GetBasket } from '../../../Services';
import { fetchBasket, deleteFromBasket, addToBasket } from '../../Redux/Featuries/basketSlice/basketSlice.tsx';
import { useToast } from "@chakra-ui/react";

const BasketMenu = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const basket = useSelector((state: RootState) => state.basket);
  const user = useSelector((state: RootState) => state.user);
  const { isRectVisible, isRectVisible2 } = useSelector((state: RootState) => state.buttonVisibility);
  const basketCount = basket?.data?.total_count;
  const basketAmount = basket?.data?.total_amount;
  const basketItems = basket?.data?.items || [];
  
  const [timers, setTimers] = useState<{ [key: string]: number }>({});
  const [progress, setProgress] = useState<{ [key: string]: number }>({}); // Çubuk ilerlemesi için

  useEffect(() => {
    dispatch(fetchBasket());
  }, [dispatch]);

  // Zamanlayıcıları kur
  useEffect(() => {
    basketItems.forEach((item) => {
      if (!timers[item.id]) {
        setTimers((prevTimers) => ({
          ...prevTimers,
          [item.id]: 60, // 1 dakika (saniye cinsinden)
        }));
        setProgress((prevProgress) => ({
          ...prevProgress,
          [item.id]: 100, // Çubuğun başlangıç noktası (yüzde)
        }));
      }
    });
  }, [basketItems]);

  // Geri sayım ve çubuk ilerlemesi
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimers((prevTimers) => {
        const updatedTimers = { ...prevTimers };
        Object.keys(updatedTimers).forEach((productId) => {
          if (updatedTimers[productId] > 0) {
            updatedTimers[productId] -= 1; // Her saniye geri say
            setProgress((prevProgress) => ({
              ...prevProgress,
              [productId]: (updatedTimers[productId] / 60) * 100, // Çubuk genişliği yüzdesi
            }));
          } else {
            handleDeleteFromBasket(productId); // Zaman dolduğunda ürünü sil
            delete updatedTimers[productId]; // Timer'ı temizle
            setProgress((prevProgress) => {
              const updatedProgress = { ...prevProgress };
              delete updatedProgress[productId]; // İlgili progress çubuğunu temizle
              return updatedProgress;
            });
          }
        });
        return updatedTimers;
      });
    }, 1000); // Her saniye güncelle
  
    return () => clearInterval(intervalId); // Component unmount olduğunda interval temizlensin
  }, [timers]);

  const handleDeleteFromBasket = (productId: string) => {
    const basketProduct = {
      user_id: user?.id,
      product_id: productId,
      ageSize: isRectVisible ? "1" : isRectVisible2 ? "2" : null,
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
    <>
      <div>
        {basketItems.length > 0 ? (
          basketItems.map((item, index) => (
            <div key={index} className='flex justify-between items-center mt-4'>
              <div className="w-36 h-auto rounded-2xl border bg-white flex">
                <Image src={item.img_url} alt={`Product Image ${index + 1}`} width={130} height={130} />
              </div>

              <h1 className='text-xl'>{item.name}</h1>

              {/* Zaman ve İlerleme Çubuğu */}
              <div className="flex flex-col items-center">
                <h1 className='text-lg'>{timers[item.id]} saniye</h1>
                <div className="w-full bg-gray-200 h-2 mt-1">
                  <div
                    className="bg-green-500 h-2"
                    style={{ width: `${progress[item.id]}%` }} // Yüzdeyi buradan al
                  />
                </div>
              </div>

              <div>
                <button onClick={() => handleDeleteFromBasket(item.id)}>
                  <Image src={minus} alt="Delete product" width={35} height={35} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>Sepet boş</div>
        )}
      </div>
    </>
  );
};

export default BasketMenu;
