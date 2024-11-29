import {Router} from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { checkRole } from '../middlewares/checkRole.middleware.js';
import { checkPermission } from '../middlewares/permission.middleware.js';
import { showDriver, viewTasks, updateTaskStatus } from '../controllers/driver.controller.js';




const router = Router();



router.route('/dashboard').get(verifyJWT,checkRole('driver'),checkPermission("viewDashboard"), showDriver)
router.route('/updatetask').patch(verifyJWT,checkRole('driver'),checkPermission('updateTaskStatus'),updateTaskStatus)
router.route('/viewtasks').get(verifyJWT,checkRole('driver'),checkPermission('viewTasks'),viewTasks)


export default router;