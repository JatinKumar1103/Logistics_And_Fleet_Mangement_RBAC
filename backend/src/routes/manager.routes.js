import {Router} from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { checkRole } from '../middlewares/checkRole.middleware.js';



const router = Router();

import { assignTask, showManager } from '../controllers/manager.controller.js';
import { checkPermission } from '../middlewares/permission.middleware.js';

router.route('/dashboard').get(verifyJWT,checkRole('manager'),checkPermission("viewDashboard"), showManager)
router.route('/assigntask').post(verifyJWT,checkRole('manager'),checkPermission("assignTasks"),assignTask)

export default router;