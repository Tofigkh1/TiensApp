import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Tag, VStack, SimpleGrid, Flex, Text } from "@chakra-ui/react";
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
import { motion } from "framer-motion";

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

const MotionVStack = motion(VStack);

function Medicines() {
  const [categories, setCategories] = useState<any[] | undefined>([]);
  const [products, setProducts] = useState<any[] | undefined>([]);
  const [chooseCategory, setChooseCategory] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null); // Seçilen ürünü tutacak state
  let { isOpen, onClose, onOpen } = useModalOpen();
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
          GetProducts(),
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

  const handleMouseEnter = () => {
    setIsHovered(true);  
  };

  const handleMouseLeave = () => {
    setIsHovered(false);  
    setHoveredCategory(null); 
  };

  const handleCategoryHover = (categoryId: string | null, categoryName: string | null) => {
    setHoveredCategory(categoryId);
    setChooseCategory(categoryName);
    onClose(); 
  };

  // Ürüne tıklanınca çalışan fonksiyon
  const handleProductClick = (product: any) => {
    setSelectedProduct(product); // Seçilen ürünü kaydet
  };

  return (
    <div>
      <Container>
        <Header>
          <div className="flex">
            <img
              onClick={() => push("/")}
              style={{ width: "90px", height: "90px" }}
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
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
            <Box as="h3" fontSize="lg" className="text-white cursor-pointer">
              Categories
            </Box>

            <Flex wrap="wrap" justifyContent="start" gap={3}>
              {categories?.map((category: any) => (
                <Tag
                  key={category.id}
                  colorScheme={hoveredCategory === category.id ? "blue" : "teal"}
                  onMouseEnter={() => handleCategoryHover(category.id)} // Fare kategori üzerine gelince açılır
                  onMouseLeave={() => !isHovered && setHoveredCategory(null)} // Fare kategori üzerinden ayrılırsa kapanır, ama ürünler üzerinde ise kapanmaz
                  size="lg"
                  className="cursor-pointer transition-all duration-200"
                  onClick={() => handleCategoryHover(category.id, category.name)}
                >
                  {category.name}
                </Tag>
              ))}
            </Flex>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} p={4}>
            <MotionVStack initial={{ opacity: 0 }} animate={{ opacity: 1 }} spacing={4}>
              {getProductsByCategory(hoveredCategory)?.map((product: any) => (
                <StyledSwiperSlide
                  onClick={() => handleProductClick(product)} // Ürüne tıklayınca detayını göster
                >
                  <ProductCard key={product.id} product={product} />
                </StyledSwiperSlide>
              ))}
            </MotionVStack>
          </SimpleGrid>
        </div>
      )}

      {selectedProduct && (
        <Box>
          <Text fontSize="2xl" fontWeight="bold">Selected Product:</Text>
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            freeMode={true}
            pagination={{ clickable: true }}
            modules={[FreeMode, Pagination]}
            className="mySwiper"
          >
            <SwiperSlide>
              <Box p={4} shadow="md" borderWidth="1px">
                <Image src={selectedProduct.image} alt={selectedProduct.name} />
                <Text fontSize="xl">{selectedProduct.name}</Text>
                <Text>{selectedProduct.description}</Text>
              </Box>
            </SwiperSlide>
          </Swiper>
        </Box>
      )}
    </div>
  );
}

export default Medicines;
