import Category from '../models/Category.js';

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
                console.log(savedCategory);
                res.status(201).json({ category: savedCategory });
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
                    return res.status(200).send({ category: result })
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

        const result = await Category.deleteMany({
            _id: { $in: idsToDelete }
        });

        if (!result) {
            return res.status(404).json({ error: "Categories not Found" });
        } else {
            return res.status(200).json({ msg: "Categories Successfully Deleted" });
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
        const result = await Category.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ error: "Category not Found" });
        } else {
            return res.status(200).json({ msg: "Category Successfully Deleted" });
        }

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Something Wrong Ocurred. Try Again Later" });
    }
}
