import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './Slider.module.css';

const SliderBasket = () => {
  return (
    <Swiper
      modules={[]}
      slidesPerView="auto"
      initialSlide={1}
      resistanceRatio={0}
      slideToClickedSlide={true}
      onSlideChange={(swiper) => {
        const menuButton = document.querySelector('.menu-button');
        if (swiper.activeIndex === 0) {
          menuButton?.classList.add('cross');
          menuButton?.removeEventListener('click', () => swiper.slidePrev());
        } else {
          menuButton?.classList.remove('cross');
        }
      }}
      onTransitionEnd={(swiper) => {
        const menuButton = document.querySelector('.menu-button');
        if (swiper.activeIndex === 1) {
          menuButton?.addEventListener('click', () => swiper.slidePrev());
        }
      }}
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
  );
};

export default SliderBasket;
