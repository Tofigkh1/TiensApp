import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Tag, VStack, SimpleGrid, Flex, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../Shared/Redux/Featuries/User/userSlice";
import loadingMedicalGif from '../../public/loadingMedical.gif';
import styled from "styled-components";
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { getCategories, GetProducts } from "../../Services";
import { sortDataByCreated } from "../../Shared/Utils/sortData";
import styles from './medicines.module.css';
import Loading from "../../Shared/components/Loading/Loading";
import Nav from "../../Shared/Components/Client/Nav/Nav";
import Auth from "../../Shared/Components/Client/Auth/Auth";
import { useModalOpen } from "../../Shared/Hooks/useModalOpen";
import Image from "next/image";
import dynamic from "next/dynamic";
import { DotLoader } from "react-spinners";
import { motion } from "framer-motion";
import BasketMenu from "../../Shared/Components/sliderBasket/sliderBasket";
import { RootState } from "../../Shared/Redux/Store/store";

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

function Medicines() {
  const [categories, setCategories] = useState<any[] | undefined>([]);
  const [products, setProducts] = useState<any[] | undefined>([]);
  const [chooseCategory, setChooseCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
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
  };

  const onDetail = (id: number) => {
    router.push(`/medicines/${id}`);
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
          >
            <Flex wrap="wrap" justifyContent="start" gap={3}>
              {categories?.map((category: any) => (
                <Text
                  key={category.id}
                  fontSize="19px"
                  color="white"
                  cursor="pointer"
                  onClick={() => handleCategory(category.id)}
                >
                  {category.name}
                </Text>
              ))}
            </Flex>
          </Box>

          <div className="flex flex-row flex-wrap justify-center">
            {chooseCategory ? (
              getProductsByCategory(chooseCategory).length > 0 ? (
                <div className="w-80 h-auto m-4 rounded-2xl border border-whiteLight3">
                  {getProductsByCategory(chooseCategory).map((product: any) => (
                    <ProductCard key={product.id} {...product} onReadMore={() => onDetail(product.id)} />
                  ))}
                </div>
              ) : (
                <p className="text-center mt-4">Bu kategoride ürün bulunmamaktadır.</p>
              )
            ) : (
              categories?.map((category) => (
                <div key={category.id} className="w-80 h-auto m-4 rounded-2xl border border-whiteLight3">
                  {getProductsByCategory(category.id).map((product: any) => (
                    <ProductCard key={product.id} {...product} onReadMore={() => onDetail(product.id)} />
                  ))}
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
