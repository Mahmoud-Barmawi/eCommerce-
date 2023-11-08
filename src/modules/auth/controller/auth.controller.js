import userModle from "../../../../DB/models/user.model.js";
import bcrypt from 'bcryptjs'
import cloudinary from "../../../services/cloudinary.js";
import jwt  from "jsonwebtoken";
export const signUp=async(req,res)=>{
    const {userName,email,password}=req.body;

    const user=await userModle.findOne({email});
    if(user){
        return res.status(409).json({message:"Email alrady exist"})
    }
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path,
        {folder:`${process.env.APP_NAME}/categories`
    })
    const hashpassword=await bcrypt.hash(password,parseInt(process.env.SALT_ROUND));
    const createUser=await userModle.create({userName,email,password:hashpassword,image:{ secure_url, public_id }});
    return res.status(201).json({Message:"Success",createUser});
} 
export const signIn=async(req,res)=>{
    const {email,password}=req.body;

    const user=await userModle.findOne({email});
    if(!user){
        return res.status(409).json({message:"Data Invalid"})
    }
    const match=await bcrypt.compare(password,user.password);
    if(!match){
        return res.status(409).json({message:"Data Invalid"})
    }
    const token=jwt.sign({id:user._id,role:user.role,status:user.status},process.env.LOGINSCret);
    return res.status(201).json({Message:"Success",token});
} 
