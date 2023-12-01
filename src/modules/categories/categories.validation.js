import Joi from "joi";
import { generalFileds } from "../../middelware/validation.js";


export  const createCtegory=Joi.object({
    name:Joi.string().min(2).max(25).required(),
    file:generalFileds.file.required(),
    //files:Joi.array().items(generalFileds.file.required()),
})