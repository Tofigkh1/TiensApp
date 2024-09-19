import React, { useEffect, useState } from 'react'
import Categories from '../../../Shared/Components/Client/headerCategory'
import withClientAuth from '../../../Shared/HOC/withClienAuth';
import styleds from 'styled-components';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Nav from '../../../Shared/Components/Client/Nav/Nav';
import BasketMenu from '../../../Shared/Components/sliderBasket/sliderBasket';
import Auth from '../../../Shared/Components/Client/Auth/Auth';
import styles from './checkout.module.css';
import Navbar from '../../../Shared/Components/Client/User-Layout';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../Shared/Redux/Store/store';
import Sidebar, { SidebarItem } from '../../../Shared/Components/Client/SideBarMenu';
import { ChevronFirst, ChevronLast } from 'lucide-react';
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState } from "react";

// Sidebar context oluşturuldu
const SidebarContext = createContext();

// Styled Components
const Container = styleds.div`
  font-family: Arial, sans-serif;
`;

const Header = styleds.header`
  background: linear-gradient(135deg, #7f00ff, #e100ff);
  padding: 20px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MainSection = styleds.section`
  position: relative;
  display: flex;
  padding: 20px;
  justify-content: space-between;
  align-items: center;

`;

const Curve = styleds.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 99%;
  background: #7f00ff;
  clip-path: ellipse(80% 50% at 50% 0%);
`;

const theme = createTheme();
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    width: '16px', // Boyutu artırdık
    height: '16px', // Boyutu artırdık
    borderRadius: '50%',
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '16px',
      height: '16px',
      borderRadius: '20px',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const StyledBadge2 = styled(Badge)`
  & .MuiBadge-badge {
    background-color: red;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.palette.background.paper};
  }
  @keyframes ripple {
    0% {
      transform: scale(.8);
      opacity: 1;
    }
    100% {
      transform: scale(2.4);
      opacity: 0;
    }
  }
`;

const LargeAvatar = styled(Avatar)({
  width: 100,
  height: 100,
});

export default function index() {
  const { push } = useRouter();
  const [downloadURL, setDownloadURL] = useState(''); 
  const [loading, setLoading] = useState(false); 

  const [mobile, setmobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  console.log("reduxUser",user);


  useEffect(() => {
  

    if (window.innerWidth < 800) {
      setmobile(true);
    } else {
      setmobile(false);
    }
    const token = localStorage.getItem('access_token');
    const userInfo = localStorage.getItem('user_info');
    if (!token) {
  
      push('/login-register');
    }
  

    if (token && userInfo) {
      setIsLoggedIn(true);
    }
   


 
  }, [mobile]);


  return (
   <>
     <Container>
        <Header>
          <div className={styles.cursor}>
            <img
              onClick={() => push('/')}
              style={{ width: '90px', height: '90px' }}
              className={styles.logo}
              src="/Logo.png"
              alt="Logo"
            />
          </div>
          <Nav />

          <div className="flex gap-10 z-50">
                        <BasketMenu/>
                        <Auth/>
                        </div>
        </Header>


        
      </Container>

      <Categories/>

      {/* <div className={mobile ? 'hidden' : ' w-80'}>
            <Navbar active={4} />
          </div> */}



export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-width duration-300 ${
              expanded ? "w-32" : "w-0 hidden"
            }`}
            alt=""
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        {/* SidebarContext.Provider ile expanded değerini sağlıyoruz */}
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`flex justify-between items-center transition-width duration-300 ${
              expanded ? "w-52 ml-3" : "w-0 hidden"
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-gray-600">johndoe@gmail.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}




   </>
  )
}



// SidebarItem bileşeni
export function SidebarItem({ icon, text, active, alert }) {
  // SidebarContext'ten 'expanded' değerini alıyoruz
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
      `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-width duration-300 ${
          expanded ? "w-52 ml-3" : "w-0 hidden"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
        `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
