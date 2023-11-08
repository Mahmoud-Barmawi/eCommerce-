import mongoose, { Schema, Types, model } from 'mongoose'

const couponSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    amount: {
        type: Number,
        required: true,

    },
    usedBy: [{type: Types.ObjectId,ref:'User',required: true}],
    expireDate:Date,
    createdBy: { type: Types.ObjectId, ref: 'User' },
    updatedBy: { type: Types.ObjectId, ref: 'User' },
    isDeleted:{type:Boolean,default:false}
}, {
    timestamps: true,
})

const couponModle = mongoose.models.Coupon || model('Coupon', couponSchema)
export default couponModle;