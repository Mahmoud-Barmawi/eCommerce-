import { Router } from 'express'
import * as controllerCoupon from './controller/coupon.controller.js'
const router = Router()

router.post('/', controllerCoupon.createCoupon)
router.get('/', controllerCoupon.getCoupon)
router.put('/:id', controllerCoupon.updateCoupon)
router.patch('/softDelete/:id', controllerCoupon.softDelete)
router.delete('/hardDelete/:id', controllerCoupon.hardDelete)
// router.patch('/restore/:id', controllerCoupon.restore)

export default router