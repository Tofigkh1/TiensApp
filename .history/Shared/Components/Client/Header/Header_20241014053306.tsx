// Header.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styled from 'styled-components';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/Store/store';
import Nav from '../Nav/Nav';
import Search from '../Search/Search';
import Auth from '../Auth/Auth';
import Footer from '../Footer';
import { useResize } from '../../../Hooks/useResize';
import { useModalOpen } from '../../../Hooks/useModalOpen';
import styles from './Navbar.module.css';

// Images
import DoctorPhoto from '../../../../public/Doctorphoto.jpg';
import Medicine from '../../../../public/home_swiper2.jpg';
import Medicinees from '../../../../public/medicalbanner.jpg';
import Doctortb from '../../../../public/doctortb.jpg';
import ArrowRight2 from '../../../../public/next.png';

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
  const { isOpen, onOpen, onClose } = useModalOpen();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const { isMobile } = useResize();
  const { push } = useRouter();

  const progressCircle = useRef<SVGSVGElement | null>(null);
  const progressContent = useRef<HTMLSpanElement | null>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false); // Track hamburger state

  useEffect(() => {
    const token = localStorage.getItem('user_info');
    setAccessToken(token);
  }, [user]);

  function goAuthGetStarted() {
    push('/login-register?form=register');
  }

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
      <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
        <div className={`${styles.bar} ${menuOpen ? styles.cross : ''}`}></div>
        <div className={`${styles.bar} ${menuOpen ? styles.cross : ''}`}></div>
        <div className={`${styles.bar} ${menuOpen ? styles.cross : ''}`}></div>
      </div>

      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className={`${styles.mySwiper} ${styles.background}`}
      >
        <SwiperSlide style={{ height: isMobile ? '600px' : '500px', position: 'relative' }}>
          <div style={{ height: '670px', width: '100%', position: 'relative' }}>
            <Image
              src={DoctorPhoto}
              alt="Doctor"
              layout="fill"
              objectFit="cover"
              style={isMobile ? { transform: 'scale(1.1)', objectPosition: 'bottom' } : {}}
            />
          </div>
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

      <div className={styles.bgimage}>
        <section className={`${styles.header_box} ${isOpen ? styles.shadow : ''}`}>
          <div className={`${styles.logo_box} flex gap-3 items-center`}>
            <button className={styles.button}></button>
            <div className={styles.cursor}>
              <img
                onClick={() => push('/')}
                style={{ width: '90px', height: '90px' }}
                className={styles.logo}
                src="/Logo.png"
                alt="Logo"
              />
            </div>
          </div>

          {/* Toggle Navigation */}
          <div className={`${styles.menu_box} ${menuOpen ? styles.show : styles.hide}`}>
            <Nav />
          </div>

          <div className="flex flex-row gap-4 items-center">
            <div className={styles.mobile_hide}>
              <Auth />
            </div>
          </div>
        </section>

        <div className={styles.headerText}>
          <h1>Doctor Tibet ilə</h1>
          <h1>Sağlam gələcək.</h1>
        </div>

        <div className={styles.headerSmallText}>
          <h1>Həkiminizin sağlamlığınız üçün təyin etdiyi bütün dərmanlar bizdə</h1>
          <h1>biz bunu sizə çatdıra bilərik.</h1>
        </div>

        <Search />

        {!accessToken && (
          <button onClick={goAuthGetStarted} className={styles.getStartedButton}>
            <div className={styles.textContainer}>Get Started</div>
            <div className={styles.arrowContainer}>
              <Image alt="Next arrow icon" src={ArrowRight2} width={30} height={30} className={styles.arrowImage} />
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
