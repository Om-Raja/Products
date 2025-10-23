import { Box } from "@chakra-ui/react";
import Navbar from "./components/Navbar.jsx";
import CreateProductPage from "./pages/CreateProductPage";
import HomePage from "./pages/HomePage";
import {Routes, Route} from "react-router-dom"

function App() {
  return (
    <>
      <Box minH={"100vh"}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateProductPage />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
