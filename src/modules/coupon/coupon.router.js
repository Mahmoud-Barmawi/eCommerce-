import { Router } from 'express'
import * as controllerCoupon from './controller/coupon.controller.js'
import * as validators from './coupon.validation.js'
import { validtion } from '../../middelware/validation.js'

const router = Router()

router.post('/',validtion(validators.createCoupon),controllerCoupon.createCoupon)
router.get('/', controllerCoupon.getCoupon)
router.put('/:id', controllerCoupon.updateCoupon)
router.patch('/softDelete/:id', controllerCoupon.softDelete)
router.delete('/hardDelete/:id', controllerCoupon.hardDelete)
router.patch('/restore/:id', controllerCoupon.restore)

export default router