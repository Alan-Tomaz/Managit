import express from 'express';
import { verifyToken } from '../middlewares/auth.js'
import { upload } from '../middlewares/upload.js'
import { createProduct, deleteManyProducts, deleteProduct, getLowStockProducts, getProducts, getRecentlyAddedProducts, getStockProducts, updateProduct } from '../controllers/product.js';

const router = express.Router();

/* Create Product */
router.post("/add", verifyToken, upload.single("picture"), createProduct);
/* Get Products */
router.get("/", verifyToken, getProducts);
/* Get Low Stock Products */
router.get("/low-stock", verifyToken, getLowStockProducts);
/* Get Stock Products */
router.get("/stock", verifyToken, getStockProducts);
/* Get Recently Added Products */
router.get("/recently-added", verifyToken, getRecentlyAddedProducts);
/* Update Product Content */
router.put("/update/:id", verifyToken, upload.single("picture"), updateProduct)
/* Remove Many Products */
router.delete("/remove/many", verifyToken, deleteManyProducts)
/* Remove Products */
router.delete("/remove/:id", verifyToken, deleteProduct)

export default router;