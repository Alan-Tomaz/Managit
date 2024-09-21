import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import categoryRoutes from './routes/category.js';
import supplierRoutes from './routes/supplier.js';
import { register } from "./controllers/auth.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

/* CONFIG */
const app = express();
/* USE ENV FILES */
dotenv.config();
/* USE JSON REQUESTS */
app.use(express.json());
/* CORS RULES */
app.use(cors());
/* GET THE DIRECTORY */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/* DEFINE THIS DIRECTORY TO BE PUBLIC FOR USERS */
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets/')
    },
    filename: function (req, file, cb) {
        let fileType = file.originalname.split('.');
        fileType = fileType[fileType.length - 1];
        const supportedFiles = ["jpg", "jpeg", "png"];

        if (supportedFiles.includes(fileType)) {
            const pictureName = Date.now() + '-' + file.originalname;
            req.body.picturePath = pictureName;
            cb(null, pictureName);
        } else {
            cb(new Error('File Type Not Supported'))
        }
    }
})
const upload = multer({ storage, limits: { fileSize: 2000000 } })

/* ROUTES WITH FILES */
app.post('/auth/register', upload.single('picture'), register);

/* ROUTES */
app.get("/", (req, res) => res.status(200).json({ status: 200, msg: "Hello World!" }));
app.post("/", (req, res) => res.status(200).json({ status: 200, msg: "Hello World!" }));
app.use("/auth", authRoutes);
app.use('/category', categoryRoutes)
app.use('/supplier', supplierRoutes)

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