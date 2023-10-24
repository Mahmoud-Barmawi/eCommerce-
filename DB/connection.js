import mongoose from "mongoose";
const connectDB=async()=>{
    return await mongoose.connect(process.env.DB)
    .then(()=>{
        console.log("Connected Successfully");
    }).catch((err)=>{
        console.log(`Check your connection, you hava an error ${err}`)
    }) 
}
export default connectDB;