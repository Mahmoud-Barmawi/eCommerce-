import { Router } from "express";
import * as orederController from './controller/order.controller.js'
import { auht } from "../../middelware/auth.js";
import { endPoint } from "./order.endpoint.js";

const router=Router();

router.post('',auht(endPoint.create),orederController.createOrder);
router.get('',auht(endPoint.get),orederController.getOrders);
router.patch('/cancel/:orderId',auht(endPoint.cancel),orederController.cancelOrder);
router.patch('/changeOrderStatus/:orderId',auht(endPoint.changeStatus),orederController.changeOrderStatus);

export default router