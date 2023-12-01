import Joi from "joi";
export const validtion=(schema)=>{
    return (req,res,next)=>{
        
        const inputsData={...req.body,...req.query};

        if(req.file || req.files){
            inputsData.file=req.file || req.files;
        }
        const validationResult=schema.validate(inputsData,{abortEarly:false});

        if(validationResult.error?.details){
            return res.json({message:"validation error",validationResult:validationResult.error?.details});
        }
        next();
    }
}

export const generalFileds={
    id:Joi.string().min(24).max(24).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    file: Joi.object(
        {
            fieldname: Joi.string().required(),
            originalname: Joi.string().required(),
            encoding: Joi.string().required(),
            mimetype: Joi.string().required(),
            des: Joi.string(),
            destination: Joi.string().required(),
            filename: Joi.string().required(),
            path: Joi.string().required(),
            size: Joi.number().positive().required(),
        }
    ),
    
}