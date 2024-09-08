import { Container, VStack, Text} from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { SimpleGrid } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/product';
import ProductCard from '../components/ProductCard';

export const HomePage = () => {
  const {fetchProducts, products} = useProductStore();

  useEffect(() =>{
    fetchProducts();
  },[fetchProducts]);
  console.log("Products", products);

  return (
    <Container maxW='container.xl' py={12}>
      <VStack direction={['column', 'row']} spacing={8}>
        <Text
          bgGradient={'linear(to-l, #a1248a, #dd00ff)'}
          bgClip={'text'}
          fontSize={{base: '22', sm: '26'}}
          textAlign={'center'}
          fontWeight={'extrabold'}
          textTransform={'uppercase'}
        >
          Current Products
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}

          spacing={10}
          w={"full"}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product}/>
          ))}
        </SimpleGrid>


        {products.length === 0 &&(
           <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
           No products found{" "}
           <Link to={"/create"}>
             <Text as={'span'} color={'blue.500'} _hover={{textDecoration: "underline"}}>
               Create a product
             </Text>
           </Link>
 
         </Text>
        )}
       
      </VStack>

    </Container>
  )
};

export default HomePage;