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
import Swiper from 'swiper';
import { useRouter } from 'next/router';
import ProductsCard from '../Client/Products/ProductCard';

const BasketMenu = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const basket = useSelector((state: RootState) => state.basket);
  const user = useSelector((state: RootState) => state.user);
  const { isRectVisible, isRectVisible2 } = useSelector((state: RootState) => state.buttonVisibility);
  const basketCount = basket?.data?.total_count;
  const basketAmount = basket?.data?.total_amount;
  const basketItems = basket?.data?.items || [];
  const basketid = basketItems[0]?.id;

  const [timer, setTimer] = useState(60);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isCountdownActive && timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(countdown);
    } else if (timer === 0) {
      handleDeleteFromBasket(basketid);
      setIsCountdownActive(false);
    }
  }, [isCountdownActive, timer, basketid]);

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
        setIsCountdownActive(true);
        setTimer(60);
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
      <button onClick={handleToggleMenu} className={styles.buyButton}>
        <div className=' -z-50'>
          <Image src={shoppingBag} width={60} height={60} alt="Basket Icon"/>
        </div>
      </button>
      <div className=' text-white absolute z-50 mt-12 ml-14 bg-mainRed w-6 h-6 rounded-full pl-1.5 font-semibold'>
        {basketCount}
      </div>

      <div className={`${styles.overlay} ${isMenuOpen ? styles.overlayVisible : styles.overlayHidden}`}></div>

      <div className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : styles.menuClosed}`}>
        <div ref={menuRef} className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : styles.menuClosed}`}>
          {basketItems.length > 0 ? (
            <div>
              <div className=' flex'>
                <div>
                  <button onClick={handleToggleMenu} className={styles.buyButton}>
                    <div className='flex right-0'>
                      <Image src={closedBag} width={50} height={50} alt="Close Icon"/>
                    </div>
                  </button>
                </div>
                <div>
                  <h1 className=' font-bold text-3xl ml-10 text-black mt-4'>
                    Basket
                  </h1>
                </div>
              </div> 

              {/* Geri sayım süresi */}
              <div className="text-center mt-4">
                {isCountdownActive && (
                  <h1 className="text-red-500 text-2xl font-bold">
                    Remaining time: {timer} seconds
                  </h1>
                )}
              </div>

              {/* Sepet ürünleri ve diğer UI */}
              ...
            </div>
          ) : (
            <div>
              <div className='ml-32'>
                <Image src={emptyBag} width={300} height={300} alt="Empty Basket"/>
              </div>
              <h1 className='text-center font-bold text-6xl ml-8 text-categorycolor'>Empty Basket</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BasketMenu;

