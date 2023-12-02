import Joi from "joi";
import { generalFileds } from "../../middelware/validation.js";


export  const createProduct=Joi.object({
    name:Joi.string().min(2).max(25).required(),
    description:Joi.string().min(1).max(9000),
    stock:Joi.number().integer().required(),
    price:Joi.number().positive().required(),
    disCount:Joi.number().positive().min(1),
    file:Joi.object({
        mainImage:Joi.array().items(generalFileds.file.required()).length(1),
        subImages:Joi.array().items(generalFileds.file.required()).min(2).max(4),
    }),
    status:Joi.string().valid('Active','Inactive'),
    category:Joi.string().required(),
    subCategory:Joi.string().required(),
}).required(); 
