import Log from '../models/Log.js';
import jwt from "jsonwebtoken";

/* CREATE LOG */
export const createLog = async (req, res) => {
    try {
        let token = req.header('Authorization')

        if (!token) {
            return res.status(403).send("Access Denied");
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        const decoded = jwt.decode(token);

        const userId = decoded.id

        let description;

        const lastDocument = await Log.find()
            .sort({ seqNum: -1 })
            .limit(1)
            .exec();


        const newSequence = lastDocument.length ? lastDocument[0].seqNum + 1 : 1;

        console.log(newSequence);

        const logType = req.body.type;

        switch (logType) {
            case "A":
                description = "ABC"
                break;
        }

        const newLog = new Log({
            seqNum: newSequence,
            userGuilty: userId,
            description
        })

        const savedLog = await newLog.save()
        console.log(savedLog);
        res.status(201).json({ log: savedLog });
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Something Wrong Ocurred. Try Again Later' })
    }
}

/* GET LOGS */
export const getLogs = async (req, res) => {
    try {

        const { page = 1, limit = 10, search } = req.query;

        const filters = {};

        if (search) {
            filters.description = { ...filters.description, $regex: search, $options: 'i' };
        }

        const logsData = await Log.find(filters)
            .populate('userGuilty')
            .sort({ seqNum: 1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const totalLogs = await Log.countDocuments(filters);

        res.status(200).json({ logsData, totalLogs });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Something Wrong Ocurred. Try Again Later" });
    }
}