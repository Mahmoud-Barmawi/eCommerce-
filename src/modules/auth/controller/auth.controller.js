import userModle from "../../../../DB/models/user.model.js";
import bcrypt from 'bcryptjs'
import cloudinary from "../../../services/cloudinary.js";
import jwt from "jsonwebtoken";
import { customAlphabet, nanoid } from "nanoid";
import { sendEmail } from "../../../services/email.js";

export const signUp = async (req, res) => {
    const { userName, email, password } = req.body;

    const user = await userModle.findOne({ email });

    if (user) {
        return res.status(409).json({ message: "Email alrady exist" })
    }

    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
        folder: `${process.env.APP_NAME}/profile`
    })
    const emailToken = jwt.sign({ email }, process.env.EMAILSCRET)
    await sendEmail(email, "Confirm Email", `<a href='${req.protocol}://${req.headers.host}/auth/confirmEmail/${emailToken}'>Verify</a>`)

    const hashpassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUND));

    const createUser = await userModle.create({ userName, email, password: hashpassword, image: { secure_url, public_id } });

    return res.status(201).json({ Message: "Success", createUser });
}
export const confirmEmail = async (req, res) => {
    const token = req.params.email;
    if (!token) console.log("error");
    const decoded = jwt.verify(token, process.env.EMAILSCRET)
    if (!decoded) {
        return res.json({ Message: 'Can not verfiy email... try agin :(): ♥' })
    }
    const user = await userModle.findOneAndUpdate({ email: decoded.email, confirmEmail: false }, { confirmEmail: true });
    if (!user) {
        return res.json({ message: "Something went wrong" })
    }
    return res.json({ message: "Confirmed successfully" })
}

export const signIn = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModle.findOne({ email });
    if (!user) {
        return res.status(409).json({ message: "Data Invalid" })
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(409).json({ message: "Data Invalid" })
    }
    const token = jwt.sign({ id: user._id, role: user.role, status: user.status }, process.env.LOGINSCret);
    return res.status(201).json({ Message: "Success", token });
}

export const sendCode = async (req, res) => {
    const { email } = req.body;
    let code = customAlphabet('123456789abcdzABCDZ', 4)
    code = code();
    const user = await userModle.findOneAndUpdate({ email }, { sendCode: code }, { new: true })
    const html = `<h2> code is ${code}</h2>`
    await sendEmail(email, "reset password", html)
    return res.redirect(process.env.PAGE)
}
export const forgotPssword = async (req, res) => {
    const { email, password, code } = req.body;
    const user = await userModle.findOne({ email });
    if (!user) {
        return res.json({ message: "not register user" });
    }
    if(user.sendCode != code){
        return res.json({message:"Invalid code"});
    }
    let match=await bcrypt.compare(password,user.password)
    if(match){
        return res.json({message:"same password"})
    }
    user.password=await bcrypt.hash(password,parseInt(process.env.SALT_ROUND))
    user.sendCode=null;
    await user.save();
    return res.json({message:"success"});

}