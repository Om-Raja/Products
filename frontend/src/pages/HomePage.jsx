import { Heading, Container, Grid, Text, Box } from "@chakra-ui/react";
import { useProductStore } from "../Store/product.store.js";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import { useEffect } from "react";

const HomePage = () => {
  const { products, fetchProducts, loading } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    return (
      <Text textAlign={"center"} fontSize="3xl" fontWeight="bold">
        Loading... ⌛
      </Text>
    );
  } else if (!loading && products.length == 0) {
    return (
      <Box>
        <Text as="p" textAlign="center" fontSize="2xl">
          No products...{" "}
          <Text
            as="span"
            color="blue.500"
            _hover={{ textDecoration: "underline" }}
          >
            <Link to="/create">Create a product</Link>
          </Text>
        </Text>
      </Box>
    );
  } else {
    return (
      <Container w="container.sm">
        <Heading
          as="h2"
          color="blue.300"
          fontSize="2xl"
          fontWeight="semiBold"
          textAlign={"center"}
        >
          Current Products
          <Box py={4} px={[2, 4, 6]} w="full">
            <Grid
              templateColumns={{
                base: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              }}
              gap={4}
            >
              {products.map((prod) => {
                return <ProductCard key={prod._id} product={prod} />;
              })}
            </Grid>
          </Box>
        </Heading>
      </Container>
    );
  }
};

export default HomePage;
