import Category from '../models/Category.js';

/* CREATE CATEGORY */
export const createCategory = async (req, res) => {
    try {
        const {
            categoryDesc
        } = req.body
        const categoryName = `${req.body.categoryName[0].toUpperCase()}${req.body.categoryName.slice(1)}`;
        console.log(categoryName);

        if ((categoryName == undefined || categoryName == '') || (categoryDesc == undefined || categoryDesc == '')) {
            res.status(401).json({ status: 401, msg: "Fill All Fields!" });
        } else {
            const newCategory = new Category({
                categoryName,
                description: categoryDesc
            })

            const categoryFinded = await Category.findOne({ categoryName: categoryName });

            if (categoryFinded) {
                res.status(401).json({ status: 401, msg: "Category Already Exists" });
            } else {
                const savedCategory = await newCategory.save()
                console.log(savedCategory);
                res.status(201).json({ status: 201 });
            }
        }

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Something Wrong Ocurred. Try Again Later' })
    }
}