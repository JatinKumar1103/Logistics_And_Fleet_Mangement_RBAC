import {Router} from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { checkRole } from '../middlewares/checkRole.middleware.js';



const router = Router();

import { assignTask, monitorDrivers, showManager } from '../controllers/manager.controller.js';
import { checkPermission } from '../middlewares/permission.middleware.js';

router.route('/dashboard').get(verifyJWT,checkRole('manager'),checkPermission("viewDashboard"), showManager)
router.route('/assigntask').post(verifyJWT,checkRole('manager'),checkPermission("assignTasks"),assignTask)
router.route('/monitordrivers').get(verifyJWT,checkRole('manager'),checkPermission("monitorDrivers"),monitorDrivers)

export default router;