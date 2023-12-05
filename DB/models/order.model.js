import mongoose, { Schema, Types, model } from 'mongoose'

const orderSchema = new Schema({
    userId:{
    type:Types.ObjectId,ref:'User',required:true,
    },
    products:[{
    productId:{type:Types.ObjectId,ref:'Product',required:true},
    quantity:{type:Number,default:1,required:true},
    unitPrice:{type:Number,required:true},
    finalPrice:{type:Number,required:true,default:0},
    }],
    finalPriceForAllProducts:{
        type:Number,required:true,
    },
    address:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    couponName:{
        type:String,
        required:true,
    },
    paymentType:{
        type:String,
        default:'cash',
        enum:['cart','cash']
    },
    status:{
        type:String,
        default:'pending',
        enum:['pending','cancelled','confirm','deliverd','onWay'],
    },
    reasonRejcted:String,
    note:String,

}, {
    timestamps: true,
})

const orderModle = mongoose.models.Order || model('Order', orderSchema)
export default orderModle;