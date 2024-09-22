import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true
        },
        productSupplier: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "suppliers",
            required: true
        },
        productCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "categories",
            required: true
        },
        sellPrice: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        picturePath: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const Product = mongoose.model('Product', ProductSchema);
export default Product;