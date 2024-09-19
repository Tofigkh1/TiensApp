import { useEffect, useState } from "react";
import { Box, Tag, VStack, SimpleGrid, Flex, Text } from "@chakra-ui/react";
import { getCategories, GetProducts } from "../../../../Services";
import { sortDataByCreated } from "../../../Utils/sortData";
import { useModalOpen } from "../../../Hooks/useModalOpen";
import { motion } from "framer-motion";
const MotionVStack = motion(VStack);




function Categories(){
const [isOpenn, setIsOpen] = useState(false);
const [categories, setCategories] = useState<any[] | undefined>([]);
const [products, setProducts] = useState<any[] | undefined>([]);
const [isLoading, setIsLoading] = useState(true);
const [isError, setIsError] = useState(false);
const [chooseCategory, setChooseCategory] = useState<string | null>(null);
let { isOpen, onClose, onOpen } = useModalOpen();
const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
const [isHovered, setIsHovered] = useState(false);


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


  const handleCategoryHover = (categoryId: string | null, categoryName: string | null) => {
    setHoveredCategory(categoryId);
    setChooseCategory(categoryName);
    onClose(); 
  };

  const handleMouseEnter = () => {
    setIsHovered(true);  
  };

  const handleMouseLeave = () => {
    setIsHovered(false);  
    setHoveredCategory(null); 
  };

return(




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
<SimpleGrid columns={4} spacing={3} >
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
    borderRadius="full"
  />
  <Text fontSize="sm" >{product.name}</Text>
</Box>

))}
</SimpleGrid>
</MotionVStack>
)}
</div>


</Box>

)
}