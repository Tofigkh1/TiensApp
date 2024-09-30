import { useRef, useState } from 'react';
import styles from './overlayPayment.module.css'
import Image from 'next/image';
import closedBag from '../../../../public/left-chevron.png';
import shoppingBag from '../../../../public/shopping-bag.png';


const OverlayPayment = () =>{
    const menuRef = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(true);


    const handleToggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
      };
    

    return(
        <>

        <div className=' '>

    
         
        <div className='w-7/12 h-80 bg-white absolute z-50' style={{
                    left: '50%',          // Sol kenarı %50
                    top: '50%',           // Üst kenarı %50
                    transform: 'translate(-50%, -50%)', // Kendini %50 sola ve %50 yukarı kaydır
                }}>
                    <h1 className='text-center'></h1>

                    <button>click</button>
                </div>

        <div className={`${styles.overlay} ${isMenuOpen ? styles.overlayVisible : styles.overlayHidden}`}></div>
  
        <div className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : styles.menuClosed}`}></div>
          <div ref={menuRef} className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : styles.menuClosed}`}></div>
       
        
              
  

                </div>
      </>
    )

}

export default OverlayPayment