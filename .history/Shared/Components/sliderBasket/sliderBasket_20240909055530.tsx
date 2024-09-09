import { useEffect, useRef, useState } from 'react';
import styles from './Slider.module.css'
import Image from 'next/image';
import shoppingBag from '../../../public/shopping-bag.png';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store/store';
import { GetBasket } from '../../../Services';

const BasketMenu = () => {

  const basket = useSelector((state: RootState) => state.basket);
  const basketCount = basket.data.total_count;
  const basketAmount = basket.data.total_amount;

  // Tüm img_url'leri saklamak için bir array state
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataResult = await GetBasket();

        // Tüm item'ların img_url'lerini alıyoruz
        const items = dataResult?.data?.result?.data?.items || [];
        const imgUrls = items.map((item: any) => item.img_url);
        
        setImageUrls(imgUrls);  // img_url array'ini state'e set ediyoruz

        console.log("Fetched image URLs:", imgUrls);
         
      } catch (error) {
        console.error("Error fetching basket data:", error);
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
        <div className=' -z-50'>
          <Image src={shoppingBag} width={60} height={60} alt="Shopping Bag" />
        </div>
      </button>
      <div className='text-white absolute z-50 mt-11 ml-12 bg-mainRed w-7 h-7 rounded-full pl-1.5 font-bold'>
        {basketCount}
      </div>

      <div className={`${styles.overlay} ${isMenuOpen ? styles.overlayVisible : styles.overlayHidden}`}></div>

      <div className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : styles.menuClosed}`}>
        <div ref={menuRef} className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : styles.menuClosed}`}>
          <h1 className="text-white text-2xl p-4">This is a sliding menu!</h1>

          <button onClick={handleToggleMenu} className={styles.buyButton}>
            <Image src={shoppingBag} width={50} height={50} alt="Shopping Bag" />
            {basketAmount}

            {/* Tüm img_url'leri göstermek için map kullanıyoruz */}
            {imageUrls.map((url, index) => (
              <Image key={index} src={url} alt={`Product Image ${index + 1}`} width={50} height={50} />
            ))}
          </button>
        </div>
      </div>
    </>
  );
};

export default BasketMenu;
