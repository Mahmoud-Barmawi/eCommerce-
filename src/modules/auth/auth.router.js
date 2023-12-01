import { Router } from "express";
import * as AuthController from './controller/auth.controller.js'
import fileUpload, { fileValidation } from "../../services/multer.js";
import { asyncHandler } from "../../services/errorHandling.js";
const router=Router()

router.post('/signup',fileUpload(fileValidation.image).single('image'),asyncHandler(AuthController.signUp));
router.post('/signIn',asyncHandler(AuthController.signIn));
router.get('/confirmEmail/:email',asyncHandler(AuthController.confirmEmail));
router.patch('/sendCode',asyncHandler(AuthController.sendCode));
router.patch('/forgotPassword',asyncHandler(AuthController.forgotPssword))
router.delete('/deleteInvalidConfirm',asyncHandler(AuthController.deleteInvalidConfirm))


export default router;
