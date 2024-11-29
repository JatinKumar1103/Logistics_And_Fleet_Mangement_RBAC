import {Router} from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { checkRole } from '../middlewares/checkRole.middleware.js';



const router = Router();

import { assignRoles, showAdmin } from '../controllers/admin.controller.js';
import { checkPermission } from '../middlewares/permission.middleware.js';

router.route('/dashboard').get(verifyJWT,checkRole('admin'),checkPermission("viewDashboard"),showAdmin)
router.route('/assignrole').patch(verifyJWT,checkRole('admin'),checkPermission("assignRoles"),assignRoles)


export default router;