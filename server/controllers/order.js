import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Supplier from '../models/Supplier.js';

/* CREATE ORDER */
export const createOrder = async (req, res) => {
    try {
        const {
            type,
            price,
            status,
            orderSupplier,
            products,
            description,
        } = req.body

        if ((type == undefined || type == '') || (price == undefined || price == '') || (status == undefined || status == '') || (orderSupplier == undefined || orderSupplier == '') || (description == undefined || description == '') || (products == undefined || products == '' || products.length <= 0)) {
            res.status(401).json({ error: "Fill All Fields!" });
        } else if (description.length > 50) {
            res.status(401).json({ error: "Description Too Long!" });
        } else if (type != 'buy' && type != 'sale') {
            res.status(401).json({ error: "Order Type Not Expected!" });
        } else if (status != 'in progress' && status != 'finished' && status != "cancelled") {
            res.status(401).json({ error: "Status Type Not Expected!" });
        } else if (price > 1000) {
            res.status(401).json({ error: `${type == "buy" ? "Buy" : type == 'sale' ? "Sale" : ""} Price Very Expensive!` });
        }
        else {

            const productsIds = products.filter(item => item.quantity > 0 ? item.product : false).map(item => item.product);

            const productsFinded = await Product.find({ _id: { $in: productsIds } });
            const supplierFinded = await Supplier.findOne({ _id: orderSupplier });

            if (productsIds.length <= 0) {
                res.status(401).json({ error: "Quantity Of Products Is Not Enough" });
            } else if (productsFinded == null || productsFinded.length !== productsIds.length) {
                res.status(401).json({ error: "Some Products Does Not Exists" });
            } else if (supplierFinded == null) {
                res.status(401).json({ error: "Supplier Does Not Exists" });
            } else {

                if (type == "sale") {
                    for (let i = 0; i < productsFinded.length; i++) {
                        const productChoosed = products.find(item => item.product == productsFinded[i]._id);
                        if (productsFinded[i].stock < productChoosed.quantity) {
                            return res.status(401).json({ error: `Insufficient stock for product: ${productsFinded[i].productName.length > 40 ? productsFinded[i].productName.slice(0, 40) + "..." : productsFinded[i].productName}. Available: ${productsFinded[i].stock}, requested: ${productChoosed.quantity}` });
                        }
                    }
                }

                let uniqueId = `${Date.now()}${Math.floor(Math.random() * 10)}`;

                const newOrder = new Order({
                    type,
                    price,
                    status,
                    orderSupplier,
                    products,
                    description,
                    uniqueId
                })

                const savedOrder = await newOrder.save()
                for (let i = 0; i < productsFinded.length; i++) {
                    const productChoosed = products.find(item => item.product == productsFinded[i]._id);
                    if (type === "buy") {
                        const updateProduct = await Product.findByIdAndUpdate(productsFinded[i]._id, { stock: productsFinded[i].stock + productChoosed.quantity });
                        if (productsFinded[i].status != "in stock" && productChoosed.quantity > 0) {
                            const updateProductStatus = await Product.findByIdAndUpdate(productsFinded[i]._id, { status: "in stock" })
                        }
                    }
                    if (type === "sale") {
                        const updateProduct = await Product.findByIdAndUpdate(productsFinded[i]._id, { stock: productsFinded[i].stock - productChoosed.quantity });
                        if (productsFinded[i].stock - productChoosed.quantity == 0) {
                            const updateProductStatus = await Product.findByIdAndUpdate(productsFinded[i]._id, { status: "out of stock" })
                        }
                    }
                }
                console.log(savedOrder);
                res.status(201).json({ order: savedOrder });
            }
        }

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Something Wrong Ocurred. Try Again Later' })
    }
}

/* GET ORDER */
export const getOrders = async (req, res) => {
    try {

        const { page = 1, limit = 10, search } = req.query;

        const filters = {};

        if (search) {
            filters.uniqueId = { ...filters.uniqueId, $regex: search, $options: 'i' };
        }

        const ordersData = await Order.find(filters)
            .populate('orderSupplier')
            .populate('products.product')
            .sort({ _id: 1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const totalOrders = await Order.countDocuments(filters);

        res.status(200).json({ ordersData, totalOrders });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Something Wrong Ocurred. Try Again Later" });
    }
}

/* UPDATE ORDER */
export const updateOrder = async (req, res) => {
    try {
        const {
            type,
            price,
            status,
            orderSupplier,
            products,
            description,
        } = req.body

        const { id } = req.params;

        if ((type == undefined || type == '') || (price == undefined || price == '') || (status == undefined || status == '') || (orderSupplier == undefined || orderSupplier == '') || (description == undefined || description == '') || (products == undefined || products == '' || products.length <= 0)) {
            res.status(401).json({ error: "Fill All Fields!" });
        } else if (description.length > 50) {
            res.status(401).json({ error: "Description Too Long!" });
        } else if (type != 'buy' && type != 'sale') {
            res.status(401).json({ error: "Order Type Not Expected!" });
        } else if (status != 'in progress' && status != 'finished' && status != "cancelled") {
            res.status(401).json({ error: "Status Type Not Expected!" });
        } else if (price > 1000) {
            res.status(401).json({ error: `${type == "buy" ? "Buy" : type == 'sale' ? "Sale" : ""} Price Very Expensive!` });
        }
        else {

            const orderFinded = await Order.findById(id);

            const productsIds = products.filter(item => {

                orderProductFinded = orderFinded.products.find(order => order.product == item.product);

                if (item.quantity > 0) {
                    return item.product;
                }
                else if (item.quantity == 0 && item.product == orderProductFinded.product) {
                    return item.product;
                }
                return false
            }).map(item => item.product);

            const productsNotEqualZero = products.find(prod => prod.quantity != 0);

            const productsFinded = await Product.find({ _id: { $in: productsIds } });
            const supplierFinded = await Supplier.findOne({ _id: orderSupplier });

            if (productsIds.length <= 0) {
                res.status(401).json({ error: "Quantity Of Products Is Not Enough" });
            } else if (!productsNotEqualZero) {
                res.status(401).json({ error: "It is not possible to edit an order without a product listome Products Does Not Exists" });
            } else if (productsFinded == null || productsFinded.length !== productsIds.length) {
                res.status(401).json({ error: "Some Products Does Not Exists" });
            } else if (supplierFinded == null) {
                res.status(401).json({ error: "Supplier Does Not Exists" });
            } else {

                if (type == "sale") {
                    for (let i = 0; i < productsFinded.length; i++) {
                        const productChoosed = products.find(item => item.product == productsFinded[i]._id);
                        if (productsFinded[i].stock < productChoosed.quantity) {
                            return res.status(401).json({ error: `Insufficient stock for product: ${productsFinded[i].productName.length > 40 ? productsFinded[i].productName.slice(0, 40) + "..." : productsFinded[i].productName}. Available: ${productsFinded[i].stock}, requested: ${productChoosed.quantity}` });
                        }
                    }
                }

                const newOrder = new Order({
                    type,
                    price,
                    status,
                    orderSupplier,
                    products,
                    description,
                })

                for (let i = 0; i < productsFinded.length; i++) {
                    const productChoosed = products.find(item => item.product == productsFinded[i]._id);
                    if (type === "buy") {
                        const updateProduct = await Product.findByIdAndUpdate(productsFinded[i]._id, { stock: productsFinded[i].stock + productChoosed.quantity });
                        if (productsFinded[i].status != "in stock" && productChoosed.quantity > 0) {
                            const updateProductStatus = await Product.findByIdAndUpdate(productsFinded[i]._id, { status: "in stock" })
                        } else if (productsFinded[i].status == "in stock" && productChoosed.quantity == 0 && productsFinded[i].stock - orderFinded.quantity == 0) {
                            const updateProductStatus = await Product.findByIdAndUpdate(productsFinded[i]._id, { status: "out of stock" })
                        }
                    }
                    if (type === "sale") {
                        const updateProduct = await Product.findByIdAndUpdate(productsFinded[i]._id, { stock: productsFinded[i].stock - productChoosed.quantity });
                        if (productsFinded[i].stock - productChoosed.quantity == 0) {
                            const updateProductStatus = await Product.findByIdAndUpdate(productsFinded[i]._id, { status: "out of stock" })
                        }
                    }
                }
                console.log(savedOrder);
                res.status(201).json({ order: savedOrder });
            }
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Something Wrong Ocurred. Try Again Later" });
    }
}