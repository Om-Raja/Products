import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import { useColorMode } from "./ui/color-mode";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={"1140px"} px={4} py={2}>
      <Flex
        justifyContent={"space-between"}
        direction="row"
        alignItems={"center"}
        h={16}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          textTransform={"uppercase"}
          fontWeight={"bold"}
          textAlign={"center"}
          bgGradient="to-r"
          gradientFrom="red.500"
          gradientTo="blue.500"
          bgClip="text"
        >
          <Link to="/">Product Store 🛒</Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <IoAddCircleOutline />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <MdDarkMode /> : <CiLight />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
