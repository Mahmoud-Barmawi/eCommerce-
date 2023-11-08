import jwt from "jsonwebtoken"
import userModle from "../../DB/models/user.model.js";
export const auht = () => {
    return async (req, res, next) => {
        const { authorization } = req.headers;
        if (!authorization?.startsWith(process.env.BEARERKEY)) {
            return res.status(400).json({ message: "Invalid authorization" })
        }
        const token = authorization.split(process.env.BEARERKEY)
        const decodedToken = jwt.verify(token[1], process.env.LOGINSCret);
        if (!decodedToken) {
            return res.status(400).json({ message: "Invalid authorization" })
        }
        const user = await userModle.findById(decodedToken.id).select('userName role');
        if(!user){
            return res.status(400).json({ message: "Not registered user" })
        }
        if(user.role=='User'){
            return res.status(400).json({ message: "Not Auth User" })
        }
        next();
    }
}