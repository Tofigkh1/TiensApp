import { useState } from "react";
import { Box, Tag, VStack, SimpleGrid, Flex, Text } from "@chakra-ui/react";






function Categories(){


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