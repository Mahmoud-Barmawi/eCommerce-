import { Router } from "express";
import * as AuthController from './controller/auth.controller.js'
import fileUpload, { fileValidation } from "../../services/multer.js";
const router=Router()

router.post('/signup',fileUpload(fileValidation.image).single('image'),AuthController.signUp);
router.post('/signIn',AuthController.signIn);
router.get('/confirmEmail/:email',AuthController.confirmEmail);
router.patch('/sendCode',AuthController.sendCode);
router.patch('/forgotPassword',AuthController.forgotPssword)
export default router;
