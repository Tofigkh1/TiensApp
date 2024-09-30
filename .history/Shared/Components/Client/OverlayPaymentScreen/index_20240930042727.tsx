import { useRef, useState } from 'react';
import styles from './overlayPayment.module.css'
import Image from 'next/image';
import closedBag from '../../../../public/left-chevron.png';
import shoppingBag from '../../../../public/shopping-bag.png';


const OverlayPayment = () =>{
    const menuRef = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(true);


    // const handleToggleMenu = () => {
    //     setIsMenuOpen(!isMenuOpen);
    //   };
    

    return(
        <>

        <div>

    
       


        <div className={`${styles.overlay} ${isMenuOpen ? styles.overlayVisible : styles.overlayHidden}`}></div>
  
        <div className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : styles.menuClosed}`}></div>
          <div ref={menuRef} className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : styles.menuClosed}`}></div>
       
          
              
  
                <div className=' flex'>
               
                  
                </div> 

                </div>
      </>
    )

}

export default OverlayPayment