import styles from './overlayPayment.module.css'




const OverlayPayment = () =>{



    return(
        <>
    
       
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