




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
                <div className=' flex ml-28 mt-3 text-black'>
                  
                  <div>
                    <Image src={miniBasket} width={30} height={30}/>
                  </div>
                  
                  <h1 className=' ml-2 text-xl'>
                    Total products:
                  </h1>
                  <h1 className=' ml-2 text-xl'>{basketCount}</h1>
                </div>
  
  
               
                   <div>
                   <h1>Time left: {formatTime(remainingTime)}</h1> {/* Dijital geri sayım */}
              <div className={styles.progressContainer}>
                <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
              </div>
              </div>
  
  
                <div className={`${styles.scrollContainer}`}>
  
  
                  {basketItems.map((items, index) => (
                    <div key={index} className='flex flex-col justify-around'>
                      <div className='flex justify-around mt-10'>
                        <div className=" w-36 h-auto rounded-2xl   bg-white flex">
                          <div>
                            <Image src={items.img_url} alt={`Product Image ${index + 1}`} width={130} height={130} />
                          </div>
                        </div>
                        <h1 className=' font-bold text-xl mr-20 text-black'>{items.name}</h1>
  
                     
  
                      <div className=' flex flex-col'>
  
                        <div>
                        <h1 className='text-black'>{items.count}</h1>
                        </div>
  
                        <div className=' mt-5'>
                        <button key={index} onClick={() => handleDeleteFromBasket(items.id)} className="bg-red-500 p-2 rounded-full">
                          <Image src={minus} alt="Delete product" width={35} height={35} />
                        </button>
                        </div>
  
                        <div className=' mt-5'>
                        <button key={index} onClick={() => handleAddFromBasket(items.id)} className="bg-red-500 p-2 rounded-full">
                          <Image src={plus} alt="Delete product" width={35} height={35} />
                        </button>
                        </div>
                      
                      </div>
  
                        <div className=' right-0 bg-clientButtonGreen rounded-xl w-24 h-auto text-center text-black'>
  
                        
  
                          <div className='ml-3 flex gap-2 mt-7 font-semibold text-xl text-center'>
                            <h1>{items.amount}</h1>
                            <h1>₼</h1>
                          </div>
                        </div>
  
                  
                  
                      </div>
                      <hr className={styles.line} />
                    </div>
                  ))}
  
                </div>
  
                <div className='flex justify-end gap-32 mt-3 mr-6 text-black'>
  
                <div>
      
              
      {basketId && (
  
        <div>
  <button  className=' flex gap-5' onClick={() => handleDeleteAllBasket(basketId)}>
          <Image width={30} height={30} src={trash}/>
          Clear Cart
        </button>
        </div>
    
      )}
  
  
    </div>
  
                  <div>
                    <h1 className=' text-xl font-semibold text-black'>Total:</h1>
                  </div>
                  <div>
                    <h1 className='text-xl font-semibold text-black'>{basketAmount}₼</h1>
                  </div>
                </div>
                <div className='flex justify-end mr-5 mt-4'>
                  <button onClick={()=>push('/user/checkout')} className=' bg-clientButtonGreen w-64 h-12 rounded-lg font-semibold text-xl'>Checkout</button>
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
    )

}