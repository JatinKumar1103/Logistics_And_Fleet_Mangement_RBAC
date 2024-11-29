import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { Vehicle } from '../models/vehicle.model.js';
import { User } from '../models/user.model.js';


const addVehicle = asyncHandler(async (req, res) => {
    const { license_plate, model, status, assignedTo } = req.body;

    const validStatuses = ['available', 'in-use', 'maintenance'];

    if (status && !validStatuses.includes(status)) {
        throw new ApiError(400, 'Invalid status');
    }

    // Find vehicle by license_plate (no need for vehicleId)
    const vehicle = await Vehicle.findOne({ license_plate });

    if (!vehicle) {
        throw new ApiError(404, 'Vehicle not found');
    }

    // If assignedTo is provided, check if it's a valid driver
    if (assignedTo) {
        const driver = await User.findById(assignedTo);

        if (!driver || driver.role !== 'driver') {
            throw new ApiError(400, 'Invalid driver assignment');
        }
    }

    // Update the fields if provided in the request body
    if (model) vehicle.model = model.trim();
    if (status) vehicle.status = status;
    if (assignedTo) vehicle.assignedTo = assignedTo;

    await vehicle.save();

    return res.status(200).json(
        new ApiResponse(200, vehicle, 'Vehicle updated successfully')
    );
});

const assignVehicleToDriver = asyncHandler(async (req, res) => {
    const { vehicleId, driverId } = req.body;

    // Validate driver
    const driver = await User.findById(driverId);
    if (!driver || driver.role !== 'driver') {
        throw new ApiError(404, 'Driver not found or invalid role');
    }

    // Validate vehicle
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
        throw new ApiError(404, 'Vehicle not found');
    }

    if (vehicle.status !== 'available') {
        throw new ApiError(400, 'Vehicle is not available');
    }

    // Assign vehicle to driver
    vehicle.assignedTo = driverId;
    vehicle.status = 'in-use';
    await vehicle.save();

    return res
    .status(200)
    .json(new 
        ApiResponse(
            200, 
            vehicle, 
            'Vehicle assigned to driver successfully'));
});

const releaseVehicle = asyncHandler(async (req, res) => {
    const { vehicleId } = req.body;

    // Validate vehicle
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
        throw new ApiError(404, 'Vehicle not found');
    }

    if (vehicle.status !== 'in-use') {
        throw new ApiError(400, 'Vehicle is not currently in use');
    }

    // Release vehicle
    vehicle.assignedTo = null;
    vehicle.status = 'available';
    await vehicle.save();

    return res.status(200).json(new ApiResponse(200, vehicle, 'Vehicle released successfully'));
});


export{
    assignVehicleToDriver,
    releaseVehicle,
    addVehicle 
}