import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Tag, VStack, SimpleGrid, Flex } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setUser } from "../../Shared/Redux/Featuries/User/userSlice";
import loadingMedicalGif from '../../public/loadingMedical.gif';
import styled from "styled-components";
import { createTheme } from "@mui/material";
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { getCategories, GetProducts } from "../../Services";
import { sortDataByCreated } from "../../Shared/Utils/sortData";
import styles from './medicines.module.css';
import Loading from "../../Shared/components/Loading/Loading";

import Nav from "../../Shared/Components/Client/Nav/Nav";
import Auth from "../../Shared/Components/Client/Auth/Auth";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';
import { useModalOpen } from "../../Shared/Hooks/useModalOpen";
import Image from "next/image";
import dynamic from "next/dynamic";
import { DotLoader } from "react-spinners";

const ProductCard = dynamic(() => import('../../Shared/Components/Client/productsCard/products'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const Container = styled.div`
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
      transform: scale(.8),
      opacity: 1,
    },
    '100%': {
      transform: scale(2.4),
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

function Medicines() {
  const [categories, setCategories] = useState<any[] | undefined>([]);
  const [products, setProducts] = useState<any[] | undefined>([]);
  const [chooseCategory, setChooseCategory] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  let { isOpen, onClose, onOpen } = useModalOpen();
  const [isOpenn, setIsOpen] = useState(false);
  const { push } = useRouter();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    let user = localStorage.getItem("user_info");
    if (user) {
      user = JSON.parse(user);
      if (user) dispatch(setUser(user));
    }
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryData, productsData] = await Promise.all([
          getCategories(),
          GetProducts()
        ]);

        if (categoryData?.data?.result?.data) {
          setCategories(sortDataByCreated(categoryData.data.result.data));
        }
        if (productsData?.data?.result?.data) {
          setProducts(sortDataByCreated(productsData.data.result.data));
        }
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getProductsByCategory = (categoryId: string) => {
    return products?.filter((product: any) => product.category_id === categoryId);
  };

  const handleCategory = (categoryName: string | null) => {
    setChooseCategory(categoryName);
    onClose(); 
  };

  function onDetail(id: number) {
    router.push('medicines/' + id);
  }

  const handlePrint = () => {
    window.print();
  };



  const handleCategoryHover = (categoryId: string | null) => {
    setHoveredCategory(categoryId);
  };

  return (
    <div>
      <Container>
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
          <Nav />
          <div className=" z-50">
            <Auth />
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
      <Box as="h3" fontSize="lg" className="text-white cursor-pointer">
        Categories
      </Box>

      <Flex wrap="wrap" justifyContent="start" gap={3}>
        {categories?.map((category: any) => (
          <Tag
            key={category.id}
            colorScheme={hoveredCategory === category.id ? "blue" : "teal"}
            onMouseEnter={() => handleCategoryHover(category.id)}
            onMouseLeave={() => handleCategoryHover(null)}
            className="cursor-pointer"
            style={{ transition: 'background-color 0.3s ease' }}
            _hover={{ bg: '#26d6a1' }}
          >
            {category.name}
          </Tag>
        ))}
      </Flex>

      {hoveredCategory && (
        <VStack align="start" mt={4}>
          {getProductsByCategory(hoveredCategory)?.map((product: any) => (
            <Box key={product.id} borderWidth="1px" borderRadius="full" p={3} textAlign="center" width="100px" height="100px">
              <Image src={product.image_url} alt={product.name} borderRadius="full" boxSize="50px" />
              <Text fontSize="sm" mt={2}>{product.name}</Text>
            </Box>
          ))}
        </VStack>
      )}
    </div>


{/* <Flex wrap="wrap" justifyContent="start" gap={3}>
<Box as="h3" fontSize="lg" className="text-white cursor-pointer">
              Categories 
            </Box>
<Tag 
                 style={{ transition: 'background-color 0.3s ease' }} 
                 _hover={{ bg: '#26d6a1' }} 
                colorScheme="teal">
                  <li onClick={() => { handleCategory(null); onClose(); }}>
                  <p className="font-bold text-sm capitalize cursor-pointer ">
  all categories
</p>
                  </li>
                </Tag>
  
  {categories?.map((category: any) => (
    <Tag
      key={category.id}
      colorScheme={chooseCategory === category.id ? "blue" : "teal"}
      onClick={() => handleCategory(category.id)}
      className="cursor-pointer"
      style={{ transition: 'background-color 0.3s ease' }}
      _hover={{ bg: '#26d6a1' }}
    >
      {category.name}
    </Tag>
  ))}
</Flex> */}


            {/* <Box
              maxHeight={isOpenn ? "200px" : "0"}
              overflow="hidden"
              transition="all 0.3s ease"
            >
              <VStack align="start" mt={2}>
                
                <Tag 
                 style={{ transition: 'background-color 0.3s ease' }} 
                 _hover={{ bg: '#26d6a1' }} 
                colorScheme="teal">
                  <li onClick={() => { handleCategory(null); onClose(); }}>
                  <p className="font-bold text-xl capitalize cursor-pointer ">
  all categories
</p>
                  </li>
                </Tag>

                <SimpleGrid columns={2} spacing={3} mt={4}>
                  {categories?.map((category: any) => (
              <Tag
              key={category.id}
              colorScheme={chooseCategory === category.id ? "blue" : "teal"}
              onClick={() => handleCategory(category.id)}
              className="cursor-pointer"
              style={{ transition: 'background-color 0.3s ease' }} 
              _hover={{ bg: '#26d6a1' }} 
            >
              {category.name}
            </Tag>
                  ))}
                </SimpleGrid>
              </VStack>
            </Box> */}

            
          </Box>

          <div className="flex flex-row flex-wrap justify-center">
            {chooseCategory ? (
              getProductsByCategory(chooseCategory).length > 0 ? (
                <div className="w-80 h-auto m-4 rounded-2xl border border-whiteLight3">
                  <Swiper spaceBetween={50} slidesPerView={1} className="mySwiper">
                    {getProductsByCategory(chooseCategory).map((product: any) => (
                      <StyledSwiperSlide key={product.id}>
                        <ProductCard {...product} onReadMore={() => onDetail(product.id)} />
                      </StyledSwiperSlide>
                    ))}
                  </Swiper>
                </div>
              ) : (
                <p className="text-center mt-4">Bu kategoride ürün bulunmamaktadır.</p>
              )
            ) : (
              categories?.map((category) => (
                <div key={category.id} className="w-80 h-auto m-4 rounded-2xl border border-whiteLight3">
                  <h2 className="text-center text-xl font-bold "></h2>
                  <Swiper spaceBetween={50} slidesPerView={1} className="mySwiper cursor-pointer">
                    {getProductsByCategory(category.id).map((product: any) => (
                      <StyledSwiperSlide key={product.id}>
                        <ProductCard {...product} onReadMore={() => onDetail(product.id)} />
                      </StyledSwiperSlide>
                    ))}
                  </Swiper>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Medicines;
