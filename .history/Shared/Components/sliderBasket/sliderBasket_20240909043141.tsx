
import { useEffect, useRef, useState } from 'react';
import styles from './Slider.module.css'
import Image from 'next/image';
// import basketImage from '../../../public/shopping-basket.png'
import shoppingBag from '../../../public/shopping-bag.png'
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store/store';
import { GetBasket } from '../../../Services';

const BasketMenu = () => {

  const basket = useSelector((state: RootState) => state.basket);
  const [count, setCount] = useState('')

  console.log("basket",basket);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataResult = await GetBasket()

        const dataCount = dataResult.data.result.data.total_count
        setCount(dataCount)

        console.log("dataResult",dataResult.data.result.data.total_count);
         
      } catch (error) {

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


return (<>

<button onClick={handleToggleMenu} className={styles.buyButton}>

  <div className=' -z-50'>
  <Image src={shoppingBag} width={50} height={50}/>
  </div>


</button>
<div className=' text-white absolute z-50  mt-9 ml-11 bg-mainRed w- h-8 rounded-full'>
  {count}
  </div>
  

  <div className={`${styles.overlay} ${isMenuOpen ? styles.overlayVisible : styles.overlayHidden}`}></div>


  <div className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : styles.menuClosed}`}>
              <div ref={menuRef} className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : styles.menuClosed}`}>
          <h1 className="text-white text-2xl p-4">This is a sliding menu!</h1>
     
          <button onClick={handleToggleMenu} className={styles.buyButton}>
           <Image src={shoppingBag} width={50} height={50}/>
        
            </button>
        </div>
  </div>

  </>)

};

export default BasketMenu;
