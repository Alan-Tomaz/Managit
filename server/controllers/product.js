import Category from '../models/Category.js';
import Product from '../models/Product.js';
import Supplier from '../models/Supplier.js';
import Order from '../models/Order.js';
import fs from "fs";
import { createLogMiddleware } from './log.js';

/* CREATE PRODUCT */
export const createProduct = async (req, res) => {
    try {
        res.status(201).json({ msg: "Due to the nature of the vercel platform, adding images cannot be done" });
        /*     const {
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
                fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
            } else if (productName.length > 30) {
                res.status(401).json({ error: "Product Name Too Long!" });
                fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
            } else if (description.length > 50) {
                res.status(401).json({ error: "Description Too Long!" });
                fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
            } else if (sellPrice > 200) {
                res.status(401).json({ error: "Sell Price Very Expensive!" });
                fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
            }
            else {
    
                const categoryFinded = await Category.findOne({ _id: productCategory });
                const supplierFinded = await Supplier.findOne({ _id: productSupplier });
    
                if (categoryFinded == null) {
                    res.status(401).json({ error: "Category Does Not Exists" });
                    fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
                } else if (supplierFinded == null) {
                    res.status(401).json({ error: "Supplier Does Not Exists" });
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
    */
        /* LOG PARAMETERS 
        req.body.info = savedProduct;
        req.body.type = "create-product";

        res.status(201).json({ product: savedProduct });

        setTimeout(() => {
            createLogMiddleware(req);
        }, 0);
    }
}
} */

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

        const { page = 1, limit = 10, search, order = 1, searchBy = null, id = null } = req.query;

        const filters = {};

        const sortProducts = order == 0 ? { stock: -1 } : order == 1 ? { productName: 1 } : {};

        if (searchBy != null && id != null) {
            switch (searchBy) {
                case "category":
                    filters.productCategory = id;
                    break;
                case "supplier":
                    filters.productSupplier = id;
                    break;
                case "stock-category":
                    filters.productCategory = id;
                    filters.stock = { $gt: 0 };
                    break;
                case "stock-supplier":
                    filters.productSupplier = id;
                    filters.stock = { $gt: 0 };
                    break;
            }
        }

        if (search) {
            filters.productName = { ...filters.productName, $regex: search, $options: 'i' };
        }

        const productsData = await Product.find(filters)
            .populate('productCategory')
            .populate('productSupplier')
            .sort(sortProducts)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const totalProducts = await Product.countDocuments(filters);

        res.status(200).json({ productsData, totalProducts });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Something Wrong Ocurred. Try Again Later" });
    }
}

/* GET LOW STOCK PRODUCTS */
export const getLowStockProducts = async (req, res) => {
    try {
        const filters = { status: 'out of stock' };

        const productsData = await Product.find(filters)


        const totalProducts = await Product.countDocuments(filters);

        res.status(200).json({ productsData, totalProducts });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Something Wrong Ocurred. Try Again Later" });
    }
}

/* GET STOCK PRODUCTS */
export const getStockProducts = async (req, res) => {
    try {
        const filters = { stock: { $gt: 0 } };

        const productsData = await Product.find(filters)


        const totalProducts = await Product.countDocuments(filters);

        res.status(200).json({ productsData, totalProducts });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Something Wrong Ocurred. Try Again Later" });
    }
}

/* GET RECENTLY ADDED PRODUCTS */
export const getRecentlyAddedProducts = async (req, res) => {
    try {

        const productsData = await Product.find()
            .populate('productCategory')
            .populate('productSupplier')
            .sort({ createdAt: -1 })
            .limit(parseInt(10));

        const totalProducts = await Product.countDocuments();

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
                        return res.status(200).json({ msg: "Due to the nature of the vercel platform, adding images cannot be done" });
                        newProductValues.picturePath = picturePath;
                    }

                    const result = await Product.findByIdAndUpdate(id, newProductValues);
                    if (!result) {
                        return res.status(404).json({ error: "Product Not Found" })
                    } else {
                        if (picturePath != undefined) {
                            fs.unlink(`./public/assets/${oldProduct.picturePath}`, (err) => { if (err) { console.log(err) } else { console.log("Old File is Deleted") } });
                        }
                        /* LOG PARAMETERS */
                        req.body.info = result;
                        req.body.type = "update-product";

                        res.status(200).send({ product: result })

                        setTimeout(() => {
                            createLogMiddleware(req);
                        }, 0)
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
        res.status(200).json({ msg: "Due to the nature of the vercel platform, deleting items with images should not be done." });
        /*  const { idsToDelete } = req.query;
 
         const productsToDelete = await Product.find({ _id: { $in: idsToDelete } })
 
         for (let i = 0; i < productsToDelete.length; i++) {
             const itemDependent = await Order.findOne({ "products.product": productsToDelete[i]._id });
 
             if (itemDependent) {
                 return res.status(404).json({ error: `The  product ${productsToDelete[i].productName} cannot be deleted because it is linked to other records.` });
             }
         }
 
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
  */
        /* LOG PARAMETERS */
        /*   req.body.info = productsToDelete;
          req.body.type = "delete-many-products";

          res.status(200).json({ msg: "Products Successfully Deleted" });

          setTimeout(() => {
              createLogMiddleware(req);
          }, 0) 
    }*/

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something Wrong Ocurred. Try Again Later" });
    }
}

/* DELETE PRODUCT */
export const deleteProduct = async (req, res) => {
    try {

        res.status(200).json({ msg: "Due to the nature of the vercel platform, deleting items with images should not be done." });

        /*     const { id } = req.params;
    
            const product = await Product.findById(id);
    
            const itemDependent = await Order.findOne({ "products.product": product._id });
    
            if (itemDependent) {
                return res.status(404).json({ error: `The product ${product.productName} cannot be deleted because it is linked to other records.` });
            }
    
            const result = await Product.findByIdAndDelete(id);
    
            if (!result) {
                return res.status(404).json({ error: "Product not Found" });
            } else {
                const filePath = `./public/assets/${product.picturePath}`;
                fs.unlink(filePath, (err) => { if (err) { console.log(err) } else { console.log("File is Deleted") } });
     */
        /* LOG PARAMETERS */
        /*     req.body.info = product;
            req.body.type = "delete-product";

            res.status(200).json({ msg: "Product Successfully Deleted" });

            setTimeout(() => {
                createLogMiddleware(req);
            }, 0)
        } */

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Something Wrong Ocurred. Try Again Later" });
    }
}
