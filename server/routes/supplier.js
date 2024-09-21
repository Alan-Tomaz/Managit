import express from 'express';
import { verifyToken } from '../middlewares/auth.js'
import { createSupplier, getSupplier } from '../controllers/supplier.js';

const router = express.Router();

/* Create Supplier */
router.post("/add", verifyToken, createSupplier);
/* Get Categories */
router.get("/", verifyToken, getSupplier);

export default router;