import { Router } from "express";
const router = Router()
import * as categoriesController from './controller/categories.controller.js'
import fileUpload, { fileValidation } from '../../services/multer.js'
import subCategoriesRouter from '../subCategory/subCategories.router.js'
import { auht } from "../../middelware/auth.js";
router.use('/:id/subcategory',subCategoriesRouter)
router.get('/', auht(),categoriesController.getCategories)
router.get('/active', categoriesController.getActiveCategories)
router.get('/:id', categoriesController.getSpicificCategories)
router.put('/:id', fileUpload(fileValidation.image).single('image'), categoriesController.updateCategories)
router.post('/', fileUpload(fileValidation.image).single('image'), categoriesController.createCategory)

export default router