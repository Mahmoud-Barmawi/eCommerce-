import slugify from "slugify";
import categoryModle from "../../../../DB/models/category.model.js";
import subCategoryModle from "../../../../DB/models/sub_category.model.js";
import cloudinary from "../../../services/cloudinary.js";
import productModle from "../../../../DB/models/product.model.js";

export const getProducts = (req, res) => {
    return res.json({ Message: "Products" });
}

export const createProduct = async (req, res) => {
    const { name, discount, price, category, subCategory, } = req.body;
    const checkCategory = await categoryModle.findById(category);
    if (!checkCategory) {
        return res.json({ message: "category not found" })
    }
    const checkSubCategory = await subCategoryModle.findById(subCategory);
    if (!checkSubCategory) {
        return res.json({ message: "sub category not found" })
    }

    req.body.slug = slugify(name);

    req.body.finalPrice = price - ((price * (discount || 0)) / 100);

    const { secure_url, public_id } = await cloudinary.uploader.upload(req.files.mainImage[0].path,
        { folder: `${process.env.APP_NAME}/product/mainImages` });
    req.body.mainImage = { secure_url, public_id };
    
    req.body.subImages=[];
    for (const iterator of req.files.subImages) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(iterator.path,
            { folder: `${process.env.APP_NAME}/product/subImages` });
        req.body.subImages.push({ secure_url, public_id });
    }
    req.body.createdBy=req.user._id;
    req.body.updatedBy=req.user._id;
    const product=await productModle.create(req.body);
    if(!product){
        return res.json({message:"Error"})
    }

    return res.json({message:"Success",product});
}
