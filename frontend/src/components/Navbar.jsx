import { Button, Container, Flex, HStack, Text, useColorMode } from '@chakra-ui/react';
import React from 'react'
import { Link } from 'react-router-dom';
import { FaSquarePlus } from "react-icons/fa6";
import { MdSunny } from "react-icons/md";
import { color } from 'framer-motion';
import { MdNightlight } from "react-icons/md";
import { useProductStore } from '../store/product';



const Navbar = () => {
  const {colorMode, toggleColorMode} = useColorMode();


  return (
    <Container maxW={"1140px"} px={4} >
      <Flex 
        h={16}
        alignContent={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row"
        }}
      >
      
        <Text
          bgGradient={'linear(to-l, #7928CA, #FF0080)'}
          bgClip={'text'}
          fontSize={{base: '22', sm: '26'}}
          textAlign={'center'}
          fontWeight={'extrabold'}
          textTransform={'uppercase'}
        >
          <Link to={"/"}>Tim Store</Link>
        </Text>
        <HStack spacing={2} alignItems={'center'}>
          <Link to={"/create"}>
            <Button>
              <FaSquarePlus fontSize={20}/>
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MdSunny/> : <MdNightlight size={20}/> }
            </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
