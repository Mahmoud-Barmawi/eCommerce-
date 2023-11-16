import mongoose, { Schema, Types, model } from 'mongoose'

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        default: 1
    },
    price: {
        type: Number,
        required: true,
    },
    disCount: {
        type: Number,
        default: 0
    },
    finalPrice: {
        type: Number,
    },
    number_sellers: {
        type: Number,
        default: 0
    },
    mainImage: {
        type: Object,
        required: true
    },
    subImages: [{
        type: Object,
        required: true
    }],
    status: {
        type: String,
        default: 'Active',
        enum: ['Active', 'Inactive'],
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    category: { type: Types.ObjectId, ref: 'Category', required: true },
    subCategory: { type: Types.ObjectId, ref: 'Subcategorya', required: true },
    createdBy: { type: Types.ObjectId, ref: 'User', required: true },
    updatedBy: { type: Types.ObjectId, ref: 'User', required: true },

}, {
    timestamps: true,
})

const productModle = mongoose.models.Product || model('Product', productSchema)
export default productModle;