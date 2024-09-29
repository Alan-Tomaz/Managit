import express from "express";
import { login, register } from "../controllers/auth.js";
import { verifyToken } from '../middlewares/auth.js'
import { createOrder, getOrders } from "../controllers/order.js";

const router = express.Router();

/* ROUTES */
/* Create Order */
router.post("/add", verifyToken, createOrder);
/* Get Order */
router.get("/", verifyToken, getOrders);

export default router;