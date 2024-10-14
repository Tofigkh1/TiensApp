import React, { useEffect, useRef, useState } from 'react';
import { Swiper as SwiperType, SwiperSlide, Swiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/Store/store';
import Nav from '../Nav/Nav';
import Search from '../Search/Search';
import Auth from '../Auth/Auth';
import Footer from '../Footer';
import DoctorPhoto from '../../../../public/Doctorphoto.jpg';
import Medicine from '../../../../public/home_swiper2.jpg';
import Medicinees from '../../../../public/medicalbanner.jpg';
import Doctortb from '../../../../public/doctortb.jpg';
import ArrovRight2 from '../../../../public/next.png';
import styles from './Navbar.module.css';

const Curve = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background: #7f00ff;
  clip-path: ellipse(80% 50% at 50% 0%);
`;

export default function Header() {
  const user = useSelector((state: RootState) => state.user);
  const { push } = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isMenuOpen, setMenuOpen] = useState(false); // Hamburger menü kontrolü

  const progressCircle = useRef<SVGSVGElement | null>(null);
  const progressContent = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('user_info');
    setAccessToken(token);
  }, [user]);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

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
      <div className={`${styles.header} flex items-center`}>
        {/* Logo ve Hamburger Menü */}
        <div className="flex items-center">
        <img onClick={() => push('/')} style={{ width: '90px', height: '90px' }} className={styles.logo} src="/Logo.png" alt="Logo" />
          <div
            className={`${styles.hamburger} ${isMenuOpen ? styles.open : ''}`}
            onClick={toggleMenu}
          >
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </div>
        </div>

        {/* Menü İçeriği */}
        <div className={`${styles.menu} ${isMenuOpen ? styles.show : ''}`}>
          <Nav />
        </div>

        <div className="flex gap-4 items-center">
          <Auth />
        </div>
      </div>

      {/* Swiper */}
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
        <SwiperSlide style={{ height: '600px', position: 'relative' }}>
          <Image
            src={DoctorPhoto}
            alt="Doctor"
            layout="fill"
            objectFit="cover"
            style={{ transform: 'scale(1.1)', objectPosition: 'bottom' }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Medicinees} alt="Medicine Banner" layout="fill" objectFit="cover" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Medicine} alt="Medicine" layout="fill" objectFit="cover" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Doctortb} alt="Doctor Background" layout="fill" objectFit="cover" />
        </SwiperSlide>

        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>

      {!accessToken && (
        <button onClick={() => push('/login-register?form=register')} className={styles.getStartedButton}>
          <div className={styles.textContainer}>Get Started</div>
          <div className={styles.arrowContainer}>
            <Image src={ArrovRight2} alt="Next Arrow" width={30} height={30} />
          </div>
        </button>
      )}
    </div>
  );
}
