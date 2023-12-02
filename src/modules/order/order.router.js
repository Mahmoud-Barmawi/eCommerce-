import { Router } from "express";
import * as orederController from './controller/order.controller.js'
import { auht } from "../../middelware/auth.js";
import { endPoint } from "./order.endpoint.js";

const router=Router();

router.post('',auht(endPoint.create),orederController.createOrder);

export default router