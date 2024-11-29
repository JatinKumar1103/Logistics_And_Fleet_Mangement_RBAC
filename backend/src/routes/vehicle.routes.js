import express from 'express';
import { addVehicle, assignVehicleToDriver, releaseVehicle } from '../controllers/vehicle.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { checkRole } from '../middlewares/checkRole.middleware.js';
import { checkPermission } from '../middlewares/permission.middleware.js';


const router = express.Router();

// Assign vehicle to a driver (accessible to admins/managers)
router.route('/assignvehicle').post(verifyJWT,checkRole('manager'),checkPermission("assignVehicleToDriver"),assignVehicleToDriver
)

router.route('/releasevehicle').post(verifyJWT,checkRole('manager'),checkPermission("releaseVehicleFromDriver"),releaseVehicle)

router.route('/vehicledetails').post(verifyJWT,checkRole('manager'),checkPermission("vehicledetailsFromDriver"),addVehicle)

export default router;
