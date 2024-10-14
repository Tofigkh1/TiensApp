import React, { useEffect, useRef, useState } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
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
import Footer from '../Footer';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/Store/store';
import DoctorPhoto from '../../../../public/Doctorphoto.jpg';
import Bacground from '../../../../public/homeBacground.svg';
import Medicine from "../../../../public/home_swiper2.jpg";
import Medicinees from "../../../../public/medicalbanner.jpg";
import Doctortb from "../../../../public/doctortb.jpg";
import ArrovRight2 from '../../../../public/next.png';

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
  let user = useSelector((state: RootState) => state.user);
  let { isOpen, onOpen, onClose } = useModalOpen();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  let { isMobile } = useResize();
  let { push } = useRouter();
  

  useEffect(() => {
    const token = localStorage.getItem('user_info');
    setAccessToken(token);
  }, [user]);

  function goAuthGetStarted() {
    push('/login-register?form=register');
  }

  const progressCircle = useRef<SVGSVGElement | null>(null);
  const progressContent = useRef<HTMLSpanElement | null>(null);

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
     {/* Swiper Slider */}
     <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className={`${styles.mySwiper} ${styles.background}`}
      >
        <SwiperSlide style={{ height: '500px', position: 'relative' }}>
          <Image src={DoctorPhoto} alt="Doctor" layout="fill" objectFit="cover" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Medicinees} alt="Medicine Banner" layout="fill" objectFit="cover" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Medicine} alt="Medicine" layout="fill" objectFit="cover" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Doctortb} alt="Doctor Banner" layout="fill" objectFit="cover" />
        </SwiperSlide>
      </Swiper>

      {/* Hamburger Menu Button */}
      <div
        className={`${styles.hamburgerMenu} ${isMenuOpen ? styles.hamburgerOpen : ''}`}
        onClick={handleHamburgerClick}
      >
        <div className={`${styles.hamburgerBar} ${styles.bar1}`}></div>
        <div className={`${styles.hamburgerBar} ${styles.bar2}`}></div>
        <div className={`${styles.hamburgerBar} ${styles.bar3}`}></div>
      </div>

      {/* Logo */}
      <div className={styles.logoBox}>
        <Image
          onClick={() => push('/')}
          src="/Logo.png"
          alt="Logo"
          width={90}
          height={90}
          className={styles.logo}
        />
      </div>

        <div>

          
          <div className={styles.headerText}>
            {/* <h1 className=''>We can get your Drug</h1>
            <h1>Prescriptions to You</h1> */}
                 <h1 className=''>Doctor Tibet ilə</h1>
                 <h1>Sağlam gələcək.</h1>
          </div>



          <div className={styles.headerSmallText}>
            <h1 className=''>Həkiminizin sağlamlığınız üçün təyin etdiyi bütün dərmanlar bizdə</h1>
            <h1>biz bunu sizə çatdıra bilərik.</h1>
          </div>
        </div>

        <Search />

        {!accessToken && (

          
          <button onClick={goAuthGetStarted} className={styles.getStartedButton}>
            <div className={styles.textContainer}>Get Started</div>
            <div className={styles.arrowContainer}>
              <Image alt="Next arrow icon" src={ArrovRight2} width={30} height={30} className={styles.arrowImage} />
            </div>
          </button>


        )}
      </div>
    </div>
  );
}
