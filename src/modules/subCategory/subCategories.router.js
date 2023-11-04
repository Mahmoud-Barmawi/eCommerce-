import { Router } from "express";
import * as subCategortController from './controller/subCategories.controller.js'
import fileUpload, { fileValidation } from '../../services/multer.js'

const router = Router({mergeParams:true})

router.post('/', fileUpload(fileValidation.image).single('image'),
    subCategortController.createSubCategory)

router.get('/',subCategortController.getSubCategory)
export default router