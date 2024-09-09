import { useEffect, useRef, useState } from 'react';
import styles from './Slider.module.css';
import Image from 'next/image';
import shoppingBag from '../../../public/shopping-bag.png';
import emptyBag from '../../../public/Emptybasket (1).png';
import closedBag from '../../../public/cross.png';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Redux/Store/store';
import { GetBasket } from '../../../Services';
import { updateBasket } from '../../Redux/Actions/basketActions'; // Redux action

const BasketMenu = () => {
  const dispatch = useDispatch();
  const basket = useSelector((state: RootState) => state.basket);
  const basketCount = basket?.data?.total_count;
  const basketAmount = basket?.data?.total_amount;
  const basketItems = basket?.data?.items || [];

  const [imageUrl, setImageUrl] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataResult = await GetBasket();
        const items = dataResult?.data?.result?.data?.items || [];
        const imgUrls = items.map((item: any) => item.img_url);

        // Redux state'i güncelle
        dispatch(updateBasket(dataResult.data.result.data));

        // Local imageUrl state'i güncelle
        setImageUrl(imgUrls);
      } catch (error) {
        console.error('Error fetching basket:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (basketItems.length > 0) {
      const updatedImgUrls = basketItems.map((item: any) => item.img_url);
      setImageUrl(updatedImgUrls); // Redux state'e göre img_url state'ini güncelle
    }
  }, [basketItems]);

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
          <Image src={shoppingBag} width={60} height={60} />
        </div>
      </button>
      <div className="text-white absolute z-50 mt-12 ml-14 bg-mainRed w-6 h-6 rounded-full pl-1.5 font-semibold">
        {basketCount}
      </div>

      <div className={`${styles.overlay} ${isMenuOpen ? styles.overlayVisible : styles.overlayHidden}`}></div>

      <div className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : styles.menuClosed}`}>
        <div ref={menuRef} className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : styles.menuClosed}`}>
          <button onClick={handleToggleMenu} className={styles.buyButton}>
            <div className="flex right-0">
              <Image src={closedBag} width={50} height={50} />
            </div>
          </button>

          {basketItems.length > 0 ? (
            <div>
              {basketAmount}
              {imageUrl.map((url, index) => (
                <Image key={index} src={url} alt={`Product Image ${index + 1}`} width={50} height={50} />
              ))}
            </div>
          ) : (
            <div>
              <div className="ml-32">
                <Image src={emptyBag} width={300} height={300} />
              </div>
              <h1 className="text-center font-bold text-6xl ml-8 text-categorycolor">Empty Basket</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BasketMenu;
