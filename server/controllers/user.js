import User from "../models/User.js";
import fs from "fs";
import bcrypt from "bcrypt";

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

        if ((name == "" || name == undefined) || (email == "" || email == undefined) || (phoneNumber == "" || phoneNumber == undefined) || (birthDate == "" || birthDate == undefined) || (location == "" || location == undefined) || (description == "" || description == undefined) || (password == "" || password == undefined) || (countryCode == "" || countryCode == undefined) || (adminLevel == "" || adminLevel == undefined) || (blocked == "" || blocked == undefined)) {
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
                console.log(savedUser);
                res.status(201).json({ status: 201 });
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

/* GET USERS */
export const getUsers = async (req, res) => {
    try {

        const { page = 1, limit = 10, search, name } = req.query;

        const filters = {};

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