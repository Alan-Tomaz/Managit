import express from 'express';
import { verifyToken } from '../middlewares/auth.js'
import { upload } from '../middlewares/upload.js'
import { createProduct } from '../controllers/product.js';

const router = express.Router();

/* Create Product */
router.post("/add", verifyToken, upload.single("picture"), createProduct);

export default router;