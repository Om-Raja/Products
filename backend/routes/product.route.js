import express from "express";
import {addOneProduct, deleteProduct, fetchAllProducts, getOneProduct, updateProduct} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", fetchAllProducts);
router.post("/", addOneProduct);
router.get("/:id", getOneProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
