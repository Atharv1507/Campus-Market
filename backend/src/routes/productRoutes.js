import express from "express";
import { createProduct, deleteProductById, getAllProducts, updateProductById } from "../controller/productController.js";

const router = express.Router();

router.post('/products', createProduct);
router.get('/products', getAllProducts);
router.delete('/products/:id', deleteProductById);
router.put('/products/:id', updateProductById);

export default router;
