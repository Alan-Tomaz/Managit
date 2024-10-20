import express from 'express';
import { checkAdminPermission, verifyToken } from '../middlewares/auth.js'
import { getUserId } from '../middlewares/misc.js'
import { upload } from '../middlewares/upload.js'
import { createUser, deleteManyUsers, deleteUser, getUsers, getYourProfile, updateUser, updateYourUser } from '../controllers/user.js';

const router = express.Router();

/* Create User */
router.post("/add", verifyToken, upload.single("picture"), checkAdminPermission, createUser);
/* Get Your Profile */
router.get("/me", verifyToken, getUserId, getYourProfile);
/* Get Users */
router.get("/", verifyToken, checkAdminPermission, getUsers);
/* Update Your User */
router.patch("/update/me/:id", verifyToken, upload.single("picture"), getUserId, updateYourUser);
/* Update User */
router.put("/update/:id", verifyToken, upload.single("picture"), checkAdminPermission, updateUser);
/* Remove Many Users */
router.delete("/remove/many", verifyToken, checkAdminPermission, deleteManyUsers)
/* Remove User */
router.delete("/remove/:id", verifyToken, checkAdminPermission, deleteUser)

export default router;