import {Router} from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { checkRole } from '../middlewares/checkRole.middleware.js';
import { checkPermission } from '../middlewares/permission.middleware.js';



const router = Router();

import { accessReports, assignRoles, showAdmin } from '../controllers/admin.controller.js';

router.route('/dashboard').get(verifyJWT,checkRole('admin'),checkPermission("viewDashboard"),showAdmin)
router.route('/assignrole').patch(verifyJWT,checkRole('admin'),checkPermission("assignRoles"),assignRoles)
router.route('/getreport').get(verifyJWT,checkRole('admin'),checkPermission("accessReports"),accessReports)


export default router;