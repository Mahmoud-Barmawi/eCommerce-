import slugify from "slugify";
import categoryModle from "../../../../DB/models/category.model.js";
import subCategoryModle from "../../../../DB/models/sub_category.model.js";
import cloudinary from "../../../services/cloudinary.js";
import productModle from "../../../../DB/models/product.model.js";
import { pagination } from "../../../services/pagination.js";

export const getProducts = async (req, res) => {
        const {skip,limit} = pagination(req.query.page,req.query.limit);
        let queryObj={...req.query};
        const execQuery=['page','limit','skip','sort','search','fields'];
        execQuery.map((ele)=>{
            delete queryObj[ele];
        })
        queryObj=JSON.stringify(queryObj);
        queryObj=queryObj.replace(/\b(gt|gte|lt|lte|in|nin|eq|neq)\b/g,match=>`$${match}`);
        queryObj=JSON.parse(queryObj);
        console.log(queryObj);
        const mongooseQuery= productModle.find(queryObj).limit(limit).skip(skip);
        if(req.query.search){
            mongooseQuery.find({
                $or:[
                    {name:{$regex:req.query.search,$options:'i'}},
                    {description:{$regex:req.query.search,$options:'i'}},
                ]
            });
        }
        mongooseQuery.select(req.query.fields?.replace(',',' '))
        const products = await mongooseQuery.sort(req.query.sort?.replceAll(',',' '));
        const count =await productModle.estimatedDocumentCount();
        return res.json({message:"success",page:products.length,total:count,products});
}

export const createProduct = async (req, res) => {
    const { name, disCount, price, category, subCategory, } = req.body;
    const checkCategory = await categoryModle.findById(category);
    if (!checkCategory) {
        return res.json({ message: "category not found" })
    }
    const checkSubCategory = await subCategoryModle.findById(subCategory);
    if (!checkSubCategory) {
        return res.json({ message: "sub category not found" })
    }

    req.body.slug = slugify(name);

    req.body.finalPrice = price - ((price * (disCount || 0)) / 100).toFixed(2);

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

export const getProductWithCategory= async(req,res)=>{
    const product=await productModle.find({category:req.params.categoryId});
    return res.json({message:"success",product})
}
export const getProductDetails=async(req,res)=>{
    const product=await productModle.findById(req.params.productId);
    return res.json({message:"success",product})
}