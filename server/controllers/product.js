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

                const savedProduct = await newProduct.save()
                console.log(savedProduct);
                res.status(201).json({ product: savedProduct });
            }
        }

    } catch (error) {
        console.log(error.message)
        /* DELETE THE UPLOADED FILE */
        fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
        res.status(500).json({ error: 'Something Wrong Ocurred. Try Again Later' })
    }
}