import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true
        },
        productSupplier: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Supplier",
            required: true
        },
        productCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },
        sellPrice: {
            type: Number,
            required: true
        },
        stock: {
            type: Number,
            required: true,
            default: 0
        },
        description: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true,
            enum: ['in stock', "out of stock"],
            default: "out of stock"
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