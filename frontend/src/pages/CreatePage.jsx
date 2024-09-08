import { Box, Button, Container, Heading, Input, useColorModeValue, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useProductStore } from '../store/product';
import { useToast } from '@chakra-ui/react'

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const {createProduct} = useProductStore();

  const toast = useToast();

  const handleAddProduct = async() => {
    const {success, message} = await createProduct(newProduct);
    console.log("Success: ", success);
    console.log("Message: ", message);
    if(!success){
      toast({
        "title":'error',
        description: message,
        status: 'error',
        duration:4000,
        isClosable:true,
      })
    }
    else{
      toast({
        "title":'success',
        description: message,
        status: 'success',
        duration:4000,
        isClosable:true,
      })
    }
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack
        spacing={8}
      >
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>

        <Box
          w={"full"} bg={useColorModeValue("white", "gray.800")}
          p={6} rounded={"lg"} shadow={"md"}
        >

          <VStack spacing={4}>
            <Input
              placeholder='Product Name'
              name='name'
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
            />
             <Input
              placeholder='Product Price'
              name='price'
              value={newProduct.price}
              onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
            />
             <Input
              placeholder='Product Image'
              name='Image'
              value={newProduct.image}
              onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
            />

            <Button colorScheme='blue' onClick={handleAddProduct} w={'full'}>
              Add
            </Button>

          </VStack>

        </Box>
      </VStack>
    </Container>
  )
};

export default CreatePage;