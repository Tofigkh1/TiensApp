import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Text, Flex, VStack, SimpleGrid } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../Shared/Redux/Featuries/User/userSlice";
import styled from "styled-components";
import { createTheme } from "@mui/material";
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { getCategories, GetProducts } from "../../Services";
import { sortDataByCreated } from "../../Shared/Utils/sortData";
import styles from './medicines.module.css';
import { DotLoader } from "react-spinners";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import BasketMenu from "../../Shared/Components/sliderBasket/sliderBasket";
import { RootState } from "../../Shared/Redux/Store/store";
import Auth from "../../Shared/Components/Client/Auth/Auth";
import Nav from "../../Shared/Components/Client/Nav/Nav";
import Image from "next/image";
import { useModalOpen } from "../../Shared/Hooks/useModalOpen";

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

function Medicines() {
  const [categories, setCategories] = useState<any[] | undefined>([]);
  const [products, setProducts] = useState<any[] | undefined>([]);
  const [chooseCategory, setChooseCategory] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  let { isOpen, onClose } = useModalOpen();
  const { push } = useRouter();
  const router = useRouter();
  const dispatch = useDispatch();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  let user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const token = localStorage.getItem('user_info');
    setAccessToken(token);
  }, [user]);

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
    router.push(`/medicines/${id}`);
  }

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
          <div className="flex gap-10 z-50">
            {accessToken && <BasketMenu />}
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
       
            width="100%"
            borderWidth="1px"
            borderTopRadius="0"  
            borderBottomRadius="3xl"
            overflow="hidden"
            background="linear-gradient(135deg, #7f00ff, #e100ff)"
            p={4}
            transition="all 0.3s ease"
          >
            <Flex wrap="wrap" justifyContent="start" gap={3}>
              {categories?.map((category: any) => (
                <Text
                  key={category.id}
                  position="relative"
                  fontSize="19px"
                  letterSpacing="0.03em"
                  color="white"
                  cursor="pointer"
                  onClick={() => handleCategory(category.id)} 
                  className="cursor-pointer"
                  style={{ transition: 'background-color 0.3s ease' }}
                >
                  {category.name}
                </Text>
              ))}
            </Flex>
          </Box>

          <div className="flex justify-center">
            {chooseCategory ? (
              getProductsByCategory(chooseCategory).length > 0 ? (
                <div className="w-full h-auto m-4 rounded-2xl border border-whiteLight3">
                  <div className="flex flex-wrap gap-4 justify-start">
                    {getProductsByCategory(chooseCategory).map((product: any) => (
                      <div key={product.id} className="border border-whiteLight3 rounded-xl p-4">
                        <ProductCard {...product} onReadMore={() => onDetail(product.id)} />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-center mt-4">Bu kategoride ürün bulunmamaktadır.</p>
              )
            ) : (
              categories?.map((category) => (
                <div key={category.id} className="w-full h-auto m-4">
                  <div className="flex flex-wrap gap-16">
                    {getProductsByCategory(category.id).map((product: any) => (
                      <div key={product.id} className="border border-whiteLight3 rounded-xl p-4">
                        <ProductCard {...product} onReadMore={() => onDetail(product.id)} />
                      </div>
                    ))}
                  </div>
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
