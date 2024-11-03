import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import categoryRoutes from './routes/category.js';
import supplierRoutes from './routes/supplier.js';
import productRoutes from './routes/product.js';
import orderRoutes from './routes/order.js';
import userRoutes from './routes/user.js';
import logRoutes from './routes/log.js';
import path from "path";
import { fileURLToPath } from "url";

/* CONFIG */
const app = express();
/* USE ENV FILES */
dotenv.config();
/* USE JSON REQUESTS */
app.use(express.json());
/* CORS RULES */
app.use(cors({
    origin: ["https://managit-dun.vercel.app"],
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
    credentials: true
}
));
/* GET THE DIRECTORY */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/* DEFINE THIS DIRECTORY TO BE PUBLIC FOR USERS */
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* ROUTES */
app.get("/", (req, res) => res.status(200).json({ status: 200, msg: "Hello World!" }));
app.post("/", (req, res) => res.status(200).json({ status: 200, msg: "Hello World!" }));
app.use("/auth", authRoutes);
app.use('/category', categoryRoutes);
app.use('/supplier', supplierRoutes);
app.use('/product', productRoutes);
app.use('/order', orderRoutes);
app.use('/user', userRoutes);
app.use('/log', logRoutes);

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