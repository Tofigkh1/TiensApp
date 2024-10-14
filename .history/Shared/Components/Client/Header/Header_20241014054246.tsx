// Header.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Swiper as SwiperType, SwiperSlide,Autoplay, Pagination, Navigation, EffectFade } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination, Navigation, EffectFade } from 'swiper'; // Use modules properly
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade'; // Optional if using fade effect
import Image from 'next/image';
import styles from './Navbar.module.css';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/Store/store';
import DoctorPhoto from '../../../../public/Doctorphoto.jpg';
import Medicine from '../../../../public/home_swiper2.jpg';
import Medicinees from '../../../../public/medicalbanner.jpg';
import Doctortb from '../../../../public/doctortb.jpg';
import ArrowRight from '../../../../public/next.png';

SwiperCore.use([Autoplay, Pagination, Navigation, EffectFade]);

export default function Header() {
  const { push } = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const progressCircle = useRef<SVGSVGElement | null>(null);
  const progressContent = useRef<HTMLSpanElement | null>(null);

  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const token = localStorage.getItem('user_info');
    setAccessToken(token);
  }, [user]);

  const onAutoplayTimeLeft = (s: SwiperType, time: number, progress: number) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty('--progress', `${1 - progress}`);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  function goAuthGetStarted() {
    push('/login-register?form=register');
  }

  return (
    <div className={styles.container}>
      <Swiper
        spaceBetween={30}
        centeredSlides
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation
        effect="fade"
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className={`${styles.mySwiper} ${styles.background}`}
      >
        <SwiperSlide style={{ height: '500px', position: 'relative' }}>
          <Image
            src={DoctorPhoto}
            alt="Doctor"
            layout="fill"
            objectFit="cover"
            style={{ objectPosition: 'center' }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Medicinees} alt="Medicine 1" layout="fill" objectFit="cover" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Medicine} alt="Medicine 2" layout="fill" objectFit="cover" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Doctortb} alt="Doctor" layout="fill" objectFit="cover" />
        </SwiperSlide>

        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>

      <div className={styles.headerBox}>
        <div className={`${styles.logoBox} flex gap-3 items-center`}>
          <div className={styles.hamburger}>
            {/* Hamburger Icon */}
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
          </div>
          <Image
            src="/Logo.png"
            alt="Logo"
            width={90}
            height={90}
            onClick={() => push('/')}
            className={styles.logo}
          />
        </div>

        {!accessToken && (
          <button onClick={goAuthGetStarted} className={styles.getStartedButton}>
            <span>Get Started</span>
            <Image src={ArrowRight} alt="Arrow" width={30} height={30} />
          </button>
        )}
      </div>
    </div>
  );
}
