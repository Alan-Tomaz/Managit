import mongoose from "mongoose";

const LogSchema = new mongoose.Schema(
    {
        seqNum: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true
        },
        notification: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        userGuilty: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    { timestamps: true }
);

const Log = mongoose.model("Log", LogSchema);
export default Log;
