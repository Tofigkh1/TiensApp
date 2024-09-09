
import { useEffect, useRef, useState } from 'react';
import styles from './'

const BasketMenu = () => {

  
const [isMenuOpen, setIsMenuOpen] = useState(false); // Menü açık mı kapalı mı
const menuRef = useRef<HTMLDivElement>(null); // Menü referansı

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false); // Menü dışına tıklanınca kapanır
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);

const handleToggleMenu = () => {
  setIsMenuOpen(!isMenuOpen); // Menü aç/kapat
};


return (<>

  <button onClick={handleToggleMenu} className={styles.buyButton}>
  add to basket
</button>
  <div className={`${styles.overlay} ${isMenuOpen ? styles.overlayVisible : styles.overlayHidden}`}></div>


  <div className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : styles.menuClosed}`}>
              <div ref={menuRef} className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : styles.menuClosed}`}>
          <h1 className="text-white text-2xl p-4">This is a sliding menu!</h1>
     
          <button onClick={handleToggleMenu} className={styles.buyButton}>
              add to basket
            </button>
        </div>
  </div>

  </>)

};

export default BasketMenu;
