import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

/* CONFIG */
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

/* ROUTES */
app.get('/', (req, res) => {
    res.status(200).json({ msg: "OK" });
})

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