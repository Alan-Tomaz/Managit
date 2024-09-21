import mongoose from "mongoose";

const SupplierSchema = new mongoose.Schema(
    {
        supplierName: {
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

const Supplier = mongoose.model('Supplier', SupplierSchema);
export default Supplier;