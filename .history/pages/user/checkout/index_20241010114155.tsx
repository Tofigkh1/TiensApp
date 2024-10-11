import React, { useEffect, useState, useContext, createContext, useReducer } from 'react';
import Categories from '../../../Shared/Components/Client/headerCategory';
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
import userProfileIcon from '../../../public/userProfileIcon.svg';
import basket from '../../../public/basketicon.png';
import logoutSvg from '../../../public/logout (1).png';
import LogoutIcon from '../../../public/logout (2).png';
import LogoutIcon2 from '../../../public/exit.png';
import checkoutSvg from '../../../public/checkout.png';
import basketDef from '../../../public/basketDef.png';
import profileSettings from '../../../public/profileSettings.png';
import orderSvg from '../../../public/order.png';
import userProfileDef from '../../../public/user.png';
import shoppingBag from '../../../public/shopping-bag.png';
import ShoppingCheck from '../../../public/ShoppingCheck3.png';
import YourOrders from '../../../public/fulfillment.png';
import { LifeBuoy, Receipt, Boxes, Package, UserCircle, BarChart3, LayoutDashboard, Settings } from 'lucide-react';
import { MoreVertical, ChevronLast, ChevronFirst } from 'lucide-react';
import Sidebar, { SidebarItem } from '../../../Shared/Components/Client/SideBarMenu';
import { AppDispatch, RootState } from '../../../Shared/Redux/Store/store';
import { clearUser, setUser, UserState } from '../../../Shared/Redux/Featuries/User/userSlice';
import { useResize } from '../../../Shared/Hooks/useResize';
import { useToast } from '@chakra-ui/react';
import Image from 'next/image';
import WhatsAppButton from '../../../Shared/Components/Client/whatsappButton';
import TelegramButton from '../../../Shared/Components/Client/telegramButton';
import minus from '../../../public/minus-circle.png';
import plus from '../../../public/plus (3).png';
import { addToBasket, BasketItem, deleteFromBasket, fetchBasket } from '../../../Shared/Redux/Featuries/basketSlice/basketSlice';
import ProductPageCount from '../../../Shared/Components/Client/productPageCount';
import SimpleForm from '../../../Shared/Components/Client/CheckoutForm';
import OverlayPayment from '../../../Shared/Components/Client/OverlayPaymentScreen';
import { OrderPostDataType } from '../../../Shared/Interface';

const SidebarContext = createContext<any>(null);

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
    width: '16px',
    height: '16px',
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

const initialState = {
  address: '',
  phoneNumber: '+994',
  error: '',
  formatMessage: '',
  errorNumber: '',
  formatNumber: '',
};

type OrderState = {
  id: string;
  created: number | string;
  delivery_address: string | number;
  contact: number;
  payment_method: string;
};

type BasketProps = {
  productCount?: number;
  data_list?: string[];
  size: string;
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_ADDRESS':
      return { ...state, address: action.payload };
    case 'SET_PHONE_NUMBER':
      return { ...state, phoneNumber: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_FORMAT_MESSAGE':
      return { ...state, formatMessage: action.payload };
    case 'SET_ERROR_NUMBER':
      return { ...state, errorNumber: action.payload };
    case 'SET_FORMAT_NUMBER':
      return { ...state, formatNumber: action.payload };
    default:
      return state;
  }
};

const addressRegex = /^[a-zA-Z0-9\s,'-]*$/;
const azerbaijanPhoneRegex = /^\+994-(50|51|55|60|70|77|99)-\d{3}-\d{2}-\d{2}$/;

const formatPhoneNumber = (value: any) => {
  const digits = value.replace(/[^\d]/g, '').substring(3);
  let formatted = '+994';

  if (digits.length > 2) {
    formatted += '-' + digits.substring(0, 2);
  } else {
    formatted += '-' + digits;
  }
  if (digits.length > 5) {
    formatted += '-' + digits.substring(2, 5);
  } else if (digits.length > 2) {
    formatted += '-' + digits.substring(2);
  }
  if (digits.length > 7) {
    formatted += '-' + digits.substring(5, 7);
  } else if (digits.length > 5) {
    formatted += '-' + digits.substring(5);
  }
  if (digits.length > 9) {
    formatted += '-' + digits.substring(7, 9);
  } else if (digits.length > 7) {
    formatted += '-' + digits.substring(7);
  }

  return formatted;
};

type Basket = {
  data: {
    items: Array<{
      id: number | string;
      name: string;
      ageSize?: string;
      price: number;
    }>;
    total_count: number;
    total_amount: number;
  };
};

export default function Index() {
  const dispatchh: AppDispatch = useDispatch();

  const basket: Basket = useSelector((state: RootState) => state.basket);
  const user = useSelector((state: RootState) => state.user);

  const basketItems = basket?.data?.items || [];

  const basketCountt = basketItems.map((item) => {
    if (item.ageSize === '1') {
      return 30;
    } else if (item.ageSize === '2') {
      return 60;
    } else {
      return 0;
    }
  });

  const { isMobile } = useResize();
  const toast = useToast();

  const [state, dispatch] = useReducer(reducer, initialState);

  const dispatchw: AppDispatch = useDispatch();

  useEffect(() => {
    const userStr = localStorage.getItem('user_info');
    if (userStr) {
      try {
        const user: UserState = JSON.parse(userStr);
        dispatchw(setUser(user));
      } catch (error) {
        console.error('Error parsing user info:', error);
      }
    }
  }, []);

  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [paymentScreen, setPaymentScreen] = useState(false);
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState<number>(4);
  const { push } = useRouter();
  const [downloadURL, setDownloadURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRectVisiblee, setIsRectVisiblee] = useState(false);
  const [isFullView, setIsFullView] = useState(false);
  const [orderPosted, setOrderPosted] = useState<OrderState[]>([]);
  const [ordersData, setOrdersData] = useState<OrderState[]>([]);

  const totalCount = basket?.data?.total_count || 0;

  return (
    <Container>
      <Header>
        <h1>Checkout</h1>
        <div>
          <Nav />
        </div>
      </Header>

      <MainSection>
        {/* Checkout form and details go here */}
      </MainSection>
    </Container>
  );
}
