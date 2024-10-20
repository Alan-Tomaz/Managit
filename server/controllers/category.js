import Category from '../models/Category.js';
import Product from '../models/Product.js';
import { createLogMiddleware } from './log.js';

/* CREATE CATEGORY */
export const createCategory = async (req, res) => {
    try {
        const {
            categoryName,
            categoryDesc
        } = req.body

        if ((categoryName == undefined || categoryName == '') || (categoryDesc == undefined || categoryDesc == '')) {
            res.status(401).json({ error: "Fill All Fields!" });
        } else if (categoryName.length > 12) {
            res.status(401).json({ error: "Category Name Too Long!" });
        } else if (categoryDesc.length > 50) {
            res.status(401).json({ error: "Description Too Long!" });
        }
        else {
            const newCategoryName = `${categoryName[0].toUpperCase()}${categoryName.slice(1)}`;

            const newCategory = new Category({
                categoryName: newCategoryName,
                description: categoryDesc
            })

            const categoryFinded = await Category.findOne({ categoryName: newCategoryName });

            if (categoryFinded) {
                res.status(401).json({ error: "Category Already Exists" });
            } else {
                const savedCategory = await newCategory.save()

                /* LOG PARAMETERS */
                req.body.info = savedCategory;
                req.body.type = "create-category";

                console.log(savedCategory);
                res.status(201).json({ category: savedCategory });

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

/* GET CATEGORIES */
export const getCategories = async (req, res) => {
    try {

        const { page = 1, limit = 10, search, categories } = req.query;

        const filters = {};

        if (search) {
            filters.categoryName = { ...filters.categoryName, $regex: search, $options: 'i' };
        }

        const categoriesData = await Category.find(filters)
            .sort({ categoryName: 1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const totalCategories = await Category.countDocuments(filters);

        res.status(200).json({ categoriesData, totalCategories });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Something Wrong Ocurred. Try Again Later" });
    }
}

/* UPDATE CATEGORY */
export const updateCategory = async (req, res) => {
    try {
        const {
            categoryName,
            categoryDesc
        } = req.body

        const { id } = req.params;

        if ((categoryName == '' || categoryName == undefined) || (categoryDesc == '' || categoryDesc == undefined)) {
            return res.status(401).send({ error: "Fill All Fields" })
        } else if (categoryName.length > 12) {
            res.status(401).json({ error: "Category Name Too Long!" });
        } else if (categoryDesc.length > 50) {
            res.status(401).json({ error: "Description Too Long!" });
        }
        else {
            const newCategoryName = `${categoryName[0].toUpperCase()}${categoryName.slice(1)}`;

            const categoryFinded = await Category.findOne({ categoryName: newCategoryName });

            if (categoryFinded && categoryFinded._id != id) {
                res.status(401).json({ error: "Category Already Exists" });
            } else {
                const result = await Category.findByIdAndUpdate(id, { categoryName: newCategoryName, description: categoryDesc });
                if (!result) {
                    return res.status(404).json({ error: "Category Not Found" })
                } else {
                    /* LOG PARAMETERS */
                    req.body.info = result;
                    req.body.type = "update-category";

                    res.status(200).send({ category: result })

                    setTimeout(() => {
                        createLogMiddleware(req);
                    }, 0)
                }
            }
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Something Wrong Ocurred. Try Again Later" });
    }
}

/* DELETE MANY CATEGORIES */
export const deleteManyCategories = async (req, res) => {
    try {
        const { idsToDelete } = req.query;

        const categoriesToDelete = await Category.find({ _id: { $in: idsToDelete } })

        for (let i = 0; i < categoriesToDelete.length; i++) {
            const itemDependent = await Product.findOne({ productCategory: categoriesToDelete[i]._id });

            if (itemDependent) {
                return res.status(404).json({ error: `The category ${categoriesToDelete[i].categoryName} cannot be deleted because it is linked to other records.` });
            }

        }

        const result = await Category.deleteMany({
            _id: { $in: idsToDelete }
        });

        if (!result) {
            return res.status(404).json({ error: "Categories not Found" });
        } else {
            /* LOG PARAMETERS */
            req.body.info = categoriesToDelete;
            req.body.type = "delete-many-categories";

            res.status(200).json({ msg: "Categories Successfully Deleted" });

            setTimeout(() => {
                createLogMiddleware(req);
            }, 0)
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something Wrong Ocurred. Try Again Later" });
    }
}

/* DELETE CATEGORY */
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const categoryToDelete = await Category.findById(id)

        const itemDependent = await Product.findOne({ productCategory: categoryToDelete._id });

        if (itemDependent) {
            return res.status(404).json({ error: `The category ${categoryToDelete.categoryName} cannot be deleted because it is linked to other records.` });
        }

        const result = await Category.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ error: "Category not Found" });
        } else {
            /* LOG PARAMETERS */
            req.body.info = categoryToDelete;
            req.body.type = "delete-category";

            res.status(200).json({ msg: "Category Successfully Deleted" });

            setTimeout(() => {
                createLogMiddleware(req);
            }, 0)
        }

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Something Wrong Ocurred. Try Again Later" });
    }
}
