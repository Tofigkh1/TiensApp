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
import Medicine from "../../../../public/Medicine.svg";
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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="logo_box flex gap-3 items-center w-[70px] h-[70px] sm:w-[90px] sm:h-[90px]">
      <button className="button"></button>
      <div className="cursor">
        <img
          onClick={() => push('/')}
          className="logo w-[70px] h-[70px] sm:w-[90px] sm:h-[90px]"
          src="/Logo.png"
          alt="Logo"
        />
      </div>
    </div>
  
    <div className={`menu_box ${isMobile ? (isOpen ? 'block' : 'hidden') : 'block'}`}>
      <Nav />
    </div>
  
    <div className="flex flex-row gap-4 items-center">
      <div className="hidden sm:block">
        <Auth />
      </div>
    </div>
  
    <div className="bgimage">
      <section className={`header_box ${isOpen ? 'shadow-lg' : ''} flex flex-col sm:flex-row`}>
        <div className="headerText">
          <h1 className="text-xl sm:text-4xl font-bold">We can get your Drug</h1>
          <h1 className="text-xl sm:text-4xl font-bold">Prescriptions to You</h1>
        </div>
        <div className="headerSmallText">
          <h1 className="text-sm sm:text-lg">
            We have all the drugs your doctor prescribed for your health
          </h1>
          <h1 className="text-sm sm:text-lg">and what’s more, we can get it to you.</h1>
        </div>
      </section>
  
      <Search />
  
      {!accessToken && (
        <button
          onClick={goAuthGetStarted}
          className="getStartedButton text-sm sm:text-lg py-2 px-4 sm:py-4 sm:px-8 bg-blue-500 text-white rounded-lg flex items-center"
        >
          <div className="textContainer">Get Started</div>
          <div className="arrowContainer w-5 h-5 sm:w-8 sm:h-8 ml-2">
            <Image alt="Next arrow icon" src={ArrovRight2} width={30} height={30} className="arrowImage" />
          </div>
        </button>
      )}
    </div>
  </div>
  
  );
}
