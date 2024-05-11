import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import { register } from "./controllers/auth.js";
import multer from "multer";

/* CONFIG */
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
})
const upload = multer({ storage })

/* ROUTES WITH FILES */
app.post('/file', upload.single('file'), (req, res) => res.status(500).json({ msg: "File Successfully Updated", file: req.file }))
app.post('/auth/register', upload.single('avatar'), register);

/* ROUTES */
app.get("/", (req, res) => res.status(500).json({ msg: "Hello World!" }));
app.use("/auth", authRoutes);

/* MONGOOSE SETUP */
/* Server PORT */
const port = process.env.PORT || 3000;
/* CONNECT DATABASE */
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Database Connected");
        /* SERVER START */
        app.listen(port, () => {
            console.log(`App is Listening to port: ${port}`);
        })
    }).catch((err) => {
        console.log(err)
    })