import express from "express";
import { verifyToken } from '../middlewares/auth.js'
import { createOrder, getOrders, updateOrder } from "../controllers/order.js";

const router = express.Router();

/* ROUTES */
/* Create Order */
router.post("/add", verifyToken, createOrder);
/* Get Order */
router.get("/", verifyToken, getOrders);
/* Update Order */
router.put("/update/:id", verifyToken, updateOrder);

export default router;