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


      </>
    )

}