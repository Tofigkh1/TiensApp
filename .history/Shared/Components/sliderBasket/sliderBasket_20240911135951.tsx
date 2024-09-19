import { useEffect, useRef, useState } from 'react';
import styles from './Slider.module.css';
import Image from 'next/image';
import shoppingBag from '../../../public/shopping-bag.png';
import emptyBag from '../../../public/Emptybasket (1).png';
import closedBag from '../../../public/left-chevron.png';
import miniBasket from '../../../public/cart.png';
import DeleteSvg from '../../../../public/delete.png';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Redux/Store/store';
import { GetBasket } from '../../../Services';
import { fetchBasket, deleteFromBasket } from '../../Redux/Featuries/basketSlice/basketSlice.tsx';
import { useToast } from "@chakra-ui/react";
import Swiper from 'swiper';
import { useRouter } from 'next/router';
import ProductsCard from '../Client/Products/ProductCard';

const BasketMenu = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const basket = useSelector((state: RootState) => state.basket);
  const user = useSelector((state: RootState) => state.user);
  const basketCount = basket?.data?.total_count;
  const basketAmount = basket?.data?.total_amount;
  const basketItems = basket?.data?.items || [];
  const basketid = basketItems[0]?.id
  console.log("basketid",basketid);
  

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const imgUrls = basketItems.map((item: any) => item.img_url);
    setImageUrl(imgUrls);
  }, [basketItems]);

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
              <div className=' flex ml-28 mt-3 text-black'>
                <div>
                  <Image src={miniBasket} width={30} height={30}/>
                </div>
                <h1 className=' ml-2 text-xl'>
                  Total products:
                </h1>
                <h1 className=' ml-2 text-xl'>{basketCount}</h1>
              </div>
              <div className={`${styles.scrollContainer}`}>

                
                {basketItems.map((items, index) => (
                  <div key={index} className='flex flex-col justify-around'>
                    <div className='flex justify-around mt-10'>
                      <div className=" w-36 h-auto rounded-2xl border border-whiteLight3 bg-white flex">
                        <div>
                          <Image src={items.img_url} alt={`Product Image ${index + 1}`} width={130} height={130} />
                        </div>
                      </div>
                      <h1 className=' font-bold text-xl mr-20 text-black'>{items.name}</h1>
                      <h1>{items.count}</h1>
                      <div className=' right-0 bg-clientButtonGreen rounded-xl w-20 h-auto text-center text-black'>
                        <div className='ml-3 flex gap-2 mt-7 font-semibold text-xl'>
                          <h1>{items.amount}</h1>
                          <h1>₼</h1>
                        </div>
                      </div>

                      {/* Silme butonu */}
                      <button key={index} onClick={() => handleDeleteFromBasket(items.id)} className="bg-red-500 p-2 rounded-full">
                        <Image src={closedBag} alt="Delete product" width={20} height={20} />
                      </button>
                    </div>
                    <hr className={styles.line} />
                  </div>
                ))}
              </div>
              <div className='flex justify-end gap-32 mt-3 mr-6'>
                <div>
                  <h1 className=' text-xl font-semibold text-black'>Total:</h1>
                </div>
                <div>
                  <h1 className='text-xl font-semibold text-black'>{basketAmount}₼</h1>
                </div>
              </div>
              <div className='flex justify-end mr-5 mt-4'>
                <button className=' bg-clientButtonGreen w-64 h-12 rounded-lg font-semibold text-xl'>Checkout</button>
              </div>
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
