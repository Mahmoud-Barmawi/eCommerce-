import Joi from "joi";
import { generalFileds } from "../../middelware/validation.js";

export const createCoupon=Joi.object({
    name:Joi.string().required().min(3).max(25),
    amount:Joi.number().positive(),
    expireDate:Joi.date().greater('now').required(),
})