import React from 'react'

export default function index() {
  return (
   <>
     <Container>
        <Header>
          <div className={styles.cursor}>
            <img
              onClick={() => push('/')}
              style={{ width: '90px', height: '90px' }}
              className={styles.logo}
              src="/Logo.png"
              alt="Logo"
            />
          </div>
          <Nav />

          <div className="flex gap-10 z-50">
                        <BasketMenu/>
                        <Auth/>
                        </div>
        </Header>


        
      </Container>

      <Categories/>

   </>
  )
}
