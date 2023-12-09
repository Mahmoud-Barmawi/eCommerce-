import userModle from "../../../../DB/models/user.model.js"

export const getProfile=async (req,res,next)=>{
    const user=await userModle.findById(req.user._id);
    return res.json({message:"Success",user})
}