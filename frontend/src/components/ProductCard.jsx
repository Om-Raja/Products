import {
  Box,
  Text,
  Image,
  Heading,
  Button,
  HStack,
  VStack,
  Input,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/modal";
import { useDisclosure } from "@chakra-ui/react-use-disclosure";

import { useColorModeValue } from "./ui/color-mode";
import { useProductStore } from "../Store/product.store.js";
import { toaster } from "./ui/toaster";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const { deleteProduct, updateProduct } = useProductStore();
  const { name, image, price, _id } = product;
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    } else {
      toaster.create({
        title: "Failed",
        type: "error",
        description: message,
        closable: true,
      });
    }
  }

  async function handleUpdate(productId, updatedProduct){
    const response = await updateProduct(productId, updatedProduct);
    const {success, message} = response;

    if(success){
      toaster.create({
        title: "Updated",
        description: message,
        type: "success",
        closable: true
      })
    }else{
      toaster.create({
        title: "Falied",
        description: message,
        type: "error",
        closable: true,
      })
    }

    onClose();
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
            <Button onClick={onOpen}>Edit</Button>
            <Button onClick={handleDelete}>Delete</Button>
          </HStack>

          {/* Modal to update */}
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Update the product</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Input name="name" placeholder="Name" value={updatedProduct.name} onChange={e=>setUpdatedProduct({...updatedProduct, name: e.target.value})}></Input>
                <Input name="price" placeholder="Price" value={updatedProduct.price} onChange={(event)=>setUpdatedProduct({...updatedProduct, price: event.target.value})}></Input>
                <Input name="image" placeholder="image" value={updatedProduct.image} onChange={(event)=>setUpdatedProduct({...updatedProduct, image: event.target.value})}></Input>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={()=>{
                  handleUpdate(product._id, updatedProduct);
                }}>
                  Update
                </Button>
                <Button variant="solid" onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </VStack>
    </Box>
  );
};

export default ProductCard;
