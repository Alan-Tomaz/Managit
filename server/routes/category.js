import express from 'express';
import { createCategory, deleteCategory, deleteManyCategories, getCategories, updateCategory } from '../controllers/category.js';
import { verifyToken } from '../middlewares/auth.js'

const router = express.Router();

/* ROUTES */
/* Create Category */
router.post("/add", verifyToken, createCategory);
/* Get Categories */
router.get("/", verifyToken, getCategories);
/* Update Category Content */
router.put("/update/:id", verifyToken, updateCategory)
/* Remove Many Categories */
router.delete("/remove/many", verifyToken, deleteManyCategories)
/* Remove Category */
router.delete("/remove/:id", verifyToken, deleteCategory)

export default router;