import express from "express";
import { verifyToken } from '../middlewares/auth.js'
import { createOrder, deleteManyOrders, deleteOrder, getOrders, getOrdersByPeriod, getOrdersByTime, updateOrder } from "../controllers/order.js";

const router = express.Router();

/* ROUTES */
/* Create Order */
router.post("/add", verifyToken, createOrder);
/* Get Order */
router.get("/", verifyToken, getOrders);
/* Get Order By Time */
router.get("/time", verifyToken, getOrdersByTime);
/* Get Order By Time */
router.get("/period", verifyToken, getOrdersByPeriod);
/* Update Order */
router.put("/update/:id", verifyToken, updateOrder);
/* Delete Many Order */
router.delete("/remove/many/", verifyToken, deleteManyOrders);
/* Update Order */
router.delete("/remove/:id", verifyToken, deleteOrder);

export default router;