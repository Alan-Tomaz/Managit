import express from 'express';
import { verifyToken } from '../middlewares/auth.js'
import { createSupplier, deleteManySuppliers, deleteSupplier, getSupplier, updateSupplier } from '../controllers/supplier.js';

const router = express.Router();

/* Create Supplier */
router.post("/add", verifyToken, createSupplier);
/* Get Categories */
router.get("/", verifyToken, getSupplier);
/* Update Category Content */
router.put("/update/:id", verifyToken, updateSupplier)
/* Remove Many Categories */
router.delete("/remove/many", verifyToken, deleteManySuppliers)
/* Remove Category */
router.delete("/remove/:id", verifyToken, deleteSupplier)

export default router;