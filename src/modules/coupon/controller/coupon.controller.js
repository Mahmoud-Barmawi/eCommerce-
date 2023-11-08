import couponModle from "../../../../DB/models/coupon.model.js";

export const createCoupon = async (req, res) => {
    const { name, amount } = req.body;
    const coupon = await couponModle.findOne({ name });
    if (coupon) {
        return res.json({ Message: "coupon name already exists" })
    }
    const createCoupon = await couponModle.create(req.body);
    return res.json({ message: "Success", createCoupon })
}
export const getCoupon = async (req, res) => {
    const coupon = await couponModle.find({isDeleted:false});

    return res.json({ message: "Success", coupon })
}

export const updateCoupon = async (req, res) => {
    try {
        const coupon = await couponModle.findById(req.params.id);
        if (!coupon) {
            return res.json({ Message: "Coupon not found" })
        }
        if (req.body.name) {
            if (await couponModle.findOne({ name: req.body.name }).select('name')) {
                return res.json({ Message: "coupon already exists" });
            }
            coupon.name = req.body.name;
        }
        if (req.body.amount) {
            coupon.amount = req.body.amount;
        }
        await coupon.save();
        return res.json({ Message: "Success", coupon });
    } catch (err) {
        return res.json(err.stack)
    }
}

export const softDelete = async (req, res) => {
    const { id } = req.params;
    const coupon = await couponModle.findOneAndUpdate({ _id: id, isDeleted: false },
        { isDeleted: true },
        { new: true });
    if(!coupon){
        return res.json({Message:"Cannot delete coupon"})
    }    
    return res.json({message:"Success"});
}
export const hardDelete=async(req,res)=>{
    const { id } = req.params;
    const coupon = await couponModle.findByIdAndDelete({ _id: id},
        { isDeleted: true },
        { new: true });
    if(!coupon){
        return res.json({Message:"Cannot delete coupon"})
    }    
    return res.json({message:"Success"});
}
export const restore=async(req,res)=>{
    const { id } = req.params;
    const coupon = await couponModle.findOneAndUpdate({ _id: id, isDeleted: true },
        { isDeleted: false },
        { new: true });
    if(!coupon){
        return res.json({Message:"Cannot restore  coupon"})
    }    
    return res.json({message:"Success"});
}