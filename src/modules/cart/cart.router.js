import { Router } from "express";
import * as CartController from './controller/cart.controller.js'
import { auht } from "../../middelware/auth.js";
import { endPoint } from "./cart.endpoint.js";
const router=Router()

router.post('/',auht(endPoint.create),CartController.createCart);
router.patch('/removeItem',auht(endPoint.delete),CartController.removeItem);
router.patch('/removeItems',auht(endPoint.clear),CartController.removeItems);
router.get('/getCart',auht(endPoint.get),CartController.getCart);

export default router;
