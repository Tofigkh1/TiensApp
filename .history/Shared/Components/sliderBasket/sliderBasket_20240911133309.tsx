import { useEffect, useRef, useState } from 'react';
import styles from './Slider.module.css';
import Image from 'next/image';
import shoppingBag from '../../../public/shopping-bag.png';
import emptyBag from '../../../public/Emptybasket (1).png';
import closedBag from '../../../public/left-chevron.png';
import miniBasket from '../../../public/cart.png';
import DeleteSvg from '../../../../public/delete.png'; // Silme ikonunu burada tanımladık
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../Redux/Store/store';
import { GetBasket } from '../../../Services';
import { deleteFromBasket, fetchBasket } from '../../Redux/Featuries/basketSlice/basketSlice.tsx';
import { useRouter } from 'next/router';

const BasketMenu = () => {
  const dispatch = useDispatch<AppDispatch>();
  const basket = useSelector((state: RootState) => state.basket);
  const basketCount = basket?.data?.total_count;
  const basketAmount = basket?.data?.total_amount;
  const basketItems = basket?.data?.items || [];
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Menü dışına tıklanınca menünün kapanmasını sağlayan fonksiyon
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sepeti güncellemek için çağırdığımız fonksiyon
  useEffect(() => {
    dispatch(fetchBasket());
  }, [dispatch]);

  // Sepetten ürün silme işlemi
  const handleDelete = (productId: string) => {
    dispatch(deleteFromBasket({ product_id: productId }))
      .then((action) => {
        if (action.type === deleteFromBasket.fulfilled.type) {
          dispatch(fetchBasket()); // Silindikten sonra sepeti tekrar güncelle
        } else {
          console.error('Ürün silinirken hata oluştu');
        }
      });
  };

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <button onClick={handleToggleMenu} className={styles.buyButton}>
        <div className='-z-50'>
          <Image src={shoppingBag} width={60} height={60} alt="Sepet İkonu" />
        </div>
      </button>
      <div className='text-white absolute z-50 mt-12 ml-14 bg-mainRed w-6 h-6 rounded-full pl-1.5 font-semibold'>
        {basketCount}
      </div>

      <div className={`${styles.overlay} ${isMenuOpen ? styles.overlayVisible : styles.overlayHidden}`}></div>

      <div className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : styles.menuClosed}`}>
        <div ref={menuRef} className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : styles.menuClosed}`}>

          {basketItems.length > 0 ? (
            <div>
              <div className='flex justify-between mt-4'>
                <h1 className='font-bold text-3xl text-black'>Sepet</h1>
                <button onClick={handleToggleMenu}>
                  <Image src={closedBag} width={50} height={50} alt="Kapat İkonu" />
                </button>
              </div>

              <div className={`${styles.scrollContainer}`}>
                {basketItems.map((item, index) => (
                  <div key={index} className='flex justify-around mt-10'>
                    {/* Ürün Görseli */}
                    <div className="w-36 h-auto rounded-2xl border bg-white flex">
                      <Image src={item.img_url} alt={`Ürün Görseli ${index + 1}`} width={130} height={130} />
                    </div>

                    {/* Ürün İsmi */}
                    <h1 className='font-bold text-xl text-black'>{item.name}</h1>

                    {/* Silme Butonu */}
                    <button onClick={() => handleDelete(item.id)}>
                      <Image src={closedBag} alt="Silme İkonu" width={20} height={20} />
                    </button>

                    {/* Ürün Fiyatı */}
                    <div className='bg-clientButtonGreen rounded-xl w-20 h-auto text-center text-black'>
                      <div className='ml-3 flex gap-2 font-semibold text-xl'>
                        <h1>{item.amount}</h1>
                        <h1>₼</h1>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className='flex justify-end gap-32 mt-3'>
                <h1 className='text-xl font-semibold text-black'>Toplam:</h1>
                <h1 className='text-xl font-semibold text-black'>{basketAmount}</h1>
              </div>
            </div>
          ) : (
            <div>
              <div className='ml-32'>
                <Image src={emptyBag} width={300} height={300} alt="Boş Sepet" />
              </div>
              <h1 className='text-center font-bold text-6xl text-categorycolor'>Boş Sepet</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BasketMenu;
