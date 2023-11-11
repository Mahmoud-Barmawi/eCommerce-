import { Router } from "express";
const router = Router()
import * as categoriesController from './controller/categories.controller.js'
import fileUpload, { fileValidation } from '../../services/multer.js'
import subCategoriesRouter from '../subCategory/subCategories.router.js'
import { auht } from "../../middelware/auth.js";
import { endPoint } from "./categories.endpoint.js";
router.use('/:id/subcategory',subCategoriesRouter)
router.get('/', auht(endPoint.getAll),categoriesController.getCategories)
router.get('/active', auht(endPoint.getActive),categoriesController.getActiveCategories)
router.get('/:id', auht(endPoint.specificCategory),categoriesController.getSpicificCategories)
router.put('/:id', auht(endPoint.updateCategory),fileUpload(fileValidation.image).single('image'), categoriesController.updateCategories)
router.post('/', auht(endPoint.create),fileUpload(fileValidation.image).single('image'), categoriesController.createCategory)

export default router