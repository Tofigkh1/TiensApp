import styles from './overlayPayment.module.css'




const OverlayPayment = () =>{



    return(
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
       
              <div>
              
  
           
                  
                </div> 


      </>
    )

}