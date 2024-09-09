import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './Slider.module.css';
import { useEffect } from 'react';

const SliderBasket = () => {
  const swiperRef = useRef(null);

  useEffect(() => {
    const menuButton = document.querySelector('.menu-button');
    const openMenu = () => {
      if (swiperRef.current) {
        swiperRef.current.swiper.slidePrev();
      }
    };

    const swiperInstance = swiperRef.current?.swiper;

    if (swiperInstance) {
      swiperInstance.on('slideChangeTransitionStart', function () {
        if (this.activeIndex === 0) {
          menuButton?.classList.add('cross');
          menuButton?.removeEventListener('click', openMenu);
        } else {
          menuButton?.classList.remove('cross');
        }
      });

      swiperInstance.on('slideChangeTransitionEnd', function () {
        if (this.activeIndex === 1) {
          menuButton?.addEventListener('click', openMenu);
        }
      });
    }

    return () => {
      menuButton?.removeEventListener('click', openMenu);
    };
  }, []);

  return (
    <div className="swiper-container">
      <Swiper
        modules={[Navigation]}
        slidesPerView="auto"
        initialSlide={1}
        resistanceRatio={0}
        slideToClickedSlide={true}
        ref={swiperRef} // Swiper referansını kaydediyoruz
      >
        <SwiperSlide className={styles.menu}>Menu slide</SwiperSlide>
        <SwiperSlide className={styles.content}>
          <div className="menu-button">
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
          </div>
          Content slide
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SliderBasket;
