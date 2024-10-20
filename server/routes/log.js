import express from "express";
import { verifyToken } from '../middlewares/auth.js'
import { createLog, getLogs } from "../controllers/log.js";

const router = express.Router();

/* CREATE LOG */
router.post('/add', verifyToken, createLog);
/* GET LOG */
router.get('/', verifyToken, getLogs);

export default router;