import slugify from "slugify";
import categoryModle from "../../../../DB/models/category.model.js";
import cloudinary from '../../../services/cloudinary.js'
import { pagination } from "../../../services/pagination.js";
import productModle from "../../../../DB/models/product.model.js";
import subCategoryModle from "../../../../DB/models/sub_category.model.js";

export const getCategories = async (req, res) => {

    const category = await categoryModle.find().populate('subCategory')
    return res.json({ message: "success", category });

}
export const getSpicificCategories = async (req, res, next) => {
    const { id } = req.params;
    const cat = await categoryModle.findById(id);
    if (!cat) {
        return next(new Error(`category not found`))
    }
    return res.json({ message: "success", cat });
}
export const createCategory = async (req, res) => {
    const name = req.body.name.toLowerCase();
    if (await categoryModle.findOne({ name })) {
        return res.status(409).json({ Message: "Category name already exists" })
    }
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path,
        {
            folder: `${process.env.APP_NAME}/categories`
        })
    const cat = await categoryModle.create({
        name, slug: slugify(name), image: { secure_url, public_id },
        createdBy: req.user._id, updatedBy: req.user._id
    })
    return res.status(201).json({ message: "success", cat })
}
export const updateCategories = async (req, res) => {
    const cat = await categoryModle.findById(req.params.id)

    if (!cat) {
        return res.json({ message: `invalid category id" ${req.params.id}` })
    }
    if (req.body.name) {
        if (await categoryModle.findOne({ name: req.body.name, _id: { $ne: cat._id } }).select('name')) {
            return res.json({ Message: `category ${req.body.name} already exist` })
        }
        cat.name = req.body.name
        cat.slug = slugify(req.body.name)
    }
    if (req.body.status) {
        cat.status = req.body.status
    }
    if (req.file) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path,
            { folder: `${process.env.APP_NAME}/categories` })
        await cloudinary.uploader.destroy(cat.image.public_id)
        cat.image = { secure_url, public_id }
    }
    cat.updatedBy = req.user._id;
    await cat.save();
    return res.json({ message: "Success", cat })
}

export const getActiveCategories = async (req, res) => {
    const { skip, limit } = pagination(req.query.page, req.query.limit);
    const cat = await categoryModle.find({ status: 'Active' }).skip(skip).limit(limit).select('name image')
    return res.json({ message: "success", cat })

}

export const deleteCategories = async (req, res, next) => {
    const { id } = req.params;
    const category = await categoryModle.findByIdAndDelete(id);
    if(!category){
        return next(new Error(`category  not found`));
    }
    await productModle.deleteMany({category:id});
    await subCategoryModle.deleteMany({categoryId:id});
    return res.json({message:"Success"})
}   
