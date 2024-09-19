import { useEffect, useRef, useState } from 'react';
import styles from './Slider.module.css';
import Image from 'next/image';
import shoppingBag from '../../../public/shopping-bag.png';
import emptyBag from '../../../public/Emptybasket (1).png';
import closedBag from '../../../public/cross.png';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store/store';
import { GetBasket } from '../../../Services';
import Swiper from 'swiper';
import { useRouter } from 'next/router';

const BasketMenu = () => {
  const basket = useSelector((state: RootState) => state.basket);
  const basketCount = basket?.data?.total_count;
  const basketAmount = basket?.data?.total_amount;
  const basketItems = basket?.data?.items || [];
  const basketName = basketItems[0]?.name

  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);


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
  }, []);

  




  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
          <button onClick={handleToggleMenu} className={styles.buyButton}>
            <div className='flex right-0'>
              <Image src={closedBag} width={50} height={50} alt="Close Icon"/>
            </div>
          </button>

          {basketItems.length > 0 ? (
            <div>
                 {basketItems.map((items, index) => (
                  <div className=' flex '>

       

   <div key={index}  className="w-56 h-32 h-auto m-4 rounded-2xl border border-whiteLight3 bg-white flex">
             
                  <div spaceBetween={50} slidesPerView={1} className="mySwiper cursor-pointer">
     
        
                <Image key={index} src={items.img_url} alt={`Product Image ${index + 1}`} width={120} height={120} />
         
                  </div>

                  <h1 className=' font-bold text-xl' key={index}>{items.name}</h1>

           
                </div>

                <div>
                       <h1 className=' right-0' key={index}>{items.amount}</h1>
                </div>
                </div>
                     ))}

                     {/* <div>
                     {basketItems.map((name,index)=>(
                  <h1 key={index}>{name}</h1>
                 ))}
                     </div> */}
              
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
