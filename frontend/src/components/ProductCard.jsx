import {
  Box,
  Text,
  Image,
  Heading,
  Button,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";
import { useProductStore } from "../Store/product.store.js";
import { toaster } from "./ui/toaster";

const ProductCard = ({ product }) => {
  const { deleteProduct } = useProductStore();
  const { name, image, price, _id } = product;

  async function handleDelete() {
    const response = await deleteProduct(_id);
    const { success, message } = response;

    if (success) {
      toaster.create({
        title: "Deleted",
        type: "success",
        description: message,
        closable: true,
      });
    }else{
      toaster.create({
        title: "Failed",
        type: "error",
        description: message,
        closable: true,
      })
    }
  }
  return (
    <Box
      maxW={["90vw", "45vw", "30vw"]}
      shadow={"xl"}
      shadowColor={"blackAlpha.800"}
      rounded={"md"}
      borderRadius={"md"}
      bgColor={useColorModeValue("blackAlpha.300", "gray.700")}
      transitionDuration={"slow"}
      transitionProperty={"all"}
      transitionTimingFunction={"ease-in-out"}
      _hover={{
        transform: "translateY(-10px)",
      }}
      p={2}
    >
      <VStack>
        <Image
          src={image}
          alt={name}
          boxSize={"2xl"}
          rounded={"md"}
          h={["30vh", "40vh", "50vh"]}
          objectFit={"cover"}
        />
        <Box>
          <Heading
            color={useColorModeValue("blackAlpha.800", "whiteAlpha.800")}
            fontSize="lg"
            fontWeight="bold"
            as="h3"
          >
            {name}
          </Heading>

          <Text
            fontSize="md"
            fontWight="semibold"
            as="span"
            color={useColorModeValue("green.700", "green.400")}
          >
            &#8377; {price}
          </Text>

          <HStack spacing={4} p={3} textAlign={"end"}>
            <Button>Edit</Button>
            <Button onClick={handleDelete}>Delete</Button>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default ProductCard;
