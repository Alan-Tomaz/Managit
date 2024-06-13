import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
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
            countryCode
        } = req.body;


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

        if ((name == "" || name == undefined) || (email == "" || email == undefined) || (phoneNumber == "" || phoneNumber == undefined) || (birthDate == "" || birthDate == undefined) || (location == "" || location == undefined) || (description == "" || description == undefined) || (password == "" || password == undefined) || (countryCode == "" || countryCode == undefined)) {
            res.status(401).json({ status: 401, msg: "Fill All Fields!" });
        }

        else if (!emailRegex.test(email)) {
            res.status(401).json({ status: 401, msg: "Invalid Email!" });
        }

        else if (!phoneRegex1.test(phoneNumber) && (!phoneRegex2.test(phoneNumber))) {
            res.status(401).json({ status: 401, msg: "Incorret Phone Number" });
        }

        else if (location.length < 8) {
            res.status(401).json({ status: 401, msg: "Location Too Short" });
        }

        else if (description.length < 8) {
            res.status(401).json({ status: 401, msg: "Description Too Short" });
        }

        else if (password.length < 8) {
            res.status(401).json({ status: 401, msg: "Password Too Short" });
        }

        else if (!birthRegex.test(birthDate)) {
            res.status(401).json({ status: 401, msg: "Birth Date Format Incorret" });
        }

        else if (!passRegex1.test(password)) {
            res.status(401).json({ status: 401, msg: "The password must contain at least one lowercase letter" });
        }

        else if (!passRegex2.test(password)) {
            res.status(401).json({ status: 401, msg: "The password must contain at least one uppercase letter" });
        }

        else if (!passRegex3.test(password)) {
            res.status(401).json({ status: 401, msg: "The password must contain at least one number" });
        }

        else if (!passRegex4.test(password)) {
            res.status(401).json({ status: 401, msg: "The password must contain at least one special symbol" });
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
                picturePath: picturePath[0]
            })

            const userFinded = await User.findOne({ email: email });

            if (userFinded) {
                res.status(401).json({ status: 401, msg: "User Already Exists" });
            } else {
                const savedUser = await newUser.save()
                console.log(savedUser);
                res.status(201).json({ status: 201 });
            }
        }
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 500, msg: "Something Wrong Ocurred. Try Again Later." });
    }
}

/* LOGGING IN */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ status: 401, msg: "User doesn't Exists." })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ status: 401, msg: "Invalid Credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(201).json({ status: 201, user, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, msg: "Something Wrong Ocurred. Try Again Later." });
    }
}