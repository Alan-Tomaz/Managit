import fs from "fs";
import jwt from "jsonwebtoken";

export const getUserId = async (req, res, next) => {
    try {
        const filePath = `./public/assets/${req.body.picturePath}`;

        let token = req.header('Authorization')

        if (!token) {
            return res.status(403).send("Access Denied");
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        const decoded = jwt.decode(token);

        const userId = decoded.id
        if (!userId) {
            fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
            return res.status(401).json({ error: "User Id Not Received" });
        } else {
            req.body.userId = userId;
            next();
        }
    } catch (error) {
        res.status(500).json({ error: error })
    }
}