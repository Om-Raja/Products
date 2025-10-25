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

const ProductCard = ({ product }) => {
  const { name, image, price } = product;
  return (
    <Box
      maxW={["90vw", "45vw", "30vw"]}
      shadow={"xl"}
      shadowColor={"blackAlpha.900"}
      rounded={"md"}
      borderRadius={"md"}
      bgColor={useColorModeValue("whiteAlpha.100", "gray.700")}
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
          rounded={"sm"}
          h={["30vh", "40vh", "50vh"]}
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

          <Text fontSize="md" fontWight="semibold" as="span" color={useColorModeValue("green.700", "green.400")}>
            &#8377; {price}
          </Text>

          <HStack spacing={4} p={3} textAlign={"end"}>
            <Button>Edit</Button>
            <Button>Delete</Button>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default ProductCard;
