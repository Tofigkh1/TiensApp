import { useEffect, useRef, useState } from 'react';
import styles from './Slider.module.css';
import Image from 'next/image';
import shoppingBag from '../../../public/shopping-bag.png';
import emptyBag from '../../../public/Emptybasket (1).png';
import closedBag from '../../../public/left-chevron.png';
import miniBasket from '../../../public/cart.png';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store/store';
import { GetBasket } from '../../../Services';
import Swiper from 'swiper';
import { useRouter } from 'next/router';
import ProductsCard from '../Client/Products/ProductCard';

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

  

    <div className=' flex ml-10 mt-3 text-black'>
        <div className=''>
        <Image src={miniBasket} width={30} height={30}/>
    </div>
     
      <h1 className=' ml-2 text-xl'>
      Total products:
      </h1>

      <h1 className=' ml-2 text-xl'>{basketCount}</h1>

      </div>
    
  

    <div className={`${styles.scrollContainer}`}>
                 {basketItems.map((items, index) => (


  <div className='flex flex-col justify-around'>


       
<div className=' flex justify-around mt-10'>
<div key={index}  className=" w-36  h-auto  rounded-2xl border border-whiteLight3 bg-white flex">
             
             <div className="">

   
           <Image key={index} src={items.img_url} alt={`Product Image ${index + 1}`} width={130} height={130} />
    
             </div>

            

      
           </div>
           <h1 className=' font-bold text-xl mr-20 text-black' key={index} >{items.name}</h1>

           
           <div className=' right-0  bg-clientButtonGreen rounded-xl w-20 h-auto  text-center text-black'>
             <div className='ml-3 flex gap-2 mt-7 font-semibold text-xl'>
             <h1 className='' key={index}>{items.amount}</h1>
             <h1>₼</h1>
             </div>
</div>

</div>
        
                <hr className={styles.line} />
              
  </div>


                     ))}
                     </div>

<div className='flex justify-end gap-32 mt-5 mr-6'>
  <div>
    <h1 className=' text-xl font-semibold'>Total:</h1>
  </div>
  <div>
    <h1 className='text-xl font-semibold'>{basketAmount}</h1>
  </div>
  
</div>

<div className='flex justify-end mr-5 mt-4'>
<div>
<ProductsCard />
</div>
<button className=' bg-clientButtonGreen w-64 h-12 rounded-lg font-semibold text-xl '>Checkout</button>
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
