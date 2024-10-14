import React, { useEffect, useRef, useState } from 'react';
import { Swiper as SwiperType, SwiperSlide } from 'swiper/react';
import { Swiper } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styles from './Navbar.module.css';
import Nav from '../Nav/Nav';
import { useResize } from '../../../Hooks/useResize';
import { useModalOpen } from '../../../Hooks/useModalOpen';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Search from '../Search/Search';
import Auth from '../Auth/Auth';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/Store/store';
import DoctorPhoto from '../../../../public/Doctorphoto.jpg';
import Medicine from '../../../../public/home_swiper2.jpg';
import Medicinees from '../../../../public/medicalbanner.jpg';
import Doctortb from '../../../../public/doctortb.jpg';
import ArrovRight2 from '../../../../public/next.png';

export default function Header() {
  const user = useSelector((state: RootState) => state.user);
  const { isOpen, onOpen, onClose } = useModalOpen();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const { isMobile } = useResize();
  const { push } = useRouter();
  const progressCircle = useRef<SVGSVGElement | null>(null);
  const progressContent = useRef<HTMLSpanElement | null>(null);
  const menuButtonRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className={styles.container}>
      {/* Hamburger Menu + Logo Section */}
      <div className={styles.header}>
        <div ref={menuButtonRef} className={`${styles.menuButton} ${menuOpen ? styles.open : ''}`} onClick={toggleMenu}>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
        </div>
        <div className={styles.logoContainer}>
          <img
            onClick={() => push('/')}
            src="/Logo.png"
            alt="Logo"
            className={styles.logo}
          />
        </div>
      </div>

      {/* Swiper Component */}
      <Swiper
        ref={swiperRef}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className={`${styles.mySwiper} ${styles.background}`}
      >
        <SwiperSlide style={{ height: isMobile ? '600px' : '500px', position: 'relative' }}>
          <Image src={DoctorPhoto} alt="Doctor" layout="fill" objectFit="cover" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Medicinees} alt="Image 1" layout="fill" objectFit="cover" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Medicine} alt="Image 2" layout="fill" objectFit="cover" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Doctortb} alt="Image 3" layout="fill" objectFit="cover" />
        </SwiperSlide>

        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>

      {/* Navbar and Auth Section */}
      <div className={`${styles.menuBox} ${menuOpen ? styles.show : styles.hide}`}>
        <Nav />
      </div>

      <div className={styles.authContainer}>
        {accessToken ? <Auth /> : (
          <button onClick={() => push('/login-register?form=register')} className={styles.getStartedButton}>
            <div className={styles.textContainer}>Get Started</div>
            <div className={styles.arrowContainer}>
              <Image alt="Next arrow icon" src={ArrovRight2} width={30} height={30} />
            </div>
          </button>
        )}
      </div>

      <Search />
    </div>
  );
}
