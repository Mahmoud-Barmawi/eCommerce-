import cartModle from "../../../../DB/models/cart.model.js"
import couponModle from "../../../../DB/models/coupon.model.js";
import orderModle from "../../../../DB/models/order.model.js";
import productModle from "../../../../DB/models/product.model.js";
import userModle from "../../../../DB/models/user.model.js";

export const createOrder = async (req, res, next) => {

    const { couponName } = req.body;
    //check cart 
    const cart = await cartModle.findOne({ userId: req.user._id });
    if (!cart) {
        return next(new Error(`cart is empty`))
    }
    req.body.products = cart.products;

    //check coupon 
    if (couponName) {
        const coupon = await couponModle.findOne({ name: couponName });
        if (!coupon) {
            return next(new Error('coupon not found'))
        }

        const currentDate = new Date();

        if (coupon.expireDate <= currentDate) {
            return next(new Error(`this coupon has expire`))
        }

        if (coupon.usedBy.includes(req.user._id)) {
            return next(new Error(`this coupon already used`))
        }
        req.body.coupon = coupon;
    }
    let subTotels = 0;
    let finalProducts = [];
    for (let product of req.body.products) {
        const checkProduct = await productModle.findOne({
            _id: product.productId,
            stock: { $gte: product.quantity }
        })
        if (!checkProduct) {
            return next(new Error('product quantity not available now'))
        }
        product = product.toObject();
        product.name = checkProduct.name;
        product.unitPrice = checkProduct.price;
        product.discount = checkProduct.disCount;
        product.finalPrice = checkProduct.finalPrice * product.quantity;
        subTotels += product.finalPrice;
        finalProducts.push(product)
    }
    const user = await userModle.findById(req.user._id)

    if (!req.body.address) {
        req.body.address = user.address;
    }
    if (!req.body.phone) {
        req.body.phone = user.phone;
    }



    const order = await orderModle.create({
        userId: req.user._id,
        products: finalProducts,
        finalPriceForAllProducts: subTotels - (( subTotels*req.body.coupon?.amount ||0) /100),
        address: req.body.address,
        phoneNumber: req.body.phone,
        couponName: req.body.couponName ?? ''
    })

    for (let product of req.body.products) {
        await productModle.updateOne({_id:product.productId},{$inc:{$stock:-product.quantity}})
    }
    if(req.body.coupon){
        await couponModle.updateOne({_id:req.body.coupon._id},{$addToSet:{usedBy:req.user._id}})
    }
    await cartModle.updateOne({userId:req.user._id},{products:[]});

    return res.json({message:"success",order});



}