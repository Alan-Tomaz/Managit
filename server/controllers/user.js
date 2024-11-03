import User from "../models/User.js";
import fs from "fs";
import bcrypt from "bcrypt";
import { createLogMiddleware } from './log.js';

/* CREATE USER */
export const createUser = async (req, res) => {
    try {
        const {
            name,
            email,
            phoneNumber,
            birthDate,
            location,
            description,
            password,
            picturePath,
            countryCode,
            adminLevel,
            blocked,
        } = req.body;

        const filePath = `./public/assets/${picturePath}`;

        /* FORM VALIDATION */
        const birthRegex = new RegExp('^\\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2^([0-2][0-9]|(3)[0-1])$');

        const phoneRegex1 = new RegExp('\\(?([0-9]{3})\\)?([ .-]?)([0-9]{3})-([0-9]{4})');
        /* BRAZIL FORMAT */
        const phoneRegex2 = new RegExp('\\(?([0-9]{2})\\)?([ .-]?)9?([ .-]?)([0-9]{4})([ .-]?)([0-9]{4})');

        const passRegex1 = new RegExp('[a-z]', 'g');
        const passRegex2 = new RegExp('[A-Z]', 'g');
        const passRegex3 = new RegExp('[0-9]', 'g');
        const passRegex4 = new RegExp('[^A-Za-z0-9]', 'g');

        const emailRegex = new RegExp('^(([^<>()[\\]\\\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\"]+)*)|(\\".+\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');

        if ((name == "" || name == undefined) || (email == "" || email == undefined) || (phoneNumber == "" || phoneNumber == undefined) || (birthDate == "" || birthDate == undefined) || (location == "" || location == undefined) || (description == "" || description == undefined) || (picturePath == "" || picturePath == undefined) || (password == "" || password == undefined) || (countryCode == "" || countryCode == undefined) || (adminLevel == "" || adminLevel == undefined) || (blocked == "" || blocked == undefined)) {
            res.status(401).json({ status: 401, msg: "Fill All Fields!" });
            /* DELETE THE UPLOADED FILE */
            fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
        }

        else if (!emailRegex.test(email)) {
            res.status(401).json({ status: 401, msg: "Invalid Email!" });
            /* DELETE THE UPLOADED FILE */
            fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
        }

        else if (!phoneRegex1.test(phoneNumber) && (!phoneRegex2.test(phoneNumber))) {
            res.status(401).json({ status: 401, msg: "Incorret Phone Number" });
            /* DELETE THE UPLOADED FILE */
            fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
        }

        else if (name.length > 15) {
            res.status(401).json({ status: 401, msg: "Name too Large" });
            /* DELETE THE UPLOADED FILE */
            fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
        }

        else if (location.length < 8) {
            res.status(401).json({ status: 401, msg: "Location Too Short" });
            /* DELETE THE UPLOADED FILE */
            fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
        }

        else if (description.length < 8) {
            res.status(401).json({ status: 401, msg: "Description Too Short" });
            /* DELETE THE UPLOADED FILE */
            fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
        }

        else if (password.length < 8) {
            res.status(401).json({ status: 401, msg: "Password Too Short" });
            /* DELETE THE UPLOADED FILE */
            fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
        }

        else if (!birthRegex.test(birthDate)) {
            res.status(401).json({ status: 401, msg: "Birth Date Format Incorret" });
            /* DELETE THE UPLOADED FILE */
            fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
        }

        else if (!passRegex1.test(password)) {
            res.status(401).json({ status: 401, msg: "The password must contain at least one lowercase letter" });
            /* DELETE THE UPLOADED FILE */
            fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
        }

        else if (!passRegex2.test(password)) {
            res.status(401).json({ status: 401, msg: "The password must contain at least one uppercase letter" });
            /* DELETE THE UPLOADED FILE */
            fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
        }

        else if (!passRegex3.test(password)) {
            res.status(401).json({ status: 401, msg: "The password must contain at least one number" });
            /* DELETE THE UPLOADED FILE */
            fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
        }

        else if (!passRegex4.test(password)) {
            res.status(401).json({ status: 401, msg: "The password must contain at least one special symbol" });
            /* DELETE THE UPLOADED FILE */
            fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
        }

        else {

            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt)

            const newUser = new User({
                name,
                email,
                phoneNumber: `+${countryCode} ${phoneNumber}`,
                birthDate,
                location,
                description,
                password: passwordHash,
                picturePath,
                adminLevel,
                blocked
            })

            const userFinded = await User.findOne({ email: email });

            if (userFinded) {
                res.status(401).json({ status: 401, msg: "User Already Exists" });
                /* DELETE THE UPLOADED FILE */
                fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
            } else {
                const savedUser = await newUser.save()

                /* LOG PARAMETERS */
                req.body.info = savedUser;
                req.body.type = "create-user";

                res.status(201).json({ status: 201 });

                setTimeout(() => {
                    createLogMiddleware(req);
                }, 0)
            }
        }
    }
    catch (err) {
        console.log(err.message);
        /* DELETE THE UPLOADED FILE */
        fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
        res.status(500).json({ status: 500, msg: "Something Wrong Ocurred. Try Again Later." });
    }
}

/* GET YOUR PROFILE */
export const getYourProfile = async (req, res) => {
    try {

        const userData = await User.findById(req.body.userId);
        res.status(200).json({ userData });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Something Wrong Ocurred. Try Again Later" });
    }
}

/* GET USERS */
export const getUsers = async (req, res) => {
    try {

        const { page = 1, limit = 10, search, name } = req.query;

        const yourUser = await User.findById(req.body.userId);

        const filters = { email: { $ne: yourUser.email } };


        if (search) {
            filters.name = { ...filters.name, $regex: search, $options: 'i' };
        }

        const usersData = await User.find(filters)
            .sort({ name: 1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const totalUsers = await User.countDocuments(filters);

        res.status(200).json({ usersData, totalUsers });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Something Wrong Ocurred. Try Again Later" });
    }
}

/* UPDATE USER */
export const updateYourUser = async (req, res) => {
    try {
        const {
            name,
            email,
            phoneNumber,
            birthDate,
            location,
            description,
            password,
            picturePath,
            countryCode,
            adminLevel,
            blocked,
        } = req.body

        const { id } = req.params;

        const filePath = `./public/assets/${picturePath}`;

        const updateObj = {};

        /* FORM VALIDATION */

        if (name) {
            if (name == "" || name == undefined) {
                return res.status(401).json({ status: 401, msg: "Inform the new Name!" });
            }

            if (name.length > 15) {
                return res.status(401).json({ status: 401, msg: "Name too Large" });
            }

            updateObj.name = name;
        }

        if (email) {
            const emailRegex = new RegExp('^(([^<>()[\\]\\\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\"]+)*)|(\\".+\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');

            if (email == "" || email == undefined) {
                return res.status(401).json({ status: 401, msg: "Inform the new Email!" });
            }

            if (!emailRegex.test(email)) {
                return res.status(401).json({ status: 401, msg: "Invalid Email!" });
            }

            const userFinded = await User.findOne({ email: email });
            if (userFinded && userFinded._id != id) {
                return res.status(401).json({ status: 401, msg: "User Already Exists" });
            }

            updateObj.email = email;
        }


        if (phoneNumber || countryCode) {
            const phoneRegex1 = new RegExp('\\(?([0-9]{3})\\)?([ .-]?)([0-9]{3})-([0-9]{4})');
            /* BRAZIL FORMAT */
            const phoneRegex2 = new RegExp('\\(?([0-9]{2})\\)?([ .-]?)9?([ .-]?)([0-9]{4})([ .-]?)([0-9]{4})');

            if ((phoneNumber == "" || phoneNumber == undefined) || (countryCode == "" || countryCode == undefined)) {
                return res.status(401).json({ status: 401, msg: "Inform the new Phone Number!" });
            }

            if (!phoneRegex1.test(phoneNumber) && (!phoneRegex2.test(phoneNumber))) {
                return res.status(401).json({ status: 401, msg: "Incorret Phone Number" });
            }

            updateObj.phoneNumber = `+${countryCode} ${phoneNumber}`;
        }

        if (birthDate) {

            const birthRegex = new RegExp('^\\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2^([0-2][0-9]|(3)[0-1])$');

            if (birthDate == "" || birthDate == undefined) {
                return res.status(401).json({ status: 401, msg: "Inform the new Birth Date!" });
            }

            if (!birthRegex.test(birthDate)) {
                return res.status(401).json({ status: 401, msg: "Birth Date Format Incorret" });
            }

            updateObj.birthDate = birthDate;
        }


        if (password) {
            const passRegex1 = new RegExp('[a-z]', 'g');
            const passRegex2 = new RegExp('[A-Z]', 'g');
            const passRegex3 = new RegExp('[0-9]', 'g');
            const passRegex4 = new RegExp('[^A-Za-z0-9]', 'g');

            if (password == "" || password == undefined) {
                return res.status(401).json({ status: 401, msg: "Inform the new Password!" });
            }

            if (password.length < 8) {
                return res.status(401).json({ status: 401, msg: "Password Too Short" });
            }

            if (!passRegex1.test(password)) {
                return res.status(401).json({ status: 401, msg: "The password must contain at least one lowercase letter" });
            }

            if (!passRegex2.test(password)) {
                return res.status(401).json({ status: 401, msg: "The password must contain at least one uppercase letter" });
            }

            if (!passRegex3.test(password)) {
                return res.status(401).json({ status: 401, msg: "The password must contain at least one number" });
            }

            if (!passRegex4.test(password)) {
                return res.status(401).json({ status: 401, msg: "The password must contain at least one special symbol" });
            }

            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt)

            updateObj.password = passwordHash;
        }

        if (picturePath) {
            if (picturePath == "" || picturePath == undefined) {
                /* DELETE THE UPLOADED FILE */
                fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
                return res.status(401).json({ status: 401, msg: "Image Not Received Correctly" });
            }

            updateObj.picturePath = picturePath;
        }

        if (location) {

            if (location == "" || location == undefined) {
                return res.status(401).json({ status: 401, msg: "Inform the new location!" });
            }

            if (location.length < 8) {
                return res.status(401).json({ status: 401, msg: "Location Too Short" });
            }

            updateObj.location = location;
        }

        if (description) {

            if (description == "" || description == undefined) {
                return res.status(401).json({ status: 401, msg: "Inform the new location!" });
            }

            if (description.length < 8) {
                return res.status(401).json({ status: 401, msg: "Description Too Short" });
            }

            updateObj.description = description;
        }

        if (adminLevel !== undefined) {
            if (adminLevel === "" || adminLevel === undefined) {
                return res.status(401).json({ status: 401, msg: "Inform the new user permission!" });
            }

            updateObj.adminLevel = adminLevel;
        }

        if (blocked !== undefined) {
            if (blocked === "" || blocked === undefined) {
                return res.status(401).json({ status: 401, msg: "Inform if the user is Blocked!" });
            }

            updateObj.blocked = blocked;
        }

        if (req.body.userId != id) {
            return res.status(401).json({ error: "You Not Update a Other User" });
        }

        const userFinded = await User.findById(id);

        if (!userFinded) {
            res.status(401).json({ status: 401, msg: "User Not Finded" });
            /* DELETE THE UPLOADED FILE */
            if (picturePath) {
                fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
            }
        } else {
            const oldFilePath = `./public/assets/${userFinded.picturePath}`;
            if (picturePath) {
                fs.unlink(oldFilePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
            }
            const result = await User.findByIdAndUpdate(id, updateObj, { new: true });
            res.status(201).json({ result });
        }

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Something Wrong Ocurred. Try Again Later" });
    }
}

export const updateUser = async (req, res) => {
    try {
        const {
            name,
            email,
            phoneNumber,
            birthDate,
            location,
            description,
            password,
            picturePath,
            countryCode,
            adminLevel,
            blocked,
        } = req.body

        const { id } = req.params;

        const filePath = `./public/assets/${picturePath}`;

        /* FORM VALIDATION */
        const birthRegex = new RegExp('^\\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2^([0-2][0-9]|(3)[0-1])$');

        const phoneRegex1 = new RegExp('\\(?([0-9]{3})\\)?([ .-]?)([0-9]{3})-([0-9]{4})');
        /* BRAZIL FORMAT */
        const phoneRegex2 = new RegExp('\\(?([0-9]{2})\\)?([ .-]?)9?([ .-]?)([0-9]{4})([ .-]?)([0-9]{4})');

        const passRegex1 = new RegExp('[a-z]', 'g');
        const passRegex2 = new RegExp('[A-Z]', 'g');
        const passRegex3 = new RegExp('[0-9]', 'g');
        const passRegex4 = new RegExp('[^A-Za-z0-9]', 'g');

        const emailRegex = new RegExp('^(([^<>()[\\]\\\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\"]+)*)|(\\".+\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');

        if ((name == "" || name == undefined) || (email == "" || email == undefined) || (phoneNumber == "" || phoneNumber == undefined) || (birthDate == "" || birthDate == undefined) || (location == "" || location == undefined) || (description == "" || description == undefined) || (countryCode == "" || countryCode == undefined) || (adminLevel === "" || adminLevel === undefined) || (blocked === "" || blocked === undefined)) {
            res.status(401).json({ status: 401, msg: "Fill All Fields!" });
            /* DELETE THE UPLOADED FILE */
            fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
        }

        else if (!emailRegex.test(email)) {
            res.status(401).json({ status: 401, msg: "Invalid Email!" });
            /* DELETE THE UPLOADED FILE */
            fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
        }

        else if (!phoneRegex1.test(phoneNumber) && (!phoneRegex2.test(phoneNumber))) {
            res.status(401).json({ status: 401, msg: "Incorret Phone Number" });
            /* DELETE THE UPLOADED FILE */
            fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
        }

        else if (name.length > 15) {
            res.status(401).json({ status: 401, msg: "Name too Large" });
            /* DELETE THE UPLOADED FILE */
            fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
        }

        else if (location.length < 8) {
            res.status(401).json({ status: 401, msg: "Location Too Short" });
            /* DELETE THE UPLOADED FILE */
            fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
        }

        else if (description.length < 8) {
            res.status(401).json({ status: 401, msg: "Description Too Short" });
            /* DELETE THE UPLOADED FILE */
            fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
        }

        else if (!birthRegex.test(birthDate)) {
            res.status(401).json({ status: 401, msg: "Birth Date Format Incorret" });
            /* DELETE THE UPLOADED FILE */
            fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
        }

        else if (req.body.userId == id) {
            return res.status(401).json({ error: "You Not Can Upload Yourself Here" });
        }
        else {

            const userEmailFinded = await User.findOne({ email: email });

            if (userEmailFinded && userEmailFinded._id != id) {
                return res.status(401).json({ error: "The Email Alread Exists" });
            }


            const updateUser = {
                name,
                email,
                phoneNumber: `+${countryCode} ${phoneNumber}`,
                birthDate,
                location,
                description,
                picturePath,
                adminLevel,
                blocked
            }

            if (password != undefined && password != "") {

                if (password.length < 8) {
                    /* DELETE THE UPLOADED FILE */
                    fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
                    return res.status(401).json({ status: 401, msg: "Password Too Short" });
                }
                if (!passRegex1.test(password)) {
                    /* DELETE THE UPLOADED FILE */
                    fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
                    return res.status(401).json({ status: 401, msg: "The password must contain at least one lowercase letter" });
                }

                if (!passRegex2.test(password)) {
                    /* DELETE THE UPLOADED FILE */
                    fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
                    return res.status(401).json({ status: 401, msg: "The password must contain at least one uppercase letter" });
                }

                if (!passRegex3.test(password)) {
                    /* DELETE THE UPLOADED FILE */
                    fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
                    return res.status(401).json({ status: 401, msg: "The password must contain at least one number" });
                }

                if (!passRegex4.test(password)) {
                    /* DELETE THE UPLOADED FILE */
                    fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
                    return res.status(401).json({ status: 401, msg: "The password must contain at least one special symbol" });
                }

                const salt = await bcrypt.genSalt();
                const passwordHash = await bcrypt.hash(password, salt)

                updateUser.password = passwordHash;
            }

            if (picturePath != undefined && picturePath != "") {
                updateUser.picturePath = picturePath;
            }


            const userFinded = await User.findById(id);


            if (!userFinded) {
                res.status(401).json({ status: 401, msg: "User Not Finded" });
                /* DELETE THE UPLOADED FILE */
                fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
            } else {
                if (picturePath != undefined && picturePath != "") {
                    const oldFilePath = `./public/assets/${userFinded.picturePath}`;
                    /* Erase the old picture file */
                    fs.unlink(oldFilePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
                }
                const result = await User.findByIdAndUpdate(id, updateUser);

                /* LOG PARAMETERS */
                req.body.info = result;
                req.body.type = "update-user";

                res.status(201).json({ status: 201 });

                setTimeout(() => {
                    createLogMiddleware(req);
                }, 0)
            }
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Something Wrong Ocurred. Try Again Later" });
    }
}

/* DELETE MANY USERS */
export const deleteManyUsers = async (req, res) => {
    try {
        res.status(404).json({ error: "Due to the nature of the vercel platform, deleting items with images should not be done." });
        /* const { idsToDelete } = req.query;

        if (idsToDelete.indexOf(req.body.userId) > 0) {
            return res.status(404).json({ error: "You cannot delete your own User" });
        }

        const usersToDelete = await User.find({ _id: { $in: idsToDelete } })


        const result = await User.deleteMany({
            _id: { $in: idsToDelete }

        });

        if (!result) {
            return res.status(404).json({ error: "Users not Found" });
        } else {
            usersToDelete.map((user, index) => {
                const filePath = `./public/assets/${user.picturePath}`;
                fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log(`File ${index + 1} is Deleted`) } });
            })
 */
        /* LOG PARAMETERS */
        /*     req.body.info = usersToDelete;
            req.body.type = "delete-many-users";

            res.status(200).json({ msg: "Users Successfully Deleted" });

            setTimeout(() => {
                createLogMiddleware(req);
            }, 0)
        } */

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something Wrong Ocurred. Try Again Later" });
    }
}

/* DELETE USER */
export const deleteUser = async (req, res) => {
    try {
        res.status(404).json({ error: "Due to the nature of the vercel platform, deleting items with images should not be done." });
        /* const { id } = req.params;

        if (id == req.body.userId) {
            return res.status(404).json({ error: "You cannot delete your own User" });
        }

        const user = await User.findById(id);

        const result = await User.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ error: "User not Found" });
        } else {
            const filePath = `./public/assets/${user.picturePath}`; */
        /* Erase the old picture file */
        /*             fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
         */
        /* LOG PARAMETERS */
        /*  req.body.info = user;
         req.body.type = "delete-user";

         res.status(200).json({ msg: "User Successfully Deleted" });

         setTimeout(() => {
             createLogMiddleware(req);
         }, 0)
     } */

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Something Wrong Ocurred. Try Again Later" });
    }
}
