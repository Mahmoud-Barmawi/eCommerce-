import { Router } from "express";
const router = Router()
import * as categoriesController from './controller/categories.controller.js'
import fileUpload, { fileValidation } from '../../services/multer.js'
import subCategoriesRouter from '../subCategory/subCategories.router.js'
import { auht, roles } from "../../middelware/auth.js";
import { endPoint } from "./categories.endpoint.js";
import { validtion } from "../../middelware/validation.js";
import * as validators from "./categories.validation.js";
router.use('/:id/subcategory',subCategoriesRouter)
router.get('/', auht(Object.values(roles)),categoriesController.getCategories)
router.get('/active',categoriesController.getActiveCategories)
router.get('/:id',categoriesController.getSpicificCategories)
router.put('/:id', auht(endPoint.updateCategory),fileUpload(fileValidation.image).single('image'), categoriesController.updateCategories)
router.post('/', auht(endPoint.create),fileUpload(fileValidation.image).single('image'), validtion(validators.createCtegory),categoriesController.createCategory)
router.delete('/:id',categoriesController.deleteCategories)

export default router   