import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header('Authorization')

        if (!token) {
            return res.status(403).send("Access Denied");
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

export const checkAdminPermission = async (req, res, next) => {
    try {

        console.log(req.body);

        const userId = req.body.userId ? req.body.userId : req.params.userId;
        if (!userId) {
            return res.status(401).json({ error: "User Id Not Received" });
        } else {
            const user = await User.findById(userId);

            if (!user.adminLevel == 1) {
                return res.status(401).json({ error: "User Not Authorized" });
            }
            else {
                next();
            }
        }
    } catch (error) {
        res.status(500).json({ error: error })
    }
}