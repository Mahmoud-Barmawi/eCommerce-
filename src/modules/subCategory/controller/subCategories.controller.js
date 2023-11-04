import slugify from "slugify";
import categoryModle from "../../../../DB/models/category.model.js";
import subCategoryModle from "../../../../DB/models/sub_category.model.js";
import cloudinary from "../../../services/cloudinary.js";

export const createSubCategory = async (req, res) => {
    const { name, categoryId } = req.body;
    const subcategory = await subCategoryModle.findOne({ name });
    const category = await categoryModle.findById(categoryId)
    if (subcategory) {
        return res.json({ message: 'Sub-Category already exists' })
    }
    if (!category) {
        return res.json({ message: 'Category does not exists' })
    }
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
        folder: `${process.env.APP_NAME}/subcategorys`
    })
    const subCategory = await subCategoryModle.create({ name, slug: slugify(name), categoryId, image: { secure_url, public_id } })
    return res.json({ message: "success", subCategory });
}
export const getSubCategory=async(req,res)=>{
    const categoryId=req.params.id;
    const category=await categoryModle.findById(categoryId);
    if(!category){
        return res.json({message:"category not found"});
    }
    const subCategory=await subCategoryModle.find({categoryId}).populate({
        path:'categoryId'
    })
    return res.json({message:"success",subCategory})
}