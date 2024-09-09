import { useEffect, useRef, useState } from 'react';
import styles from './Slider.module.css';
import Image from 'next/image';
import shoppingBag from '../../../public/shopping-bag.png';
import closedBag from '../../../public/cross.png';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store/store';
import { GetBasket } from '../../../Services';

const BasketMenu = () => {
  const basket = useSelector((state: RootState) => state.basket);
  const basketCount = basket.data.total_count;
  const basketAmount = basket.data.total_amount;
  const basketItems = basket.data?.items || [];

  const [imageUrl, setImageUrl] = useState<string[] | null>(null); // Changed to array of strings

  console.log('basket33', basket);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataResult = await GetBasket();
        const items = dataResult?.data?.result?.data?.items || [];
        const imgUrls = items.map((item: any) => item.img_url);

        setImageUrl(imgUrls);

        console.log('dataResult', dataResult?.data?.result?.data?.items[0]?.img_url);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <button onClick={handleToggleMenu} className={styles.buyButton}>
        <div className="-z-50">
          <Image src={shoppingBag} width={60} height={60} alt="Shopping Bag" />
        </div>
      </button>

      <div className="text-white absolute z-50 mt-12 ml-14 bg-mainRed w-6 h-6 rounded-full pl-1.5 font-semibold">
        {basketCount}
      </div>

      <div className={`${styles.overlay} ${isMenuOpen ? styles.overlayVisible : styles.overlayHidden}`}></div>

      <div className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : styles.menuClosed}`}>
        <div ref={menuRef} className={`${styles.menuContent}`}>
          <h1 className="text-white text-2xl p-4">This is a sliding menu!</h1>

          <button onClick={handleToggleMenu} className={styles.buyButton}>
            <div className="flex right-0">
              <Image src={closedBag} width={50} height={50} alt="Close Bag" />
            </div>
          </button>

          {basketItems.length > 0 ? (
            <>
              <p>{basketAmount}</p>
              {imageUrl?.map((url, index) => (
                <Image key={index} src={url} alt={`Product Image ${index + 1}`} width={50} height={50} />
              ))}
            </>
          ) : (
           <div>
<div className=' ml-32'>
<Image src={emptyBag} width={300} height={300}/>



</div>
<h1 className=' text-center font-bold text-6xl ml-8 text-categorycolor'>Empty Basket</h1>
</div>
          )}
        </div>
      </div>
    </>
  );
};

export default BasketMenu;
