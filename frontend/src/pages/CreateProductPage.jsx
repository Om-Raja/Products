import { useColorModeValue } from "@/components/ui/color-mode";
import {
  Box,
  Container,
  Heading,
  Input,
  VStack,
  Button,
  Field,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../Store/product.store.js";

const CreateProductPage = () => {
  const {createProduct} = useProductStore();

  const [productDetail, setProductDetail] = useState({
    name: "",
    price: "",
    image: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await createProduct(productDetail);
    const {success, message} = response;

    console.log("Success: ", success);
    console.log("Message: ", message);
    
    setProductDetail({
      name: "",
      price: "",
      image: "",
    });
  }

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8 /*32px*/}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>

        <Box
          w={["95%", "80%", "60%", "50%" /*mobile, tablet, desktop */]}
          bgColor={useColorModeValue("gray.300", "gray.700")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Field.Root required>
              <Field.Label>
                Name
                <Field.RequiredIndicator />
              </Field.Label>
              <Input
                placeholder="Poco M2 Pro"
                name="name"
                value={productDetail.name}
                variant="subtle"
                type="text"
                onChange={(event) =>
                  setProductDetail({
                    ...productDetail,
                    name: event.target.value,
                  })
                }
              ></Input>
              <Field.ErrorText>Name is required</Field.ErrorText>
            </Field.Root>

            <Field.Root required>
              <Field.Label>
                Price
                <Field.RequiredIndicator />
              </Field.Label>
              <Input
                placeholder="15999"
                name="price"
                value={productDetail.price}
                variant="subtle"
                type="number"
                onChange={(event) =>
                  setProductDetail({
                    ...productDetail,
                    price: event.target.value,
                  })
                }
              ></Input>
              <Field.ErrorText>Price is required</Field.ErrorText>
            </Field.Root>
            <Field.Root required>
              <Field.Label>
                Image Link
                <Field.RequiredIndicator />
              </Field.Label>
              <Input
                placeholder="pocom2-pro.jpg"
                name="image"
                value={productDetail.image}
                variant="subtle"
                type="text"
                onChange={(event) =>
                  setProductDetail({
                    ...productDetail,
                    image: event.target.value,
                  })
                }
              ></Input>
              <Field.ErrorText>Image link is required</Field.ErrorText>
            </Field.Root>

            <Button mt={3} w={"full"} onClick={handleSubmit}>
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreateProductPage;
