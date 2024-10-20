import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        phoneNumber: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
            min: 5,
        },
        picturePath: {
            type: String,
            default: "",
        },
        birthDate: {
            type: Date,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        adminLevel: {
            type: Number,
            default: 0,
            enum: [0, 1]
        },
        blocked: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
