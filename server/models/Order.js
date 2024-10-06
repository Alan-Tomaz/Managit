import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ['buy', 'sale'],
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ['in progress', 'finished', "cancelled"],
            required: true
        },
        orderSupplier: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Supplier",
            required: true
        },
        products: [{
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Referência ao Produto
            quantity: { type: Number, required: true }
        }],
        description: {
            type: String,
            required: true
        },
        uniqueId: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

const Order = mongoose.model("Order", OrderSchema);
export default Order;