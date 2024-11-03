import express from "express";
import { login, register } from "../controllers/auth.js";
import { verifyToken } from '../middlewares/auth.js'
import { stopUpload, upload } from "../middlewares/upload.js";

const router = express.Router();

/* Register */
router.post('/register', stopUpload);
/* Login */
router.post("/login", login);

export default router;