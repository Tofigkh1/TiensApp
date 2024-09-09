// components/Slider.js
import { useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/swiper-bundle.min.css';
import styles from './Slider.module.css';

const SliderBasket = () => {
  useEffect(() => {
    const menuButton = document.querySelector('.menu-button');
    const openMenu = () => {
      swiper.slidePrev();
    };

    const swiper = new Swiper('.swiper', {
      modules: [Navigation],
      slidesPerView: 'auto',
      initialSlide: 1,
      resistanceRatio: 0,
      slideToClickedSlide: true,
      on: {
        slideChangeTransitionStart: function () {
          if (this.activeIndex === 0) {
            menuButton.classList.add('cross');
            menuButton.removeEventListener('click', openMenu, true);
          } else {
            menuButton.classList.remove('cross');
          }
        },
        slideChangeTransitionEnd: function () {
          if (this.activeIndex === 1) {
            menuButton.addEventListener('click', openMenu, true);
          }
        },
      },
    });
  }, []);

  return (
    <div className="swiper">
      <div className="swiper-wrapper">
        <div className={`${styles.menu} swiper-slide`}>Menu slide</div>
        <div className={`${styles.content} swiper-slide`}>
          <div className="menu-button">
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
          </div>
          Content slide
        </div>
      </div>
    </div>
  );
};

export default SliderBasket;
