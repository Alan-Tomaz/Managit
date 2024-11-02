import Product from '../models/Product.js';
import Order from '../models/Order.js';
import Supplier from '../models/Supplier.js';
import { createLogMiddleware } from './log.js';

/* CREATE SUPPLIER */
export const createSupplier = async (req, res) => {
    try {
        const {
            supplierName,
            supplierDesc
        } = req.body

        if ((supplierName == undefined || supplierName == '') || (supplierDesc == undefined || supplierDesc == '')) {
            res.status(401).json({ error: "Fill All Fields!" });
        } else if (supplierName.length > 16) {
            res.status(401).json({ error: "Supplier Name Too Long!" });
        } else if (supplierDesc.length > 50) {
            res.status(401).json({ error: "Description Too Long!" });
        }
        else {
            const newSupplierName = `${supplierName[0].toUpperCase()}${supplierName.slice(1)}`;

            const newSupplier = new Supplier({
                supplierName: newSupplierName,
                description: supplierDesc
            })

            const supplierFinded = await Supplier.findOne({ supplierName: newSupplierName });

            if (supplierFinded) {
                res.status(401).json({ error: "Supplier Already Exists" });
            } else {

                const savedSupplier = await newSupplier.save()

                /* LOG PARAMETERS */
                req.body.info = savedSupplier;
                req.body.type = "create-supplier";

                res.status(201).json({ supplier: savedSupplier });

                setTimeout(() => {
                    createLogMiddleware(req);
                }, 0);
            }
        }

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Something Wrong Ocurred. Try Again Later' })
    }
}

/* GET SUPPLIER */
export const getSupplier = async (req, res) => {
    try {

        const { page = 1, limit = 10, search, suppliers } = req.query;

        const filters = {};

        if (search) {
            filters.supplierName = { ...filters.supplierName, $regex: search, $options: 'i' };
        }

        const suppliersData = await Supplier.find(filters)
            .sort({ supplierName: 1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const totalSuppliers = await Supplier.countDocuments(filters);

        res.status(200).json({ suppliersData, totalSuppliers });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Something Wrong Ocurred. Try Again Later" });
    }
}

/* UPDATE SUPPLIER */
export const updateSupplier = async (req, res) => {
    try {
        const {
            supplierName,
            supplierDesc
        } = req.body

        const { id } = req.params;

        if ((supplierName == '' || supplierName == undefined) || (supplierDesc == '' || supplierDesc == undefined)) {
            return res.status(401).send({ error: "Fill All Fields" })
        } else if (supplierName.length > 12) {
            res.status(401).json({ error: "Supplier Name Too Long!" });
        } else if (supplierDesc.length > 50) {
            res.status(401).json({ error: "Description Too Long!" });
        }
        else {
            const newSupplierName = `${supplierName[0].toUpperCase()}${supplierName.slice(1)}`;

            const supplierFinded = await Supplier.findOne({ supplierName: newSupplierName });

            if (supplierFinded && supplierFinded._id != id) {
                res.status(401).json({ error: "Supplier Already Exists" });
            } else {
                const result = await Supplier.findByIdAndUpdate(id, { supplierName: newSupplierName, description: supplierDesc });
                if (!result) {
                    return res.status(404).json({ error: "Supplier Not Found" })
                } else {

                    /* LOG PARAMETERS */
                    req.body.info = result;
                    req.body.type = "update-supplier";

                    res.status(200).send({ supplier: result })

                    setTimeout(() => {
                        createLogMiddleware(req);
                    }, 0);
                }
            }
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Something Wrong Ocurred. Try Again Later" });
    }
}

/* DELETE MANY SUPPLIERS */
export const deleteManySuppliers = async (req, res) => {
    try {
        const { idsToDelete } = req.query;

        const suppliersToDelete = await Supplier.find({ _id: { $in: idsToDelete } })

        for (let i = 0; i < suppliersToDelete.length; i++) {
            const itemDependent = await Product.findOne({ productSupplier: suppliersToDelete[i]._id });
            const itemDependent2 = await Order.findOne({ orderSupplier: suppliersToDelete[i]._id });

            if (itemDependent || itemDependent2) {
                return res.status(404).json({ error: `The supplier ${suppliersToDelete[i].supplierName} cannot be deleted because it is linked to other records.` });
            }

        }

        const result = await Supplier.deleteMany({
            _id: { $in: idsToDelete }
        });

        if (!result) {
            return res.status(404).json({ error: "Suppliers not Found" });
        } else {
            /* LOG PARAMETERS */
            req.body.info = suppliersToDelete;
            req.body.type = "delete-many-suppliers";

            res.status(200).json({ msg: "Suppliers Successfully Deleted" });

            setTimeout(() => {
                createLogMiddleware(req);
            }, 0)
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something Wrong Ocurred. Try Again Later" });
    }
}

/* DELETE SUPPLIER */
export const deleteSupplier = async (req, res) => {
    try {
        const { id } = req.params;

        const supplierToDelete = await Supplier.findById(id)

        const itemDependent = await Product.findOne({ productSupplier: supplierToDelete._id });
        const itemDependent2 = await Order.findOne({ orderSupplier: supplierToDelete._id });

        if (itemDependent || itemDependent2) {
            return res.status(404).json({ error: `The supplier ${supplierToDelete.supplierName} cannot be deleted because it is linked to other records.` });
        }

        const result = await Supplier.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ error: "Supplier not Found" });
        } else {
            /* LOG PARAMETERS */
            req.body.info = supplierToDelete;
            req.body.type = "delete-supplier";

            res.status(200).json({ msg: "Supplier Successfully Deleted" });

            setTimeout(() => {
                createLogMiddleware(req);
            }, 0)
        }

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Something Wrong Ocurred. Try Again Later" });
    }
}