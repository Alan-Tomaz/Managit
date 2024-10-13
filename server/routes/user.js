import express from 'express';
import { checkAdminPermission, verifyToken } from '../middlewares/auth.js'
import { upload } from '../middlewares/upload.js'
import { createUser, getUsers } from '../controllers/user.js';

const router = express.Router();

/* Create User */
router.post("/add", verifyToken, upload.single("picture"), checkAdminPermission, createUser);
/* Get Users */
router.get("/:userId", verifyToken, checkAdminPermission, getUsers);
/* Update User */
/* Remove Many Users */
/* Remove User */

export default router;