import Category from '../models/Category.js';
import Product from '../models/Product.js';
import Supplier from '../models/Supplier.js';
import fs from "fs";

/* CREATE PRODUCT */
export const createProduct = async (req, res) => {
    try {
        const {
            productName,
            productSupplier,
            productCategory,
            sellPrice,
            description,
            picturePath
        } = req.body

        const filePath = `./public/assets/${picturePath}`;

        if ((productName == undefined || productName == '') || (productSupplier == undefined || productSupplier == '') || (productCategory == undefined || productCategory == '') || (sellPrice == undefined || sellPrice == '') || (description == undefined || description == '') || (picturePath == undefined || picturePath == '')) {
            res.status(401).json({ error: "Fill All Fields!" });
            /* DELETE THE UPLOADED FILE */
            fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
        } else if (productName.length > 30) {
            res.status(401).json({ error: "Product Name Too Long!" });
            /* DELETE THE UPLOADED FILE */
            fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
        } else if (description.length > 50) {
            res.status(401).json({ error: "Description Too Long!" });
            /* DELETE THE UPLOADED FILE */
            fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
        } else if (sellPrice > 200) {
            res.status(401).json({ error: "Sell Price Very Expensive!" });
            /* DELETE THE UPLOADED FILE */
            fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
        }
        else {

            const categoryFinded = await Category.findOne({ _id: productCategory });
            const supplierFinded = await Supplier.findOne({ _id: productSupplier });

            if (categoryFinded == null) {
                res.status(401).json({ error: "Category Does Not Exists" });
                /* DELETE THE UPLOADED FILE */
                fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
            } else if (supplierFinded == null) {
                res.status(401).json({ error: "Supplier Does Not Exists" });
                /* DELETE THE UPLOADED FILE */
                fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
            } else {

                const newProduct = new Product({
                    productName,
                    productSupplier: productSupplier,
                    productCategory: productCategory,
                    sellPrice,
                    description,
                    picturePath
                })

                const productFinded = await Product.findOne({ productName })

                if (productFinded) {
                    res.status(401).json({ error: "Product Already Exists" });
                    fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
                } else {
                    const savedProduct = await newProduct.save()
                    console.log(savedProduct);
                    res.status(201).json({ product: savedProduct });
                }
            }
        }

    } catch (error) {

        console.log(error.message)
        /* DELETE THE UPLOADED FILE */
        const filePath = `./public/assets/${req.body.picturePath}`;
        fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
        res.status(500).json({ error: 'Something Wrong Ocurred. Try Again Later' })
    }
}

/* GET PRODUCTS */
export const getProducts = async (req, res) => {
    try {

        const { page = 1, limit = 10, search, categories } = req.query;

        const filters = {};

        if (search) {
            filters.productName = { ...filters.productName, $regex: search, $options: 'i' };
        }

        const productsData = await Product.find(filters)
            .populate('productCategory')
            .populate('productSupplier')
            .sort({ productName: 1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const totalProducts = await Product.countDocuments(filters);

        res.status(200).json({ productsData, totalProducts });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Something Wrong Ocurred. Try Again Later" });
    }
}

/* UPDATE PRODUCT */
export const updateProduct = async (req, res) => {
    try {
        const {
            productName,
            productSupplier,
            productCategory,
            sellPrice,
            description,
            picturePath
        } = req.body

        const { id } = req.params;

        const filePath = `./public/assets/${picturePath}`;

        if ((productName == undefined || productName == '') || (productSupplier == undefined || productSupplier == '') || (productCategory == undefined || productCategory == '') || (sellPrice == undefined || sellPrice == '') || (description == undefined || description == '')) {
            res.status(401).json({ error: "Fill All Fields!" });
            /* DELETE THE UPLOADED FILE */
            if (picturePath != undefined) {
                fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
            }
        } else if (productName.length > 30) {
            res.status(401).json({ error: "Product Name Too Long!" });
            /* DELETE THE UPLOADED FILE */
            if (picturePath != undefined) {
                fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
            }
        } else if (description.length > 50) {
            res.status(401).json({ error: "Description Too Long!" });
            /* DELETE THE UPLOADED FILE */
            if (picturePath != undefined) {
                fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
            }
        } else if (sellPrice > 200) {
            res.status(401).json({ error: "Sell Price Very Expensive!" });
            /* DELETE THE UPLOADED FILE */
            if (picturePath != undefined) {
                fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
            }
        }
        else {
            const categoryFinded = await Category.findOne({ _id: productCategory });
            const supplierFinded = await Supplier.findOne({ _id: productSupplier });

            if (categoryFinded == null) {
                res.status(401).json({ error: "Category Does Not Exists" });
                /* DELETE THE UPLOADED FILE */
                if (picturePath != undefined) {
                    fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
                }
            } else if (supplierFinded == null) {
                res.status(401).json({ error: "Supplier Does Not Exists" });
                /* DELETE THE UPLOADED FILE */
                if (picturePath != undefined) {
                    fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
                }
            } else {

                const productFinded = await Product.findOne({ productName });

                if (productFinded && productFinded._id != id) {
                    res.status(401).json({ error: "Product Already Exists" });
                    if (picturePath != undefined) {
                        fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
                    }
                } else {

                    const oldProduct = await Product.findById(id);

                    const newProductValues =
                    {
                        productName,
                        productSupplier,
                        productCategory,
                        sellPrice,
                        description
                    };
                    if (picturePath != undefined) {
                        newProductValues.picturePath = picturePath;
                    }

                    const result = await Product.findByIdAndUpdate(id, newProductValues);
                    if (!result) {
                        return res.status(404).json({ error: "Product Not Found" })
                    } else {
                        if (picturePath != undefined) {
                            fs.unlink(`./public/assets/${oldProduct.picturePath}`, (err) => { if (err) { console.log(err) } else { console.log("Old File is Deleted") } });
                        }
                        return res.status(200).send({ product: result })
                    }
                }
            }
        }
    } catch (error) {
        if (req.body.picturePath != undefined) {
            const filePath = `./public/assets/${req.body.picturePath}`;
            fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
        }
        console.log(error.message)
        res.status(500).json({ error: "Something Wrong Ocurred. Try Again Later" });
    }
}

/* DELETE MANY PRODUCTS */
export const deleteManyProducts = async (req, res) => {
    try {
        const { idsToDelete } = req.query;

        const productsToDelete = await Product.find({ _id: { $in: idsToDelete } })

        const result = await Product.deleteMany({
            _id: { $in: idsToDelete }
        });

        if (!result) {
            return res.status(404).json({ error: "Products not Found" });
        } else {
            productsToDelete.map((product, index) => {
                const filePath = `./public/assets/${product.picturePath}`;
                fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log(`File ${index + 1} is Deleted`) } });
            })
            return res.status(200).json({ msg: "Products Successfully Deleted" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something Wrong Ocurred. Try Again Later" });
    }
}

/* DELETE PRODUCT */
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        const result = await Product.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ error: "Product not Found" });
        } else {
            const filePath = `./public/assets/${product.picturePath}`;
            fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
            return res.status(200).json({ msg: "Product Successfully Deleted" });
        }

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Something Wrong Ocurred. Try Again Later" });
    }
}
