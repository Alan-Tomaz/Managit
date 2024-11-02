import Log from '../models/Log.js';
import jwt from "jsonwebtoken";
import User from '../models/User.js';

/* CREATE LOG */
export const createLog = async (req, res) => {
    try {

        const info = req.body.info;

        const logType = req.body.type;

        let userId;

        if (logType != "register") {
            let token = req.header('Authorization')

            if (token.startsWith("Bearer ")) {
                token = token.slice(7, token.length).trimLeft();
            }

            const decoded = jwt.decode(token);

            userId = decoded.id
        }

        let description = "";

        const lastDocument = await Log.find()
            .sort({ seqNum: -1 })
            .limit(1)
            .exec();


        const newSequence = lastDocument.length ? lastDocument[0].seqNum + 1 : 1;

        switch (logType) {
            case "register":
                description = `New record: User: ${info.name} , Email: ${info.email} `;
                break;
            case "create-category":
                description = `Created a new Category: ${info.categoryName} `;
                break;
        }

        const newLog = new Log({
            seqNum: newSequence,
            userGuilty: userId != undefined ? userId : info._id,
            description
        })

        const savedLog = await newLog.save()
        res.status(201).json({ log: savedLog });
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Something Wrong Ocurred. Try Again Later' })
    }
}

export const createLogMiddleware = async (req) => {
    try {

        let userId;
        let type;

        const info = req.body.info;

        const logType = req.body.type;

        if (logType != "register") {
            let token = req.header('Authorization')

            if (token.startsWith("Bearer ")) {
                token = token.slice(7, token.length).trimLeft();
            }

            const decoded = jwt.decode(token);

            userId = decoded.id
        }

        let description = "";
        let notification = "";

        const lastDocument = await Log.find()
            .sort({ seqNum: -1 })
            .limit(1)
            .exec();


        const newSequence = lastDocument.length ? lastDocument[0].seqNum + 1 : 1;

        switch (logType) {
            case "register":
                description = `New record: User: ${info.name}, Email: ${info.email} `;
                notification = `New record: User: ${info.name}, Email: ${info.email} `;
                type = "register";
                break;
            case "create-category":
                description = `Created a new Category: ${info.categoryName} `;
                notification = `New Category: ${info.categoryName} `;
                type = "category";
                break;
            case "update-category":
                description = `Uptaded a category: ${info.categoryName} `;
                notification = `Category Updated: ${info.categoryName} `;
                type = "category";
                break;
            case "delete-many-categories":
                description = `Deleted the following categories: ${info.map((elem) => elem.categoryName).join(", ")} `;
                notification = `Deleted the following categories: ${info.map((elem) => elem.categoryName).join(", ")} `;
                type = "category";
                break;
            case "delete-category":
                description = `Deleted the category: ${info.categoryName} `;
                notification = `Category Deleted: ${info.categoryName} `;
                type = "category";
                break;
            case "create-supplier":
                description = `Created a new Supplier: ${info.supplierName} `;
                notification = `New Supplier: ${info.supplierName} `;
                type = "supplier";
                break;
            case "update-supplier":
                description = `Uptaded a supplier: ${info.supplierName} `;
                notification = `Supplier Updated: ${info.supplierName} `;
                type = "supplier";
                break;
            case "delete-many-suppliers":
                description = `Deleted the following suppliers: ${info.map((elem) => elem.supplierName).join(", ")} `;
                notification = `Deleted the following suppliers: ${info.map((elem) => elem.supplierName).join(", ")} `;
                type = "supplier";
                break;
            case "delete-supplier":
                description = `Deleted the supplier: ${info.supplierName} `;
                notification = `Supplier Deleted: ${info.supplierName} `;
                type = "supplier";
                break;
            case "create-product":
                description = `Created a new Product: ${info.productName} `;
                notification = `New Product: ${info.productName} `;
                type = "product";
                break;
            case "update-product":
                description = `Uptaded a product: ${info.productName} `;
                notification = `Product Updated: ${info.productName} `;
                type = "product";
                break;
            case "delete-many-products":
                description = `Deleted the following products: ${info.map((elem) => elem.productName).join(", ")} `;
                notification = `Deleted the following products: ${info.map((elem) => elem.productName).join(", ")} `;
                type = "product";
                break;
            case "delete-product":
                description = `Deleted the product: ${info.productName} `;
                notification = `Product Deleted: ${info.productName} `;
                type = "product";
                break;
            case "create-order":
                description = `Created a new Order: ${info.uniqueId}, Type: ${info.type} `;
                notification = `New Order: ${info.uniqueId}, Type: ${info.type} `;
                type = "order";
                break;
            case "update-order":
                description = `Uptaded a order: ${info.uniqueId} `;
                notification = `Order ${info.uniqueId} Updated`;
                type = "order";
                break;
            case "delete-many-orders":
                description = `Deleted the following orders: ${info.map((elem) => elem.uniqueId).join(", ")} `;
                notification = `Deleted the following orders: ${info.map((elem) => elem.uniqueId).join(", ")} `;
                type = "order";
                break;
            case "delete-order":
                description = `Deleted the order: ${info.uniqueId} `;
                notification = `Order Deleted: ${info.uniqueId} `;
                type = "order";
                break;
            case "create-user":
                description = `Created a new User, User: ${info.name}, Email: ${info.email} `;
                notification = `New User: ${info.name}, Email: ${info.email}`;
                type = "user";
                break;
            case "update-user":
                description = `Uptaded a user, Email: ${info.email} `;
                notification = `User Updated, Email: ${info.email} `;
                type = "user";
                break;
            case "delete-many-users":
                description = `Deleted the following users, Emails: ${info.map((elem) => elem.email).join(", ")} `;
                notification = `Deleted the following users, Emails: ${info.map((elem) => elem.email).join(", ")} `;
                type = "user";
                break;
            case "delete-user":
                description = `Deleted the user, Email: ${info.email} `;
                notification = `User Deleted: ${info.email} `;
                type = "user";
                break;
            case "delete-log":
                description = `Deleted Some Logs`;
                notification = `Deleted Some Logs`;
                type = "log";
                break;
            case "clear-log":
                description = `Cleared Log`;
                notification = `Cleared Log`;
                type = "log";
                break;
        }

        const newLog = new Log({
            seqNum: newSequence,
            userGuilty: userId != undefined ? userId : info._id,
            description,
            notification,
            type
        })

        const savedLog = await newLog.save()
        return { msg: "Log Successfully Added" }
    }
    catch (error) {
        console.log(error.message)
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
            .sort({ seqNum: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        for (let i = 0; i < logsData.length; i++) {
            if (logsData[i].userGuilty == null) {
                logsData[i].userGuilty = { name: "Unknown" };
            }
        }

        const totalLogs = await Log.countDocuments(filters);

        res.status(200).json({ logsData, totalLogs });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Something Wrong Ocurred. Try Again Later" });
    }
}

export const getNotifications = async (req, res) => {
    try {

        const { page = 1, limit = 10 } = req.query;

        const user = await User.findById(req.body.userId);

        const filterTypes = ["category", "supplier", "product", "order"];

        if (user.adminLevel == 1) {
            filterTypes.push("user");
            filterTypes.push("log");
            filterTypes.push("register");
        }

        const filters = { type: { $in: filterTypes }, userGuilty: { $nin: user._id } };

        const logsData = await Log.find(filters)
            .sort({ seqNum: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const notificationsData = logsData.map(log => { return { _id: log._id, notification: log.notification, type: log.type, createdAt: log.createdAt } });

        res.status(200).json({ notificationsData });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Something Wrong Ocurred. Try Again Later" });
    }
}

/* DELETE MANY LOGS */
export const deleteManyLogs = async (req, res) => {
    try {
        const { idsToDelete } = req.query;

        const logsToDelete = await Log.find({ _id: { $in: idsToDelete } });

        /* Array with the seqNums */
        const logsToDeleteFiltered = logsToDelete.map(log => log.seqNum);

        logsToDeleteFiltered.sort((a, b) => a - b);

        const logsDeleted = [];

        for (let i = 0; i < logsToDeleteFiltered.length; i++) {
            const sequenceToDelete = logsToDeleteFiltered[i];

            logsDeleted.push(await Log.deleteOne({ seqNum: sequenceToDelete }));

            // Adjust the next sequenceNumbers 
            await Log.updateMany(
                { seqNum: { $gt: sequenceToDelete } },
                { $inc: { seqNum: -1 } }
            );
        }

        if (logsDeleted.length == 0) {
            return res.status(404).json({ error: "Logs not Found" });
        } else {

            /* LOG PARAMETERS */
            req.body.info = {};
            req.body.type = "delete-log";

            res.status(200).json({ msg: "Logs Successfully Deleted" });

            setTimeout(() => {
                createLogMiddleware(req);
            }, 0)
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something Wrong Ocurred. Try Again Later" });
    }
}

/* DELETE LOG */
export const deleteLog = async (req, res) => {
    try {
        const { id } = req.params;

        const logFind = await Log.findById(id);

        const result = await Log.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ error: "Log not Found" });
        } else {
            await Log.updateMany(
                { seqNum: { $gt: logFind.seqNum } },
                { $inc: { seqNum: -1 } }
            );

            /* LOG PARAMETERS */
            req.body.info = {};
            req.body.type = "delete-log";

            res.status(200).json({ msg: "Log Successfully Deleted" });

            setTimeout(() => {
                createLogMiddleware(req);
            }, 0)
        }

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Something Wrong Ocurred. Try Again Later" });
    }
}

/* DELETE LOG */
export const clearLog = async (req, res) => {
    try {

        const result = await Log.deleteMany({});

        /* LOG PARAMETERS */
        req.body.info = {};
        req.body.type = "clear-log";

        res.status(200).json({ msg: "Log Successfully Cleared" });

        setTimeout(() => {
            createLogMiddleware(req);
        }, 0)

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Something Wrong Ocurred. Try Again Later" });
    }
}