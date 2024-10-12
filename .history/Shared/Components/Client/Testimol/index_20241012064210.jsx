import React, { useState, useEffect } from "react";
import { Box, Text, Stack } from "@chakra-ui/react";
import ColorLine from '../../../../public/sectionColorLine.svg';
import Image from "next/image";

const testimonials = [
  {
    text: "The ease of delivery is one that I depended on when I was bedridden and couldn’t even walk. Their service is awesome.",
    author: "Gerald Maldiliene",
  },
  {
    text: "I couldn't believe how fast and reliable their delivery was. Highly recommended!",
    author: "Jessica Williams",
  },
  {
    text: "Great service, friendly staff, and fast delivery. Couldn't ask for more!",
    author: "Michael Johnson",
  },
  {
    text: "She has the best medicines and the medicines are really effective, I have to thank the doctor for that.",
    author: "Tommy Line",
  },
];

function Testimonial() {
  const [index, setIndex] = useState(0);
  const [isSlidingOut, setIsSlidingOut] = useState(false);
  const [mobile, setMobile] = useState(false); // State to detect mobile view

  useEffect(() => {
    // Check if the device is mobile
    const checkMobile = () => {
      setMobile(window.innerWidth < 800);
    };
    
    checkMobile(); // Run the check on mount
    window.addEventListener("resize", checkMobile); // Listen for window resize

    const interval = setInterval(() => {
      setIsSlidingOut(true);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        setIsSlidingOut(false);
      }, 1000); 
    }, 5000);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", checkMobile); // Clean up event listener
    };
  }, []);

  return (
    <Box
      width="480px"
      height="480px"
      overflow="hidden"
      p={6}
      backgroundColor="white"
    >
      <Text className=" ml-28" fontSize="xl" fontWeight="bold" mb={4}>
        What Our Clients Say
      </Text>

      <div className=" ml-48 mb-5">
        <Image src={ColorLine} alt="Icon" width={50} height={0} />
      </div>

      <Box
        className={`testimonial-content ${isSlidingOut ? "slide-out" : "slide-in"} `}
        style={mobile ? { transform: 'translateX(-30px)' } : {}} // Shifts 30px left on mobile
      >
        <Text mb={4}>"{testimonials[index].text}"</Text>
        <Text fontWeight="bold" className="text-comitColorText">- {testimonials[index].author}</Text>
      </Box>

      <Stack direction="row" justify="center" mt={4}>
        {testimonials.map((_, i) => (
          <Box
            key={i}
            h={2}
            w={2}
            bg={i === index ? "green.400" : "gray.400"}
            borderRadius="full"
            className="mt-5"
          />
        ))}
      </Stack>
    </Box>
  );
}

export default Testimonial;
