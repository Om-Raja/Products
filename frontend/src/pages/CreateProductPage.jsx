import { useColorModeValue } from "@/components/ui/color-mode";
import {
  Box,
  Container,
  Heading,
  Input,
  VStack,
  Button,
} from "@chakra-ui/react";
import {useState} from "react"

const CreateProductPage = () => {
  const [productDetail, setProductDetail] = useState({
    name: "",
    price: "",
    image: "",
  });

  function handleSubmit(){
    console.log(productDetail);
    setProductDetail({
      name:"",
      price:"",
      image:""
    })
  }

  return(
    <Container maxW={"container.sm"}>
      <VStack spacing={8 /*32px*/}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>

        <Box
          w={"full"}
          bgColor={useColorModeValue("gray.300", "gray.700")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Name"
              name="name"
              value={productDetail.name}
              onChange={event=>setProductDetail({...productDetail, name: event.target.value})}
            ></Input>
            <Input
              placeholder="Price"
              name="price"
              value={productDetail.price}
              onChange={event => setProductDetail({...productDetail, price: event.target.value})}
            ></Input>
            <Input
              placeholder="image"
              name="image"
              value={productDetail.image}
              onChange={event=>setProductDetail({...productDetail, image: event.target.value})}
            ></Input>
            <Button w={"full"} onClick={handleSubmit}>Add Product</Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreateProductPage;
