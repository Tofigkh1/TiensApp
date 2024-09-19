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
import { fetchBasket, deleteFromBasket, addToBasket, deleteAllBasket } from '../../Redux/Featuries/basketSlice/basketSlice';
import { useToast } from "@chakra-ui/react";

const BasketMenu = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const basket = useSelector((state: RootState) => state.basket);
  const user = useSelector((state: RootState) => state.user);
  const basketItems = basket?.data?.items || [];
  const basketId = basket?.data?.id;
  const basketCount = basket?.data?.total_count;
  const basketAmount = basket?.data?.total_amount;
  
  // Timer and Progress Bar State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3000); // 50 minutes = 3000 seconds
  const [progress, setProgress] = useState(100); // Progress bar percentage

  const menuRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    dispatch(fetchBasket());
  }, [dispatch]);

  // Handle countdown and progress bar
  useEffect(() => {
    if (basketItems.length > 0) {
      setProgress(100); // Reset progress on new items
      setTimeLeft(3000); // Reset timer to 50 minutes
      if (intervalRef.current) clearInterval(intervalRef.current); // Clear any existing timer

      intervalRef.current = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 0) {
            clearInterval(intervalRef.current as NodeJS.Timeout);
            dispatch(deleteAllBasket({ user_id: user?.id, basket_id: basketId }));
            toast({
              title: "Time's up! Basket cleared.",
              status: 'info',
              duration: 2000,
              isClosable: true,
              position: 'top-right',
            });
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000); // Update every second
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [basketItems, dispatch, user?.id, basketId]);

  useEffect(() => {
    // Calculate progress bar based on remaining time
    setProgress((timeLeft / 3000) * 100);
  }, [timeLeft]);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <button onClick={handleToggleMenu} className={styles.buyButton}>
        <div>
          <Image src={shoppingBag} width={60} height={60} alt="Basket Icon" />
        </div>
      </button>
      <div className='text-white absolute z-50 mt-12 ml-14 bg-mainRed w-6 h-6 rounded-full pl-1.5 font-semibold'>
        {basketCount}
      </div>

      <div className={`${styles.overlay} ${isMenuOpen ? styles.overlayVisible : styles.overlayHidden}`}></div>

      <div className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : styles.menuClosed}`} ref={menuRef}>
        {basketItems.length > 0 ? (
          <div>
            {/* Timer Bar */}
            <div className={styles.progressContainer}>
              <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
            </div>

            <div className='flex'>
              <div>
                <button onClick={handleToggleMenu} className={styles.buyButton}>
                  <Image src={closedBag} width={50} height={50} alt="Close Icon" />
                </button>
              </div>
              <h1 className='font-bold text-3xl ml-10 text-black mt-4'>Basket</h1>
            </div>

            <div className='flex ml-28 mt-3 text-black'>
              <Image src={miniBasket} width={30} height={30} />
              <h1 className='ml-2 text-xl'>Total products:</h1>
              <h1 className='ml-2 text-xl'>{basketCount}</h1>
            </div>

            <div className={`${styles.scrollContainer}`}>
              {basketItems.map((items, index) => (
                <div key={index} className='flex flex-col justify-around'>
                  <div className='flex justify-around mt-10'>
                    <Image src={items.img_url} alt={`Product Image ${index + 1}`} width={130} height={130} className="w-36 h-auto rounded-2xl bg-white" />
                    <h1 className='font-bold text-xl mr-20 text-black'>{items.name}</h1>
                    <div className='flex flex-col'>
                      <h1 className='text-black'>{items.count}</h1>
                      <button onClick={() => dispatch(deleteFromBasket({ product_id: items.id, user_id: user.id }))}>
                        <Image src={minus} alt="Delete product" width={35} height={35} />
                      </button>
                      <button onClick={() => dispatch(addToBasket({ product_id: items.id, user_id: user.id }))}>
                        <Image src={plus} alt="Add product" width={35} height={35} />
                      </button>
                    </div>
                    <div className='right-0 bg-clientButtonGreen rounded-xl w-24 h-auto text-center text-black'>
                      <div className='ml-3 flex gap-2 mt-7 font-semibold text-xl text-center'>
                        <h1>{items.amount}</h1>
                        <h1>₼</h1>
                      </div>
                    </div>
                  </div>
                  <hr className={styles.line} />
                </div>
              ))}
            </div>

            <div className='flex justify-end gap-32 mt-3 mr-6 text-black'>
              <button onClick={() => dispatch(deleteAllBasket({ user_id: user.id, basket_id: basketId }))}>
                <Image src={trash} width={30} height={30} alt="Clear Cart" />
                Clear Cart
              </button>
              <h1 className='text-xl font-semibold text-black'>Total:</h1>
              <h1 className='text-xl font-semibold text-black'>{basketAmount}₼</h1>
            </div>

            <div className='flex justify-end mr-5 mt-4'>
              <button className='bg-clientButtonGreen w-64 h-12 rounded-lg font-semibold text-xl'>Checkout</button>
            </div>
          </div>
        ) : (
          <div>
            <Image src={emptyBag} width={300} height={300} alt="Empty Basket" className='ml-32' />
            <h1 className='text-center font-bold text-6xl ml-8 text-categorycolor'>Empty Basket</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default BasketMenu;
