import { Router } from 'express'
import * as productController from './controller/products.controller.js'
import { auht } from '../../middelware/auth.js'
import { endPoint } from './products.endpoint.js'
import fileUpload, { fileValidation } from '../../services/multer.js'
import * as validators from './products.validation.js'
import { validtion } from '../../middelware/validation.js'
const router = Router()

router.get('/', productController.getProducts)

router.post('/', auht(endPoint.create), fileUpload(fileValidation.image).fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'subImages', maxCount: 4 }
]),validtion(validators.createProduct), productController.createProduct)

router.get('/productDetails/:productId',productController.getProductDetails)
router.get('/:categoryId',productController.getProductWithCategory);
export default router