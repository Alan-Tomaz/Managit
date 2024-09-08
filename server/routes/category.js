import express from 'express';
import { createCategory } from '../controllers/category.js';
import { verifyToken } from '../middlewares/auth.js'

const router = express.Router();

/* ROUTES */
/* Create Category */
router.post("/add", verifyToken, createCategory);

export default router;