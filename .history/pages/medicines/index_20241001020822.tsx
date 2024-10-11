import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Text, Flex, SimpleGrid } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../Shared/Redux/Featuries/User/userSlice";
import dynamic from "next/dynamic";
import { DotLoader } from "react-spinners";
import { motion } from "framer-motion";
import Image from "next/image";
import { getCategories, GetProducts } from "../../Services";
import { sortDataByCreated } from "../../Shared/Utils/sortData";
import Nav from "../../Shared/Components/Client/Nav/Nav";
import Auth from "../../Shared/Components/Client/Auth/Auth";
import BasketMenu from "../../Shared/Components/sliderBasket/sliderBasket";
import { RootState } from "../../Shared/Redux/Store/store";
import styles from './medicines.module.css';

const ProductCard = dynamic(() => import('../../Shared/Components/Client/productsCard/products'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const MotionVStack = motion(Box);

function Medicines() {
  const [categories, setCategories] = useState<any[] | undefined>([]);
  const [products, setProducts] = useState<any[] | undefined>([]);
  const [chooseCategory, setChooseCategory] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { push } = useRouter();
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

  const handleMouseEnter = () => {
    setIsHovered(true);  
  };

  const handleMouseLeave = () => {
    setIsHovered(false);  
    setHoveredCategory(null); 
  };

  function onDetail(id: number) {
    router.push('medicines/' + id);
  }

  const handleCategoryHover = (categoryId: string | null, categoryName: string | null) => {
    setHoveredCategory(categoryId);
    setChooseCategory(categoryName);
  };

  return (
    <div>
      <Box>
        <header>
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
        </header>

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
          <Box>
            <Flex justifyContent="start" gap={4} wrap="wrap">
              {categories?.map((category: any) => (
                <Text
                  key={category.id}
                  fontSize="19px"
                  letterSpacing="0.03em"
                  color="white"
                  cursor="pointer"
                  onMouseEnter={() => handleCategoryHover(category.id, category.name)}  
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleCategory(category.id)} 
                  className="cursor-pointer"
                  style={{ transition: 'background-color 0.3s ease' }}
                >
                  {category.name}
                </Text>
              ))}
            </Flex>

            {hoveredCategory && (
              <MotionVStack
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                p={4}
              >
                <SimpleGrid columns={[2, 3, 4]} spacing={4}>
                  {getProductsByCategory(hoveredCategory)?.map((product: any) => (
                    <Box
                      key={product.id}
                      borderWidth="1px"
                      borderRadius="full"
                      p={3}
                      textAlign="center"
                      background="white"
                      cursor="pointer"
                      onClick={() => onDetail(product.id)}
                    >
                      <Image
                        src={product?.img_url}
                        alt={product?.name}
                        width={55}
                        height={55}
                        style={{ borderRadius: '50%' }}
                      />
                      <Text fontSize="sm">{product.name}</Text>
                    </Box>
                  ))}
                </SimpleGrid>
              </MotionVStack>
            )}
          </Box>
        )}
      </Box>
    </div>
  );
}

export default Medicines;
