import React, { useState } from "react"
import ThemeToggler from "../../@/components/my-components/theme/theme-toggler"
import { useResize } from "../../Shared/Hooks/useResize";
import TryInfoUser from "../../Shared/Components/Client/tryInfoUserComponent";
import HamburgerBtn from "../../Shared/Components/Client/hamburgerButton";
import Nav from "../../Shared/Components/Client/Nav/Nav";
import BasketMenu from "../../Shared/Components/sliderBasket/sliderBasket";
import Auth from "../../Shared/Components/Client/Auth/Auth";
import styles from "./aboutUs.module.css"
import styled from "styled-components";
import { createTheme } from "@mui/material";
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { motion } from "framer-motion";
import { Box, Tag, VStack, SimpleGrid, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Image from "next/image";


const Container = styled.div`
  background: linear-gradient(135deg, #7f00ff, #e100ff);
  font-family: Arial, sans-serif;
`;

const Header = styled.header`
  background: linear-gradient(135deg, #7f00ff, #e100ff);
  padding: 10px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MainSection = styled.section`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Curve = styled.div`
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
      transform: 'scale(0.8)',
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
      transform: scale(0.8);
      opacity: 1;
    }
    100% {
      transform: scale(2.4),
      opacity: 0;
    }
  }
`;

const LargeAvatar = styled(Avatar)({
  width: 100,
  height: 100,
});

const StyledSwiperSlide = styled(SwiperSlide)`
  transition: background-color 0.3s ease; /* Hover efekti için geçiş efekti */
  
  &:hover {
    background-color: green; /* Hover efektinde arka plan rengi yeşil olacak */
  }
`;


const MotionVStack = motion(VStack); 

function AboutUs(){
  let { isMobile } = useResize();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const { push } = useRouter();


  
  function onDetail(id: number) {
    router.push(`/medicines/${id}`);
  }

return (


    <div>

{!isMobile &&
<div>
<Container>
  <div className="  ml-72">
        <TryInfoUser/>
        </div>
  <div>
      {isMobile && (
      <div className={styles.hambrBtn}>
        <HamburgerBtn />
      </div>
    )}
      </div>
    <Header>
      <div className="flex">
        <img
          onClick={() => push('/')}
          style={{ width: '90px', height: '90px' }}
          className={styles.logo}
          src="/Logo.png"
          alt="Logo"
        />
      </div>

      <div>
      {!isMobile && (
      <div className={styles.hambrBtn}>
        <Nav />
      </div>
    )}
      </div>
     
    
      
      <div className="flex gap-4 z-50">
      {accessToken && (
     
     <BasketMenu/>
    )}
                    <Auth/>
  </div>
    </Header>
  
    <MainSection>
      <Curve />
    </MainSection>
  </Container>


  {isLoading ? (
   <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh'
  }}>
    <DotLoader color="#28e4c5" speedMultiplier={1.6} size={90} />
  </div>
  ) : (
    <div>
      <Box
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        width="100%"
        borderWidth="1px"
        borderTopRadius="0"  
        borderBottomRadius="3xl"
        overflow="hidden"
        background="linear-gradient(135deg, #7f00ff, #e100ff)"
        p={4}
        transition="all 0.3s ease"
      >
      


      <div>


  <Flex wrap="wrap" justifyContent="start" gap={3}>


    
    {categories?.map((category: any) => (
      <Text
        key={category.id}
        position="relative"
        fontSize="19px"
        letterSpacing="0.03em"
        color="white"
        cursor="pointer"
        onMouseEnter={() => handleCategoryHover(category.id)}  
        onMouseLeave={() => !isHovered && setHoveredCategory(null)}
        onClick={() => handleCategory(category.id)} 
        className="cursor-pointer"
        style={{ transition: 'background-color 0.3s ease' }}
       
        _before={{
          content: '""',
          position: 'absolute',
          width: hoveredCategory === category.id ? '100%' : '0',
          height: '2px',
          left: 0,
          bottom: '-2px',
          backgroundColor: '#26d6a1',
          transition: 'width 0.3s ease',
        }}
        _hover={{
          color: '#26d6a1',
        }}
      >
        {category.name}
      </Text>
    ))}
  </Flex>

  {hoveredCategory && (
    <MotionVStack
      align="start"
      mt={4}
      initial={{ height: 0, opacity: 0, y: -20 }}
      animate={{ height: 'auto', opacity: 1, y: 0  }}
      transition={{ duration: 0.2 }}
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave} 
    >
<SimpleGrid columns={12} spacing={3} >
      {getProductsByCategory(hoveredCategory)?.map((product: any) => (
    
        <Box
     
          key={product.id}
          borderWidth="1px"
          borderRadius="full"
          p={3}
          textAlign="center"
          background="white"
          width="100px"
          height="100px"
          onClick={() => onDetail(product.id)} 
          cursor="pointer"
        >
          <Image
          className=" ml-2 "
            src={product?.img_url}
            alt={product?.name}
            width={55}
            height={55}
  
          />
          <Text fontSize="sm" >{product.name}</Text>
        </Box>
     
      ))}
</SimpleGrid>
    </MotionVStack>
  )}
</div>

        
      </Box>


</div>
}




</div>
  
}
</div>
)


export default AboutUs