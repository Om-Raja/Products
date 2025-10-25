import { Box } from "@chakra-ui/react";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "./components/Navbar.jsx";
import CreateProductPage from "./pages/CreateProductPage";
import HomePage from "./pages/HomePage";
import {Routes, Route} from "react-router-dom"
import { useColorModeValue } from "./components/ui/color-mode.jsx";

function App() {
  return (
    <>
      <Box minH={"100vh"} bgColor={useColorModeValue("gray.200", "gray.800")}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateProductPage />} />
        </Routes>
      </Box>
      <Toaster />
    </>
  );
}

export default App;
