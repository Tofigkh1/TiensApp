import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Tag, VStack,SimpleGrid } from "@chakra-ui/react";
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

function Medicines() {
  const [categories, setCategories] = useState<any[] | undefined>([]);
  const [products, setProducts] = useState<any[] | undefined>([]);
  const [chooseCategory, setChooseCategory] = useState<string | null>(null);
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
        <Image className='ml-52' width={600} height={500} src={loadingMedicalGif} />
      ) : (
        <div>
          <Box
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            width="100%"
            borderWidth="1px"
            borderTopRadius="0"  
            borderBottomRadius="md"
            overflow="hidden"
            background="linear-gradient(135deg, #7f00ff, #e100ff)"
            p={4}
            transition="all 0.3s ease"
          >
            <Box as="h3" fontSize="lg" className="text-white cursor-pointer">
              Categories
            </Box>

            <Box
  maxHeight={isOpenn ? "200px" : "0"}
  overflow="hidden"
  transition="all 0.3s ease"
>
  <VStack align="start" mt={2}>
    <Tag colorScheme="teal">
      <li onClick={() => { handleCategory(null); onClose(); }}>
        <p className="font-bold text-xl capitalize cursor-pointer">
          all categories
        </p>
      </li>
    </Tag>

   
    <SimpleGrid columns={2} spacing={3} mt={4}>
      {categories?.map((category: any) => (
        <Tag
          key={category.id}
          colorScheme={chooseCategory === category.id ? "blue" : "teal"}
          onClick={() => { handleCategory(category.id); }}
          className="cursor-pointer"
        >
          {category.name}
        </Tag>
      ))}
    </SimpleGrid>
  </VStack>
</Box>
          </Box>

          <div className="flex flex-row flex-wrap justify-center">
            {chooseCategory ? (
 
              getProductsByCategory(chooseCategory).length > 0 ? (
                <div className="w-80 h-auto m-4 rounded-2xl border border-whiteLight3">
                  <h2 className="text-center text-xl font-bold mb-2">
                    {categories.find((cat) => cat.id === chooseCategory)?.name}
                  </h2>
                  <Swiper spaceBetween={50} slidesPerView={1} className="mySwiper">
                    {getProductsByCategory(chooseCategory).map((product: any) => (
                      <SwiperSlide key={product.id}>
                        <ProductCard {...product} onReadMore={() => onDetail(product.id)} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              ) : (
                <p className="text-center mt-4">Bu kategoride ürün bulunmamaktadır.</p>
              )
            ) : (
             
              categories?.map((category) => (
                <div key={category.id} className="w-80 h-auto m-4 rounded-2xl border border-whiteLight3">
                  <h2 className="text-center text-xl font-bold mb-2 "></h2>
                  <Swiper spaceBetween={50} slidesPerView={1} className="mySwiper cursor-pointer">
                    {getProductsByCategory(category.id).map((product: any) => (
                      <SwiperSlide key={product.id}>
                        <ProductCard {...product} onReadMore={() => onDetail(product.id)} />
                      </SwiperSlide>
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
