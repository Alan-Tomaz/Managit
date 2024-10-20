import express from "express";
import { checkAdminPermission, verifyToken } from '../middlewares/auth.js'
import { clearLog, createLog, deleteLog, deleteManyLogs, getLogs, getNotifications } from "../controllers/log.js";
import { getUserId } from "../middlewares/misc.js";

const router = express.Router();

/* CREATE LOG */
router.post('/add', verifyToken, checkAdminPermission, createLog);
/* GET LOG */
router.get('/', verifyToken, checkAdminPermission, getLogs);
/* GET NOTIFICATIONS */
router.get('/notifications/', verifyToken, getUserId, getNotifications);
/* DELETE MANY LOGS */
router.delete('/remove/many', verifyToken, checkAdminPermission, deleteManyLogs);
/* DELETE LOG */
router.delete('/remove/:id', verifyToken, checkAdminPermission, deleteLog);
/* DELETE LOG */
router.delete('/clear/', verifyToken, checkAdminPermission, clearLog);

export default router;