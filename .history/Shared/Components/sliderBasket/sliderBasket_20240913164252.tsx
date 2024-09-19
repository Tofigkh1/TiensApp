import { useEffect, useRef, useState } from 'react';
import styles from './Slider.module.css';
import Image from 'next/image';
import shoppingBag from '../../../public/shopping-bag.png';
import emptyBag from '../../../public/Emptybasket (1).png';
import closedBag from '../../../public/left-chevron.png';
import plus from '../../../public/plus (3).png';
import minus from '../../../public/minus-circle.png';
import trash from '../../../public/trash-bin.png';
import miniBasket from '../../../public/cart.png';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Redux/Store/store';
import { fetchBasket, deleteFromBasket, addToBasket, deleteAllBasket } from '../../Redux/Featuries/basketSlice/basketSlice.tsx';
import { useToast } from "@chakra-ui/react";

const BasketMenu = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const basket = useSelector((state: RootState) => state.basket);
  const user = useSelector((state: RootState) => state.user);
  const basketCount = basket?.data?.total_count;
  const basketAmount = basket?.data?.total_amount;
  const basketItems = basket?.data?.items || [];
  const basketId = basket?.data?.id;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const duration = 60 * 1000; // 1 minute in milliseconds

  useEffect(() => {
    dispatch(fetchBasket());
  }, [dispatch]);

  useEffect(() => {
    const startTime = Date.now();
    const intervalId = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const newProgress = (elapsedTime / duration) * 100;

      if (newProgress >= 100) {
        setProgress(100);
        clearInterval(intervalId);
        handleDeleteAllBasket(basketId); // Remove all products from basket after time runs out
      } else {
        setProgress(newProgress);
      }
    }, 100); // Update every 100ms

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [basketId]);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDeleteFromBasket = (productId: string) => {
    const basketProduct = {
      user_id: user?.id,
      product_id: productId,
    };

    dispatch(deleteFromBasket(basketProduct)).then((action) => {
      if (action.type === deleteFromBasket.rejected.type) {
        toast({
          title: "Failed to remove product from the basket",
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: 'top-right',
        });
      } else {
        dispatch(fetchBasket());
        toast({
          title: "Product removed from the basket successfully!",
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top-right',
        });
      }
    });
  };

  const handleAddFromBasket = (productId: string) => {
    const basketProduct = {
      user_id: user?.id,
      product_id: productId,
    };

    dispatch(addToBasket(basketProduct)).then((action) => {
      if (action.type === deleteFromBasket.rejected.type) {
        toast({
          title: "Failed to add product to the basket",
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: 'top-right',
        });
      } else {
        dispatch(fetchBasket());
        toast({
          title: "Product added to the basket successfully!",
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top-right',
        });
      }
    });
  };

  const handleDeleteAllBasket = (basketId: string) => {
    const basketAll = {
      user_id: user?.id,
      basket_id: basketId,
    };

    dispatch(deleteAllBasket(basketAll)).then((action) => {
      if (action.type === deleteAllBasket.rejected.type) {
        toast({
          title: "Failed to clear the basket",
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: 'top-right',
        });
      } else {
        dispatch(fetchBasket());
        toast({
          title: "Basket cleared successfully!",
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top-right',
        });
      }
    });
  };

  return (
    <>
      <button onClick={handleToggleMenu} className={styles.buyButton}>
        <Image src={shoppingBag} width={60} height={60} alt="Basket Icon"/>
      </button>
      <div className={`text-white absolute z-50 mt-12 ml-14 bg-mainRed w-6 h-6 rounded-full pl-1.5 font-semibold`}>
        {basketCount}
      </div>

      <div className={`${styles.overlay} ${isMenuOpen ? styles.overlayVisible : styles.overlayHidden}`}></div>

      <div className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : styles.menuClosed}`}>
        <div ref={menuRef} className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : styles.menuClosed}`}>
          {basketItems.length > 0 ? (
            <div>
              <div className={styles.progressContainer}>
                <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
              </div>

              <div className="flex">
                <button onClick={handleToggleMenu} className={styles.buyButton}>
                  <Image src={closedBag} width={50} height={50} alt="Close Icon"/>
                </button>
                <h1 className="font-bold text-3xl ml-10 text-black mt-4">Basket</h1>
              </div>

              <div className="flex ml-28 mt-3 text-black">
                <Image src={miniBasket} width={30} height={30}/>
                <h1 className="ml-2 text-xl">Total products:</h1>
                <h1 className="ml-2 text-xl">{basketCount}</h1>
              </div>

              <div className={`${styles.scrollContainer}`}>
                {basketItems.map((items, index) => (
                  <div key={index} className="flex flex-col justify-around">
                    <div className="flex justify-around mt-10">
                      <div className="w-36 h-auto rounded-2xl bg-white flex">
                        <Image src={items.img_url} alt={`Product Image ${index + 1}`} width={130} height={130}/>
                      </div>
                      <h1 className="font-bold text-xl mr-20 text-black">{items.name}</h1>
                      <div className="flex flex-col">
                        <h1 className="text-black">{items.count}</h1>
                        <button onClick={() => handleDeleteFromBasket(items.id)} className="bg-red-500 p-2 rounded-full mt-5">
                          <Image src={minus} alt="Delete product" width={35} height={35}/>
                        </button>
                        <button onClick={() => handleAddFromBasket(items.id)} className="bg-red-500 p-2 rounded-full mt-5">
                          <Image src={plus} alt="Add product" width={35} height={35}/>
                        </button>
                      </div>
                      <div className="bg-clientButtonGreen rounded-xl w-24 h-auto text-center text-black">
                        <div className="ml-3 flex gap-2 mt-7 font-semibold text-xl text-center">
                          <h1>{items.amount}</h1>
                          <h1>₼</h1>
                        </div>
                      </div>
                    </div>
                    <hr className={styles.line}/>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-32 mt-3 mr-6 text-black">
                <button className="flex gap-5" onClick={() => handleDeleteAllBasket(basketId)}>
                  <Image width={30} height={30} src={trash}/>
                  Clear Cart
                </button>
                <h1 className="text-xl font-semibold text-black">Total: {basketAmount}₼</h1>
              </div>

              <div className="flex justify-end mr-5 mt-4">
                <button className="bg-clientButtonGreen w-64 h-12 rounded-lg font-semibold text-xl">Checkout</button>
              </div>
            </div>
          ) : (
            <div>
              <Image src={emptyBag} width={300} height={300} alt="Empty Basket"/>
              <h1 className="text-center font-bold text-6xl text-categorycolor">Empty Basket</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BasketMenu;
