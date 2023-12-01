// ! asyncHandler take a function like as sign in update product ...etc  
export const asyncHandler= (fn)=>{
        return (req,res,next)=>{
            fn(req,res,next).catch(error=>{
                return next(new Error(error.stack));
            })
        }
}

export const globalErrorHandler=(err,req,res,next)=>{
    return res.json({Message:err.message});
}