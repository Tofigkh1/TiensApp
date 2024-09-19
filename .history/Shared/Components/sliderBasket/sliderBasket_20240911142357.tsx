import { useEffect, useRef, useState } from 'react';
import styles from './Slider.module.css';
import Image from 'next/image';
import shoppingBag from '../../../public/shopping-bag.png';
import emptyBag from '../../../public/Emptybasket (1).png';
import closedBag from '../../../public/left-chevron.png';
import plus from '../../../public/plus (3).png';
import minus from '../../../public/minus-circle.png';
import miniBasket from '../../../public/cart.png';
import DeleteSvg from '../../../../public/delete.png';
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
  const [timers, setTimers] = useState<{ [key: string]: number }>({}); // Her ürün için geri sayım tutmak
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(fetchBasket());
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataResult = await GetBasket();
        const items = dataResult?.data?.result?.data?.items || [];
        const imgUrls = items.map((item: any) => item.img_url);
        setImageUrl(imgUrls);
      } catch (error) {
        console.error("Error fetching basket data", error);
      }
    };
    fetchData();
  }, []);

  // Zamanlayıcıyı başlatmak için
  useEffect(() => {
    basketItems.forEach((item) => {
      if (!timers[item.id]) {
        setTimers((prevTimers) => ({
          ...prevTimers,
          [item.id]: 50 * 60, // 50 dakika (saniye cinsinden)
        }));
      }
    });
  }, [basketItems]);

  // Geri sayımı yönetmek için
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimers((prevTimers) => {
        const updatedTimers = { ...prevTimers };
        Object.keys(updatedTimers).forEach((productId) => {
          if (updatedTimers[productId] > 0) {
            updatedTimers[productId] -= 1; // Her saniye geri say
          } else {
            // Zaman doldu, ürünü sil
            handleDeleteFromBasket(productId);
            delete updatedTimers[productId]; // Timer'ı temizle
          }
        });
        return updatedTimers;
      });
    }, 1000); // Her saniye güncelle

    return () => clearInterval(intervalId); // Component unmount olduğunda interval temizlensin
  }, [timers]);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAddFromBasket = (productId: string) => {
    const basketProduct = {
      user_id: user?.id,
      product_id: productId,
      ageSize: isRectVisible ? "1" : isRectVisible2 ? "2" : null,
    };

    dispatch(addToBasket(basketProduct)).then((action) => {
      if (action.type === deleteFromBasket.rejected.type) {
        toast({
          title: "Failed to add product to the basket",
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: 'top-right',
          variant: 'subtle',
        });
      } else {
        dispatch(fetchBasket());
        toast({
          title: "Product added to the basket successfully!",
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top-right',
          variant: 'subtle',
        });
      }
    });
  };

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
          variant: 'subtle',
        });
      } else {
        dispatch(fetchBasket());
        toast({
          title: "Product removed from the basket successfully!",
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top-right',
          variant: 'subtle',
        });
      }
    });
  };

  return (
    <>
      {/* Sepet ikonu ve sayısı */}
      <button onClick={handleToggleMenu} className={styles.buyButton}>
        <div className="-z-50">
          <Image src={shoppingBag} width={60} height={60} alt="Basket Icon" />
        </div>
      </button>
      <div className="text-white absolute z-50 mt-12 ml-14 bg-mainRed w-6 h-6 rounded-full pl-1.5 font-semibold">
        {basketCount}
      </div>

      {/* Sepet menüsü */}
      <div className={`${styles.overlay} ${isMenuOpen ? styles.overlayVisible : styles.overlayHidden}`}></div>
      <div className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : styles.menuClosed}`}>
        <div ref={menuRef} className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : styles.menuClosed}`}>
          {basketItems.length > 0 ? (
            <div>
              <div className="flex">
                <div>
                  <button onClick={handleToggleMenu} className={styles.buyButton}>
                    <div className="flex right-0">
                      <Image src={closedBag} width={50} height={50} alt="Close Icon" />
                    </div>
                  </button>
                </div>
                <div>
                  <h1 className="font-bold text-3xl ml-10 text-black mt-4">Basket</h1>
                </div>
              </div>
              <div className="flex ml-28 mt-3 text-black">
                <div>
                  <Image src={miniBasket} width={30} height={30} />
                </div>
                <h1 className="ml-2 text-xl">Total products:</h1>
                <h1 className="ml-2 text-xl">{basketCount}</h1>
              </div>
              <div className={`${styles.scrollContainer}`}>
                {basketItems.map((items, index) => (
                  <div key={index} className="flex flex-col justify-around">
                    <div className="flex justify-around mt-10">
                      <div className="w-36 h-auto rounded-2xl border border-whiteLight3 bg-white flex">
                        <div>
                          <Image src={items.img_url} alt={`Product Image ${index + 1}`} width={130} height={130} />
                        </div>
                      </div>
                      <h1 className="font-bold text-xl mr-20 text-black">{items.name}</h1>
                      <div className="flex flex-col">
                        <div>
                          <h1>{items.count}</h1>
                        </div>
                        <div className="mt-5">
                          <button onClick={() => handleDeleteFromBasket(items.id)} className="bg-red-500 rounded-lg p-2 text-white">
                            <Image src={DeleteSvg} width={24} height={24} alt="Delete Icon" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <Image src={emptyBag} width={300} height={300} />
              <h1 className="text-xl font-bold text-center mt-2">Your basket is empty!</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BasketMenu;
