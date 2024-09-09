import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ButtonHeader from '../Button/buttonHeader';
import styles from './auth.module.css';
import { useResize } from '../../../Hooks/useResize';
import { clearUser } from '../../../Redux/Featuries/User/userSlice';
import { getNameFirstLetter } from '../../../Utils/getNameFirstLetter';
import { AppDispatch, RootState } from '../../../Redux/Store/store';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from '@chakra-ui/react';

export default function Auth() {
    const { push } = useRouter();
    const [active, setActive] = useState(false);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loading, setLoading] = useState(false);  // loading state

    const dispatch: AppDispatch = useDispatch();
    const { isMobile } = useResize();
    const user = useSelector((state: RootState) => state.user);
    const nameChar = user.fullname ? getNameFirstLetter(user.fullname) : '';

    function handleClick() {
        setActive(!active);
    }
    function goAuth() {
        push('/login-register');
    }

    useEffect(() => {
        const token = localStorage.getItem('user_info');
        setAccessToken(token);
    }, [user]);

    const handleLogout = () => {
        setLoading(true);  // Loading state'i true yapıyoruz
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_info');
        dispatch(clearUser());
        setAccessToken(null);
        setTimeout(() => {
            window.location.reload();  // 500ms sonra sayfayı yeniliyoruz
        }, 500);  // Yenileme öncesi bir gecikme ekledik
    };

    return (
        <>
            {accessToken && !loading ? (  // Loading state kontrol ediliyor
                <div className='flex items-center justify-end gap-3'>
                    <Menu 
                        onOpen={() => setIsMenuOpen(true)}
                        onClose={() => setIsMenuOpen(false)}
                    >
                        <MenuButton 
                            onClick={handleClick} 
                            as={Button} 
                            colorScheme="teal"
                            borderRadius="full"
                            w="14"
                            h="14"
                            className={`flex justify-center items-center ${styles.user_btn} ${styles.auth_btn}`}
                            style={{ backgroundColor: isMenuOpen ? '#b0f4de' : '#26d6a1', color: 'white' }}
                        >
                            {nameChar}
                        </MenuButton>
                        <span className={styles.user_name}>{isMobile && user.fullname}</span>
                        <MenuList style={{ backgroundColor: '#26d6a1', color: 'white' }}>
                            {!isMobile && (
                                <ul>
                                    <MenuGroup>
                                        <MenuItem 
                                            sx={{ 
                                                color: 'white', 
                                                backgroundColor: '#26d6a1', 
                                                _hover: { backgroundColor: '#b0f4de' }, 
                                                transition: 'background-color 0.6s' 
                                            }} 
                                            onClick={() => push('/user/profile')}
                                        >
                                            Your Profile
                                        </MenuItem>
                                        <MenuItem 
                                            sx={{ 
                                                color: 'white', 
                                                backgroundColor: '#26d6a1', 
                                                _hover: { backgroundColor: '#b0f4de' }, 
                                                transition: 'background-color 0.6s' 
                                            }} 
                                            onClick={() => push('/user/basket')}
                                        >
                                            Your Basket
                                        </MenuItem>
                                        <MenuItem 
                                            sx={{ 
                                                color: 'white', 
                                                backgroundColor: '#26d6a1', 
                                                _hover: { backgroundColor: '#b0f4de' }, 
                                                transition: 'background-color 0.6s' 
                                            }} 
                                            onClick={() => push('/user/orders')}
                                        >
                                            Your Orders
                                        </MenuItem>
                                        <MenuItem 
                                            sx={{ 
                                                color: 'white', 
                                                backgroundColor: '#26d6a1', 
                                                _hover: { backgroundColor: '#b0f4de' },
                                                transition: 'background-color 0.6s'  
                                            }} 
                                            onClick={() => push('/user/checkout')}
                                        >
                                            Checkout
                                        </MenuItem>
                                    </MenuGroup>
                                    <MenuDivider />
                                    <MenuItem 
                                        sx={{ 
                                            color: 'white', 
                                            backgroundColor: '#26d6a1', 
                                            _hover: { backgroundColor: '#b0f4de' }, 
                                            transition: 'background-color 0.6s' 
                                        }} 
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </MenuItem>
                                </ul>
                            )}
                        </MenuList>
                    </Menu>
                    <span className={styles.user_name}>{isMobile && user.fullname}</span>
                </div>
            ) : (
                !loading && <ButtonHeader addButtonFun={goAuth} typeButton={true} title='Sign Up' btnSize={'sm'} addButton={false} /> // loading false ise buton gösterilir
            )}
        </>
    );
}
