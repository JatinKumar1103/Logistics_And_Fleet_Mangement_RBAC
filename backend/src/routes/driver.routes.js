import {Router} from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { checkRole } from '../middlewares/checkRole.middleware.js';
import { checkPermission } from '../middlewares/permission.middleware.js';




const router = Router();

import { showDriver } from '../controllers/driver.controller.js';
import { updateTaskStatus } from '../controllers/driver.controller.js';

router.route('/dashboard').get(verifyJWT,checkRole('driver'),checkPermission("viewDashboard"), showDriver)
router.route('/updatetask').patch(verifyJWT,checkRole('driver'),checkPermission('updateTaskStatus'),updateTaskStatus)

export default router;