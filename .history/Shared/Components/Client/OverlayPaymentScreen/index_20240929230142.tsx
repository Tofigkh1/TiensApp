import { useRef, useState } from 'react';
import styles from './overlayPayment.module.css'
import Image from 'next/image';
import closedBag from '../../../public/left-chevron.png';



const OverlayPayment = () =>{
    const menuRef = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    const handleToggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
      };
    

    return(
        <>

        <div>

    
        <button onClick={handleToggleMenu} className={styles.buyButton}>
          <div className=' -z-50'>
            <Image src={shoppingBag} width={60} height={60} alt="Basket Icon"/>
          </div>
        </button>


        <div className={`${styles.overlay} ${isMenuOpen ? styles.overlayVisible : styles.overlayHidden}`}></div>
  
        <div className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : styles.menuClosed}`}></div>
          <div ref={menuRef} className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : styles.menuClosed}`}></div>
       
          
              
  
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

                </div>
      </>
    )

}