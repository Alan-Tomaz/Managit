import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Supplier from '../models/Supplier.js';
import { createLogMiddleware } from './log.js';

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

            for (let k = 0; k < products.length; k++) {
                if (products[k].quantity < 0) {
                    return res.status(401).json({ error: `Products Quantity Not Expected` });
                }
            }

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

                req.body.info = savedOrder;
                req.body.type = "create-order";

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

/* GET ORDER */
export const getOrders = async (req, res) => {
    try {

        const { page = 1, limit = 10, search, type } = req.query;

        const filters = {};

        if (type != undefined) {
            filters.type = type;
        }

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

export const getOrdersByTime = async (req, res) => {
    try {

        const { type, time, leastTime } = req.query;

        const dateTimeAgo = new Date();
        dateTimeAgo.setDate(dateTimeAgo.getDate() - time);

        const dateLeastTime = new Date();

        if (leastTime != undefined) {
            dateTimeAgo.setDate(dateTimeAgo.getDate() - leastTime);
        }

        const filters = {
            createdAt: { $gte: dateTimeAgo, $lt: dateLeastTime }
        };

        if (type != undefined && type != "all") {
            filters.type = type;
        }

        const ordersData = await Order.find(filters)
            .sort({ createdAt: -1 })

        const totalOrders = await Order.countDocuments(filters);

        res.status(200).json({ ordersData, totalOrders });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Something Wrong Ocurred. Try Again Later" });
    }
}

export const getOrdersByPeriod = async (req, res) => {
    try {

        const { option = 0 } = req.query;

        const arr = [[], []];
        const values = [[], []];

        switch (option) {
            case "0":
                for (let i = 0; i < 30; i = i + 5) {
                    let count = 0;

                    const dateTimeAgo = new Date();
                    dateTimeAgo.setDate(dateTimeAgo.getDate() - (i + 5));

                    const dateLeastTime = new Date();
                    dateLeastTime.setDate(dateLeastTime.getDate() - i);

                    const filters = {
                        type: "buy",
                        createdAt: { $gte: dateTimeAgo, $lt: dateLeastTime }
                    };

                    const ordersData = await Order.find(filters)
                        .sort({ createdAt: -1 })


                    const totalOrders = await Order.countDocuments(filters);

                    ordersData.forEach(order => { count += order.price });

                    values[0].push(count);
                    arr[0].push({ ordersData, totalOrders })
                }

                for (let i = 0; i < 30; i = i + 5) {
                    let count = 0;

                    const dateTimeAgo = new Date();
                    dateTimeAgo.setDate(dateTimeAgo.getDate() - (i + 5));

                    const dateLeastTime = new Date();
                    dateLeastTime.setDate(dateLeastTime.getDate() - i);

                    const filters = {
                        type: "sale",
                        createdAt: { $gte: dateTimeAgo, $lt: dateLeastTime }
                    };

                    const ordersData = await Order.find(filters)
                        .sort({ createdAt: -1 })


                    const totalOrders = await Order.countDocuments(filters);

                    ordersData.forEach(order => { count += order.price });

                    values[1].push(count);
                    arr[1].push({ ordersData, totalOrders })
                }
                break;

            case "1":
                for (let i = 0; i < 90; i = i + 10) {
                    let count = 0;

                    const dateTimeAgo = new Date();
                    dateTimeAgo.setDate(dateTimeAgo.getDate() - (i + 10));

                    const dateLeastTime = new Date();
                    dateLeastTime.setDate(dateLeastTime.getDate() - i);

                    const filters = {
                        type: "buy",
                        createdAt: { $gte: dateTimeAgo, $lt: dateLeastTime }
                    };

                    const ordersData = await Order.find(filters)
                        .sort({ createdAt: -1 })


                    const totalOrders = await Order.countDocuments(filters);

                    ordersData.forEach(order => { count += order.price });

                    values[0].push(count);
                    arr[0].push({ ordersData, totalOrders })
                }

                for (let i = 0; i < 90; i = i + 10) {
                    let count = 0;

                    const dateTimeAgo = new Date();
                    dateTimeAgo.setDate(dateTimeAgo.getDate() - (i + 10));

                    const dateLeastTime = new Date();
                    dateLeastTime.setDate(dateLeastTime.getDate() - i);

                    const filters = {
                        type: "sale",
                        createdAt: { $gte: dateTimeAgo, $lt: dateLeastTime }
                    };

                    const ordersData = await Order.find(filters)
                        .sort({ createdAt: -1 })


                    const totalOrders = await Order.countDocuments(filters);

                    ordersData.forEach(order => { count += order.price });

                    values[1].push(count);
                    arr[1].push({ ordersData, totalOrders })
                }
                break;
            case "2":
                for (let i = 180; i > 0; i = i - 30) {
                    let count = 0;

                    const dateTimeAgo = new Date();
                    dateTimeAgo.setDate(dateTimeAgo.getDate() - (i - 30));

                    const dateLeastTime = new Date();
                    dateLeastTime.setDate(dateLeastTime.getDate() - i);

                    const filters = {
                        type: "buy",
                        createdAt: { $gte: dateLeastTime, $lt: dateTimeAgo }
                    };

                    const ordersData = await Order.find(filters)
                        .sort({ createdAt: -1 })


                    const totalOrders = await Order.countDocuments(filters);

                    ordersData.forEach(order => { count += order.price });

                    values[0].push(count);
                    arr[0].push({ ordersData, totalOrders })
                }

                for (let i = 180; i > 0; i = i - 30) {
                    let count = 0;

                    const dateTimeAgo = new Date();
                    dateTimeAgo.setDate(dateTimeAgo.getDate() - (i - 30));

                    const dateLeastTime = new Date();
                    dateLeastTime.setDate(dateLeastTime.getDate() - i);

                    const filters = {
                        type: "sale",
                        createdAt: { $gte: dateLeastTime, $lt: dateTimeAgo }
                    };

                    const ordersData = await Order.find(filters)
                        .sort({ createdAt: -1 })


                    const totalOrders = await Order.countDocuments(filters);

                    ordersData.forEach(order => { count += order.price });

                    values[1].push(count);
                    arr[1].push({ ordersData, totalOrders })
                }
            case "3":
                for (let i = 360; i > 0; i = i - 30) {
                    let count = 0;

                    const dateTimeAgo = new Date();
                    dateTimeAgo.setDate(dateTimeAgo.getDate() - (i - 30));

                    const dateLeastTime = new Date();
                    dateLeastTime.setDate(dateLeastTime.getDate() - i);

                    const filters = {
                        type: "buy",
                        createdAt: { $gte: dateLeastTime, $lt: dateTimeAgo }
                    };

                    const ordersData = await Order.find(filters)
                        .sort({ createdAt: -1 })


                    const totalOrders = await Order.countDocuments(filters);

                    ordersData.forEach(order => { count += order.price });

                    values[0].push(count);
                    arr[0].push({ ordersData, totalOrders })
                }

                for (let i = 360; i > 0; i = i - 30) {
                    let count = 0;

                    const dateTimeAgo = new Date();
                    dateTimeAgo.setDate(dateTimeAgo.getDate() - (i - 30));

                    const dateLeastTime = new Date();
                    dateLeastTime.setDate(dateLeastTime.getDate() - i);

                    const filters = {
                        type: "sale",
                        createdAt: { $gte: dateLeastTime, $lt: dateTimeAgo }
                    };

                    const ordersData = await Order.find(filters)
                        .sort({ createdAt: -1 })


                    const totalOrders = await Order.countDocuments(filters);

                    ordersData.forEach(order => { count += order.price });

                    values[1].push(count);
                    arr[1].push({ ordersData, totalOrders })
                }
                break;
        }

        res.status(200).json({ orders: arr, values });
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

            for (let k = 0; k < products.length; k++) {
                if (products[k].quantity < 0) {
                    return res.status(401).json({ error: `Products Quantity Not Expected` });
                }
            }

            const orderFinded = await Order.findById(id);

            if (!orderFinded) {
                res.status(401).json({ error: "Order Not Found!" });
            } else {

                const productsIds = products.filter(item => {
                    const orderProductFinded = orderFinded.products.find(order => order.product == item.product);

                    if (item.quantity > 0) {
                        return item.product;
                    }
                    else if (item.quantity == 0 && item.product == orderProductFinded.product) {
                        return item.product;
                    }
                    return false
                }).map(item => item.product);

                const productsNotEqualZero = products.find(prod => prod.quantity != 0);

                const orderProductNotFind = orderFinded.products.filter(item1 =>
                    !products.some(item2 => item1.product.toString() === item2.product.toString())
                );

                const productsFinded = await Product.find({ _id: { $in: productsIds } });
                const supplierFinded = await Supplier.findOne({ _id: orderSupplier });

                if (productsIds.length <= 0) {
                    res.status(401).json({ error: "Quantity Of Products Is Not Enough" });
                } else if (!productsNotEqualZero) {
                    res.status(401).json({ error: "It is not possible to edit an order without a product list" });
                } else if (orderFinded.type != type) {
                    res.status(401).json({ error: "It is not possible to edit an order type" });
                } else if (productsFinded == null || productsFinded.length !== productsIds.length) {
                    res.status(401).json({ error: "Some Products Does Not Exists" });
                } else if (supplierFinded == null) {
                    res.status(401).json({ error: "Supplier Does Not Exists" });
                } else {

                    const updateOrder = {
                        price,
                        status,
                        orderSupplier,
                        products,
                        description,
                    };

                    for (let i = 0; i < productsFinded.length; i++) {
                        const orderProductFind = orderFinded.products.find(order => {
                            if (order.product.toString() == productsFinded[i]._id.toString()) {
                                return order.product.toString() == productsFinded[i]._id.toString()
                            }
                        });
                        const productChoosed = products.find(item => item.product == productsFinded[i]._id);
                        if (type === "buy") {
                            if (orderProductFind) {
                                const productChoosedDif = orderProductFind.quantity - productChoosed.quantity;
                                if (orderProductFind.quantity != productChoosed.quantity) {
                                    if (orderProductFind.quantity > productChoosed.quantity && productsFinded[i].stock - productChoosedDif >= 0 && productsFinded[i].stock - productChoosedDif >= productsFinded[i].stock - orderProductFind.quantity) {
                                        const updateProduct = await Product.findByIdAndUpdate(productsFinded[i]._id, { stock: productsFinded[i].stock - productChoosedDif });
                                    } else if (orderProductFind.quantity < productChoosed.quantity) {
                                        const updateProduct = await Product.findByIdAndUpdate(productsFinded[i]._id, { stock: productsFinded[i].stock + (productChoosed.quantity - orderProductFind.quantity) });
                                    } else if (orderProductFind.quantity > productChoosed.quantity && productsFinded[i].stock - productChoosedDif < 0) {
                                        return res.status(401).json({ error: `It is not possible to decrease the stock quantity of a product below 0. Actual Stock for product ${productsFinded[i].productName}: ${productsFinded[i].stock}` });
                                    } else if (orderProductFind.quantity > productChoosed.quantity && productsFinded[i].stock - productChoosedDif < productsFinded[i].stock - orderProductFind.quantity) {
                                        return res.status(401).json({ error: `It is not possible to decrease the quantity in stock beyond the quantity added to the purchase order previously.` });
                                    } else {
                                        return res.status(401).json({ error: `Invalid Product ${productsFinded[i].productName} values` });
                                    }
                                    if (productsFinded[i].status != "in stock" && productChoosed.quantity > orderProductFind.quantity) {
                                        const updateProductStatus = await Product.findByIdAndUpdate(productsFinded[i]._id, { status: "in stock" })
                                    } else if (productsFinded[i].status == "in stock" && orderProductFind.quantity >= productChoosedDif && productsFinded[i].stock - productChoosedDif == 0) {
                                        const updateProductStatus = await Product.findByIdAndUpdate(productsFinded[i]._id, { status: "out of stock" })
                                    }
                                }
                            } else {
                                const updateProduct = await Product.findByIdAndUpdate(productsFinded[i]._id, { stock: productsFinded[i].stock + productChoosed.quantity });
                                if (productsFinded[i].status != "in stock" && productChoosed.quantity > 0) {
                                    const updateProductStatus = await Product.findByIdAndUpdate(productsFinded[i]._id, { status: "in stock" })
                                }
                            }
                        }
                        if (type === "sale") {
                            if (orderProductFind) {
                                const productChoosedDif = orderProductFind.quantity - productChoosed.quantity;
                                if (orderProductFind.quantity != productChoosed.quantity) {
                                    if (orderProductFind.quantity > productChoosed.quantity && productsFinded[i].stock + productChoosed.quantity <= productsFinded[i].stock + orderProductFind.quantity) {
                                        const updateProduct = await Product.findByIdAndUpdate(productsFinded[i]._id, { stock: productsFinded[i].stock + productChoosedDif });
                                    } else if (orderProductFind.quantity < productChoosed.quantity && productsFinded[i].stock - (productChoosed.quantity - orderProductFind.quantity) >= 0 && productsFinded[i].stock - orderProductFind.quantity >= productsFinded[i].stock - productChoosed.quantity) {
                                        const updateProduct = await Product.findByIdAndUpdate(productsFinded[i]._id, { stock: productsFinded[i].stock - (productChoosed.quantity - orderProductFind.quantity) });
                                    } else if (orderProductFind.quantity < productChoosed.quantity && productsFinded[i].stock - (productChoosed.quantity - orderProductFind.quantity) < 0) {
                                        return res.status(401).json({ error: `Insufficient stock for product: ${productsFinded[i].productName.length > 40 ? productsFinded[i].productName.slice(0, 40) + "..." : productsFinded[i].productName}. Available: ${productsFinded[i].stock}, requested: ${productChoosed.quantity}` });
                                    } else if (orderProductFind.quantity > productChoosed.quantity && productsFinded[i].stock + productChoosed.quantity > productsFinded[i].stock + orderProductFind.quantity) {
                                        return res.status(401).json({ error: `It is not possible to increase the quantity in stock beyond the quantity remove to the sale order previously.` });
                                    } else {
                                        return res.status(401).json({ error: `Invalid Product ${productsFinded[i].productName} values` });
                                    }
                                    if (productsFinded[i].status != "in stock" && orderProductFind.quantity > productChoosed.quantity && productsFinded[i].stock + productChoosed.quantity <= productsFinded[i].stock + orderProductFind.quantity) {
                                        const updateProductStatus = await Product.findByIdAndUpdate(productsFinded[i]._id, { status: "in stock" })
                                    } else if (orderProductFind.quantity < productChoosed.quantity && productsFinded[i].stock - (productChoosed.quantity - orderProductFind.quantity) == 0 && productsFinded[i].stock - orderProductFind.quantity >= productsFinded[i].stock - productChoosed.quantity) {
                                        const updateProductStatus = await Product.findByIdAndUpdate(productsFinded[i]._id, { status: "out of stock" })
                                    }
                                }
                            } else {
                                const updateProduct = await Product.findByIdAndUpdate(productsFinded[i]._id, { stock: productsFinded[i].stock - productChoosed.quantity });
                                if (productsFinded[i].stock - productChoosed.quantity == 0) {
                                    const updateProductStatus = await Product.findByIdAndUpdate(productsFinded[i]._id, { status: "out of stock" })
                                }
                            }
                        }
                    }
                    for (let j = 0; j < orderProductNotFind.length; j++) {
                        const searchNotFindedProduct = await Product.findById(orderProductNotFind[j].product);
                        if (type === "buy") {
                            if (searchNotFindedProduct.stock - orderProductNotFind[j].quantity >= 0) {
                                const updateProduct = await Product.findByIdAndUpdate(orderProductNotFind[j].product, { stock: searchNotFindedProduct.stock - orderProductNotFind[j].quantity });

                                if (searchNotFindedProduct.stock - orderProductNotFind[j].quantity == 0) {
                                    const updateProductStatus = await Product.findByIdAndUpdate(orderProductNotFind[j].product, { status: "out of stock" })
                                }
                            } else {
                                return res.status(401).json({ error: `Insufficient stock for product: ${searchNotFindedProduct.productName.length > 40 ? searchNotFindedProduct.productName.slice(0, 40) + "..." : searchNotFindedProduct.productName}. Available: ${searchNotFindedProduct.stock}, requested: ${orderProductNotFind[j].quantity}` });
                            }
                        }
                        if (type === "sale") {
                            if (searchNotFindedProduct.stock + orderProductNotFind[j].quantity > 0) {
                                const updateProduct = await Product.findByIdAndUpdate(orderProductNotFind[j].product, { stock: searchNotFindedProduct.stock + orderProductNotFind[j].quantity });

                                if (searchNotFindedProduct.status != "in stock" && searchNotFindedProduct.stock + orderProductNotFind[j].quantity > 0) {
                                    const updateProductStatus = await Product.findByIdAndUpdate(orderProductNotFind[j].product, { status: "in stock" })
                                }
                            } else {
                                return res.status(401).json({ error: `Insufficient stock for product: ${searchNotFindedProduct.productName.length > 40 ? searchNotFindedProduct.productName.slice(0, 40) + "..." : searchNotFindedProduct.productName}. Available: ${searchNotFindedProduct.stock}, requested: ${orderProductNotFind[j].quantity}` });
                            }
                        }
                    }


                    const result = await Order.findByIdAndUpdate(id, updateOrder);

                    /* LOG PARAMETERS */
                    req.body.info = result;
                    req.body.type = "update-order";

                    res.status(201).json({ order: result });

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

/* DELETE MANY ORDERS */
export const deleteManyOrders = async (req, res) => {
    try {
        const { idsToDelete } = req.query;

        const orders = await Order.find({ _id: { $in: idsToDelete } })

        if (!orders || orders.length < idsToDelete.length) {
            res.status(401).json({ error: "Some Orders Not Found" });
        } else {
            const result = await Order.deleteMany({
                _id: { $in: idsToDelete }
            });

            if (!result) {
                return res.status(404).json({ error: "Orders not Found" });
            } else {
                for (let j = 0; j < orders.length; j++) {
                    if (orders[j].type == "buy") {
                        for (let i = 0; i < orders[j].products.length; i++) {
                            const currentProductOrder = orders[j].products[i];
                            const currentProduct = await Product.findById(currentProductOrder.product);

                            if (currentProduct.stock >= currentProductOrder.quantity) {
                                const updateProduct = await Product.findByIdAndUpdate(currentProductOrder.product, { stock: currentProduct.stock - currentProductOrder.quantity });
                            }

                            if (currentProduct.stock - currentProductOrder.quantity == 0 && currentProduct.status != "out of stock") {
                                const updateProductStatus = await Product.findByIdAndUpdate(currentProductOrder.product, { status: "out of stock" })
                            }
                        }
                    }

                    if (orders[j].type == "sale") {
                        for (let i = 0; i < orders[j].products.length; i++) {
                            const currentProductOrder = orders[j].products[i];
                            const currentProduct = await Product.findById(currentProductOrder.product);

                            const updateProduct = await Product.findByIdAndUpdate(currentProductOrder.product, { stock: currentProduct.stock + currentProductOrder.quantity });

                            if (currentProduct.stock + currentProductOrder.quantity > 0 && currentProduct.status == "out of stock") {
                                const updateProductStatus = await Product.findByIdAndUpdate(currentProductOrder.product, { status: "in stock" })
                            }
                        }
                    }
                }

                /* LOG PARAMETERS */
                req.body.info = orders;
                req.body.type = "delete-many-orders";

                res.status(200).json({ msg: "Orders Successfully Deleted" });

                setTimeout(() => {
                    createLogMiddleware(req);
                }, 0);
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something Wrong Ocurred. Try Again Later" });
    }
}

/* DELETE ORDER */
export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findById(id)

        if (!order) {
            res.status(401).json({ error: "Order Not Found" });
        } else {

            const result = await Order.findByIdAndDelete(id);

            if (!result) {
                return res.status(404).json({ error: "Order not Found" });
            } else {
                if (order.type == "buy") {
                    for (let i = 0; i < order.products.length; i++) {
                        const currentProductOrder = order.products[i];
                        const currentProduct = await Product.findById(currentProductOrder.product);

                        if (currentProduct.stock >= currentProductOrder.quantity) {
                            const updateProduct = await Product.findByIdAndUpdate(currentProductOrder.product, { stock: currentProduct.stock - currentProductOrder.quantity });
                        }

                        if (currentProduct.stock - currentProductOrder.quantity == 0 && currentProduct.status != "out of stock") {
                            const updateProductStatus = await Product.findByIdAndUpdate(currentProductOrder.product, { status: "out of stock" })
                        }
                    }
                }

                if (order.type == "sale") {
                    for (let i = 0; i < order.products.length; i++) {
                        const currentProductOrder = order.products[i];
                        const currentProduct = await Product.findById(currentProductOrder.product);

                        const updateProduct = await Product.findByIdAndUpdate(currentProductOrder.product, { stock: currentProduct.stock + currentProductOrder.quantity });

                        if (currentProduct.stock + currentProductOrder.quantity > 0 && currentProduct.status == "out of stock") {
                            const updateProductStatus = await Product.findByIdAndUpdate(currentProductOrder.product, { status: "in stock" })
                        }
                    }
                }

                /* LOG PARAMETERS */
                req.body.info = order;
                req.body.type = "delete-order";

                res.status(200).json({ msg: "Order Successfully Deleted" });

                setTimeout(() => {
                    createLogMiddleware(req);
                }, 0);
            }
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Something Wrong Ocurred. Try Again Later" });
    }
}
