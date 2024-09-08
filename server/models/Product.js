import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },

    },
    { timestamps: true }
);

const Product = mongoose.model('Product', ProductSchema);
export default Product;