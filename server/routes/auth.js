import express from "express";
import { login, register } from "../controllers/auth.js";
import { verifyToken } from '../middlewares/auth.js'
import { upload } from "../middlewares/upload.js";

const router = express.Router();

/* Register */
router.post('/register', upload.single('picture'), register);
/* Login */
router.post("/login", login);

export default router;