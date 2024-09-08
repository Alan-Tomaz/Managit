import express from 'express';
import { createCategory, deleteCategory, getCategories, updateCategory } from '../controllers/category.js';
import { verifyToken } from '../middlewares/auth.js'

const router = express.Router();

/* ROUTES */
/* Create Category */
router.post("/add", verifyToken, createCategory);
/* Get Categories */
router.get("/", verifyToken, getCategories);
/* Remove Category */
router.delete("/remove/:id", verifyToken, deleteCategory)
/* Update Category Content */
router.put("/update/:id", verifyToken, updateCategory)

export default router;