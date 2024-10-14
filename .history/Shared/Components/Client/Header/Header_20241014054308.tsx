import React, { useEffect, useRef, useState } from 'react';
import { Swiper as SwiperType, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './Navbar.module.css';
import DoctorPhoto from '../../../../public/Doctorphoto.jpg';
import Medicine from '../../../../public/home_swiper2.jpg';
import Medicinees from '../../../../public/medicalbanner.jpg';
import Doctortb from '../../../../public/doctortb.jpg';

SwiperCore.use([Autoplay, Pagination, Navigation]); // Modülleri ekliyoruz.

export default function Header() {
  const { push } = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const progressCircle = useRef<SVGSVGElement | null>(null);
  const progressContent = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('user_info');
    setAccessToken(token);
  }, []);

  const onAutoplayTimeLeft = (s: SwiperType, time: number, progress: number) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty('--progress', `${1 - progress}`);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  return (
    <div className={styles.container}>
      <Swiper
        spaceBetween={30}
        centeredSlides
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className={`${styles.mySwiper} ${styles.background}`}
      >
        <SwiperSlide style={{ height: '500px', position: 'relative' }}>
          <Image src={DoctorPhoto} alt="Doctor" layout="fill" objectFit="cover" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Medicinees} alt="Medicine 1" layout="fill" objectFit="cover" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Medicine} alt="Medicine 2" layout="fill" objectFit="cover" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Doctortb} alt="Doctor 2" layout="fill" objectFit="cover" />
        </SwiperSlide>

        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  );
}
