import { Router } from "express";
const router = Router()
import * as profileController from './controller/user.controller.js'

import { auht, roles } from "../../middelware/auth.js";
import { asyncHandler } from "../../services/errorHandling.js";

router.get('/profile', auht(Object.values(roles)),asyncHandler(profileController.getProfile));

export default router